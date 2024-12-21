import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AUTHOR_By_GitHUB_ID } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client"
import { AUTHOR_By_Email } from './sanity/lib/queries';
import { writeClient } from './sanity/lib/write-client';

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
      try {
        let author;
    
        // Check if a user exists by email first
        if (user?.email) {
          author = await client.withConfig({ useCdn: false }).fetch(AUTHOR_By_Email, { email: user.email });
        }
    
        // If no user is found by email, create one based on the provider
        if (!author) {
          if (account?.provider === 'github') {
            author = await writeClient.create({
              _type: 'author',
              id: profile?.id,
              name: user?.name || profile?.login,
              username: profile?.login,
              email: user?.email,
              authorImage: user?.image,
              bio: profile?.bio || '',
            });
          } else if (account?.provider === 'google') {
            author = await writeClient.create({
              _type: 'author',
              email: user?.email,
              name: user?.name,
              username: user?.email?.split('@')[0],
              authorImage: user?.image,
              bio: '',
            });
          }
        }
    
        return true;
      } catch (error) {
        console.error('Error during signIn callback:', error);
        return false;
      }
    },
    async jwt({ token, profile, account }) {
      if (account && profile) {
        if (account.provider === 'github') {
          const author = await client.withConfig({useCdn: false}).fetch(AUTHOR_By_GitHUB_ID, { id: profile?.id });
          token.id = author?._id;
        } else if (account.provider === 'google') {
          const author = await client.withConfig({useCdn: false}).fetch(AUTHOR_By_Email, { email: profile?.email });
          token.id = author?._id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session.user, { id: token.id });
      return session;
    },
  },
});
