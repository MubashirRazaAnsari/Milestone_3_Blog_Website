'use client';

import React, { useEffect } from 'react';
import Ping from './Ping';

const ViewCount = ({ id, initialCount = 0 }: { id: string; initialCount?: number }) => {
  const [viewCount, setViewCount] = React.useState(initialCount);

  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        const response = await fetch('/api/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ideaId: id }),
        });

        if (response.ok) {
          const data = await response.json();
          setViewCount(data.viewCount);
        }
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    };

    incrementViewCount();
  }, [id]);

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>
      <p className='view-text'>
        <span className='font-black'>{viewCount} views</span>
      </p>
    </div>
  );
};

export default ViewCount;

