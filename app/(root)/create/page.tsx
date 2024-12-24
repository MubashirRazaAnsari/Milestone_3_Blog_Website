import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import IdeaForm from '@/components/ideaForm'
import React from 'react'

const page = async() => {
  const session = await auth()
  if(!session){
    redirect('/')
  } 
  return (
    <>
    <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit Your Idea</h1>


    </section>
    <IdeaForm />
      
    </>
  )
}

export default page
