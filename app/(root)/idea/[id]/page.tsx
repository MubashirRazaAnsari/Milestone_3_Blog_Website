import { sanityFetch } from '@/sanity/lib/live';
import React from 'react'

const page = async (params: {params: Promise<{id: string}>}) => {
  const {id} = await params.params;
//   const idea = await sanityFetch({query: IdeaQuery, params: {id}});
  return (  
    <div>
      <h1>Idea id : {id}</h1>
    </div>
  )
}

export default page
