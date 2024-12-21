import React from 'react'
import Ping from './Ping'
import { StartViewCount } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
const ViewCount = async ({id} : {id: string}) => {

    const {viewCount} = await client.withConfig({useCdn: false}).fetch(StartViewCount, {id})
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping />
        </div>
        <p className='view-text'>
            <span className='font-black'>{viewCount} views</span>
        </p>
      
    </div>
  )
}

export default ViewCount

