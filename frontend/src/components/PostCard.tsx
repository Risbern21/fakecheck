import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { CommentCard } from './CommentCard';
import type { Post, User, Comment } from '../App';

interface PostCardProps {
  post: Post;
  currentUser: User | null;
  onUpdatePost: (post: Post) => void;
}

export function PostCard({ post, currentUser, onUpdatePost }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [userLiked, setUserLiked] = useState(post.userLiked || false);
  const [userDisliked, setUserDisliked] = useState(post.userDisliked || false);
  const [likes, setLikes] = useState(post.likes);
  const [dislikes, setDislikes] = useState(post.dislikes);
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    if (userLiked) {
      setUserLiked(false);
      setLikes(likes - 1);
    } else {
      setUserLiked(true);
      setLikes(likes + 1);
      if (userDisliked) {
        setUserDisliked(false);
        setDislikes(dislikes - 1);
      }
    }
  };

  const handleDislike = () => {
    if (userDisliked) {
      setUserDisliked(false);
      setDislikes(dislikes - 1);
    } else {
      setUserDisliked(true);
      setDislikes(dislikes + 1);
      if (userLiked) {
        setUserLiked(false);
        setLikes(likes - 1);
      }
    }
  };

  const handleAddComment = () => {
    if (commentText.trim() && currentUser) {
      const newComment: Comment = {
        id: Date.now().toString(),
        username: currentUser.username,
        avatar: currentUser.avatar,
        text: commentText,
        timestamp: 'Just now'
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  const getVerdictBadge = () => {
    const config = {
      true: { label: 'Likely True', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
      uncertain: { label: 'Uncertain', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
      false: { label: 'Likely False', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' }
    };
    const { label, className } = config[post.verdict];
    return <Badge className={className}>{label}</Badge>;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="size-10">
              <AvatarImage src={post.userAvatar} alt={post.username} />
              <AvatarFallback>{post.username[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-gray-900 dark:text-white">{post.username}</p>
              <p className="text-gray-500 dark:text-gray-400">{post.createdAt}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {getVerdictBadge()}
            <Badge variant="outline">{post.credibilityScore}/100</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="text-gray-900 dark:text-white mb-2">{post.title}</h3>
          
          {post.type === 'url' && (
            <a
              href={post.content}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              <ExternalLink className="size-4 shrink-0" />
              <span className="truncate">{post.content}</span>
            </a>
          )}

          {post.type === 'text' && (
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap line-clamp-4">
              {post.content}
            </p>
          )}

          {post.type === 'image' && post.imageUrl && (
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {post.type === 'image' && !post.imageUrl && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <ImageIcon className="size-4" />
              <span>{post.content}</span>
            </div>
          )}
        </div>

        {/* Interaction Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={userLiked ? 'text-green-600 dark:text-green-500' : ''}
          >
            <ThumbsUp className={`size-4 mr-1 ${userLiked ? 'fill-current' : ''}`} />
            {likes}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
            className={userDisliked ? 'text-red-600 dark:text-red-500' : ''}
          >
            <ThumbsDown className={`size-4 mr-1 ${userDisliked ? 'fill-current' : ''}`} />
            {dislikes}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="size-4 mr-1" />
            {comments.length}
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}

            {currentUser && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="resize-none"
                  rows={2}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Comment
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
