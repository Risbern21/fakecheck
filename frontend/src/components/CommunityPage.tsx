import { useState } from 'react';
import { motion } from 'motion/react';
import { PostCard } from './PostCard';
import type { Post, User } from '../App';

interface CommunityPageProps {
  posts: Post[];
  currentUser: User | null;
  onUpdatePost: (post: Post) => void;
}

export function CommunityPage({ posts, currentUser, onUpdatePost }: CommunityPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-gray-900 dark:text-white mb-2">Community Feed</h1>
          <p className="text-gray-600 dark:text-gray-400">
            See what others are verifying
          </p>
        </motion.div>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PostCard
                post={post}
                currentUser={currentUser}
                onUpdatePost={onUpdatePost}
              />
            </motion.div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No posts yet. Be the first to verify something!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
