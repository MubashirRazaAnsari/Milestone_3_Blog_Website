import { auth } from '@/auth'
import { client } from '@/sanity/lib/client';
import { AUTHOR_By_ID } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import IdeaCard from '@/components/IdeaCard';
import { UserIcon } from 'lucide-react';

const page = async ({params}: {params :Promise<{id:string}>}) => {
    const id = (await params).id
    const session = await auth();

     const user = await client.fetch(AUTHOR_By_ID, { id });
     if(!user) return notFound();


  return (
    <div className="min-h-screen">
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">User Profile</h1>
      </section>

      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h2 className="text-24-bold text-center">{user.name}</h2>
          </div>

          {user.authorImage ? (
            <Image
              src={user.authorImage}
              alt={user.name}
              width={120}
              height={120}
              className="profile_image"
            />
          ) : (
            <UserIcon className="size-[120px] text-primary" />
          )}

          <div className="mt-8 text-center">
            <p className="text-16-medium bg-white-100 p-2 rounded-xl  border-r-4 border-l border-t-2 border-b-8 border-black">@{user.username}</p>
            {user.bio && (
              <p className="text-16-regular mt-4 text-black-100 bg-white-100 p-2 rounded-xl">{user.bio}</p>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-work-sans text-16-bold">Ideas</h3>
          {user.ideas && user.ideas.length > 0 ? (
            <ul className="card_grid">
              {user.ideas.map((idea: any) => (
                <IdeaCard key={idea._id} idea={idea} />
              ))}
            </ul>
          ) : (
            <p className="text-16-regular text-black-100">No ideas posted yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default page
