import { writeClient } from '@/sanity/lib/write-client';
import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { ideaId } = await req.json();

    if (!ideaId) {
      return new NextResponse('Missing ideaId', { status: 400 });
    }

    // First get the current view count
    const { viewCount = 0 } = await client
      .withConfig({ useCdn: false })
      .fetch(`*[_type == "idea" && _id == $ideaId][0] { viewCount }`, { ideaId });

    // Increment the view count
    const updatedIdea = await writeClient
      .patch(ideaId)
      .set({ viewCount: (viewCount || 0) + 1 })
      .commit();

    return NextResponse.json({ viewCount: updatedIdea.viewCount });
  } catch (error) {
    console.error('Error updating view count:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 