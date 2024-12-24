'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface Comment {
  _id: string;
  text: string;
  author: {
    _id: string;
    name: string;
    username: string;
    authorImage: string;
  };
  _createdAt: string;
}

interface CommentSectionProps {
  ideaId: string;
  currentUser: any;
}

const CommentSection = ({ ideaId, currentUser }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments/${ideaId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push('/sign-in');
      return;
    }

    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ideaId,
          text: newComment,
          authorId: currentUser.id,
        }),
      });

      if (response.ok) {
        setNewComment('');
        await fetchComments(); // Refresh comments
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch comments on mount
  useState(() => {
    fetchComments();
  });

  return (
    <div className="space-y-6">
      <h3 className="startup-form_label">Comments</h3>
      
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <Textarea
          placeholder={currentUser ? "Write a comment..." : "Sign in to comment"}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={!currentUser || isLoading}
          className="min-h-[100px] startup-card"
        />
        <Button 
          type="submit"
          disabled={!currentUser || isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="startup-card">
            <div className="flex items-start gap-3">
              <Image
                src={comment.author.authorImage}
                alt={comment.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-16-semibold">{comment.author.name}</p>
                  <p className="text-14-regular text-gray-500">
                    @{comment.author.username}
                  </p>
                  <span className="text-gray-400">•</span>
                  <p className="text-14-regular text-gray-500">
                    {formatDate(comment._createdAt)}
                  </p>
                </div>
                <p className="text-16-regular mt-2">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection; 