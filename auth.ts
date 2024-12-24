import NextAuth, { DefaultSession, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AUTHOR_By_GitHUB_ID, AUTHOR_By_Email } from "./sanity/lib/queries";
import { client } from "./sanity/lib/client";
import { writeClient } from './sanity/lib/write-client';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user']
  }
}

// Extend the JWT type
interface ExtendedJWT extends JWT {
  id?: string;
  role?: string;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (!user?.email) {
        console.error('No email provided by authentication provider');
        return false;
      }

      try {
        // First, try to find an existing author by email
        let author = await client.withConfig({ useCdn: false }).fetch(AUTHOR_By_Email, { 
          email: user.email 
        });

        // If no author exists, create a new one
        if (!author) {
          const authorData = {
            _type: 'author',
            email: user.email,
            name: user.name || '',
            username: account?.provider === 'github' 
              ? (profile as any)?.login 
              : user.email.split('@')[0],
            authorImage: user.image || '',
            bio: account?.provider === 'github' 
              ? (profile as any)?.bio || '' 
              : '',
          };

          // If it's a GitHub account, add GitHub-specific fields
          if (account?.provider === 'github') {
            Object.assign(authorData, {
              githubId: (profile as any)?.id,
              githubUsername: (profile as any)?.login,
            });
          }

          // Create the new author
          author = await writeClient.create(authorData);
        } else {
          // Update existing author with any new information
          const updates: any = {};
          
          if (!author.authorImage && user.image) {
            updates.authorImage = user.image;
          }
          
          if (account?.provider === 'github' && !author.githubId) {
            updates.githubId = (profile as any)?.id;
            updates.githubUsername = (profile as any)?.login;
          }

          // If there are any updates, patch the author document
          if (Object.keys(updates).length > 0) {
            await writeClient
              .patch(author._id)
              .set(updates)
              .commit();
          }
        }

        return true;
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;
      }
    },

    async jwt({ token, profile, account }): Promise<ExtendedJWT> {
      if (account && profile) {
        try {
          const author = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_By_Email, { email: profile.email });
          
          if (author) {
            token.id = author._id;
            token.role = author.role || 'user';
          }
        } catch (error) {
          console.error('Error fetching author during JWT callback:', error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) || 'user';
      }
      return session;
    },
  },
});
