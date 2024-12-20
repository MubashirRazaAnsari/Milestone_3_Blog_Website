import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/auth'
import { FaGithub, FaGoogle } from 'react-icons/fa'




const Navbar = async () => {
    const session = await auth()

    const handleSignInWithGithub = async () => {
        'use server';
        await signIn('github')
    }
    const handleSignInWithGoogle = async () => {
        'use server';
        await signIn('google')
    }

    const handleSignOut = async () => {
        'use server';
        await signOut()
    }


  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
        <nav className="flex justify-between items-center text-base">
            <Link href="/">
                <Image src="/logo.png" alt="LikeYou" width={80} height={40} />
            </Link>

            <div className="flex items-center gap-4">

                {session &&session?.user ? ( 
                    <>
                    <Link href={'/startup/create'}>
                    <span>Create Startup</span>
                    
                    </Link>

                    <button onClick={handleSignOut}>
                        <span>Sign Out</span>
                    </button>

                    <Link href={`/profile/${session?.user?.id}`}>
                        <span>{session?.user?.name}</span>
                    </Link>
                    </>
                ) : (
                    <div className='flex items-center gap-2'>
                        <form action={handleSignInWithGithub} className='flex items-center gap-2'>
                        <button type="submit" className='flex items-center gap-2'>Sign In <span><FaGithub className='text-sm' /></span></button>
                    </form>
                    <form action={handleSignInWithGoogle} className='flex items-center gap-2'>
                        <button type="submit" className='flex items-center gap-2'>Sign In <span><FaGoogle className='text-sm' /></span></button>
                    </form>
                    </div>
                )}

            </div>
        </nav>
    </header>
  )
}

export default Navbar
