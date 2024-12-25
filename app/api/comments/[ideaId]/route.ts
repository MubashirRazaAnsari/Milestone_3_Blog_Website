/* eslint-disable */
import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ ideaId: string }> }
) {
  try {
    const comments = await client.fetch(`
      *[_type == "comment" && idea._ref == $ideaId] | order(_createdAt desc) {
        _id,
        text,
        _createdAt,
        author-> {
          _id,
          name,
          username,
          authorImage
        }
      }
    `, { ideaId: (await params).ideaId });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 