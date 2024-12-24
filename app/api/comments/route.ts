import { writeClient } from '@/sanity/lib/write-client';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { text, ideaId } = await req.json();

    if (!text || !ideaId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const comment = await writeClient.create({
      _type: 'comment',
      text,
      author: {
        _type: 'reference',
        _ref: session.user.id,
      },
      idea: {
        _type: 'reference',
        _ref: ideaId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 