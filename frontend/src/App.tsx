import { useState } from 'react';
import { BottomNav } from './components/BottomNav';
import { TopNav } from './components/TopNav';
import { CommunityPage } from './components/CommunityPage';
import { UploadPage } from './components/UploadPage';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';

type Page = 'community' | 'upload' | 'profile' | 'login';

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  type: 'url' | 'text' | 'image';
  title: string;
  content: string;
  imageUrl?: string;
  credibilityScore: number;
  verdict: 'true' | 'uncertain' | 'false';
  likes: number;
  dislikes: number;
  comments: Comment[];
  createdAt: string;
  userLiked?: boolean;
  userDisliked?: boolean;
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

export interface VerificationHistory {
  id: string;
  type: 'url' | 'text' | 'image' | 'audio';
  content: string;
  credibilityScore: number;
  verdict: 'true' | 'uncertain' | 'false';
  verifiedDate: string;
}

// Mock community posts
const mockPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    username: 'Sarah Chen',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    type: 'url',
    title: 'Breaking: New Climate Study Results',
    content: 'https://example.com/climate-study-2025',
    credibilityScore: 87,
    verdict: 'true',
    likes: 234,
    dislikes: 12,
    comments: [
      {
        id: '1',
        username: 'Mike Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        text: 'Great find! This study is peer-reviewed.',
        timestamp: '2 hours ago'
      }
    ],
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    userId: '2',
    username: 'Alex Kumar',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    type: 'image',
    title: 'Viral Image: Is This Photo Real?',
    content: 'viral-protest-image.jpg',
    imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
    credibilityScore: 34,
    verdict: 'false',
    likes: 156,
    dislikes: 289,
    comments: [
      {
        id: '1',
        username: 'Emma Wilson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        text: 'Reverse image search shows this is from 2018.',
        timestamp: '1 hour ago'
      },
      {
        id: '2',
        username: 'David Lee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        text: 'Thanks for verifying this!',
        timestamp: '3 hours ago'
      }
    ],
    createdAt: '5 hours ago'
  },
  {
    id: '3',
    userId: '3',
    username: 'Maria Garcia',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    type: 'text',
    title: 'Health Claim Verification',
    content: 'New research suggests that drinking 8 glasses of water daily can significantly improve cognitive function and reduce fatigue by up to 40%.',
    credibilityScore: 58,
    verdict: 'uncertain',
    likes: 78,
    dislikes: 45,
    comments: [],
    createdAt: '1 day ago'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('community');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    username: 'Demo User',
    email: 'demo@fakecheck.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo'
  });
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleLogin = (username: string) => {
    setCurrentUser({
      id: Date.now().toString(),
      username,
      email: `${username.toLowerCase().replace(' ', '.')}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    });
    setCurrentPage('community');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleUpload = async (type: 'url' | 'text' | 'image' | 'audio', content: string, title: string, imageUrl?: string) => {
    // Simulate AI verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const score = Math.random() * 100;
    const verdict: 'true' | 'uncertain' | 'false' = 
      score > 70 ? 'true' : score > 40 ? 'uncertain' : 'false';
    
    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser?.id || '0',
      username: currentUser?.username || 'Anonymous',
      userAvatar: currentUser?.avatar || '',
      type: type === 'audio' ? 'text' : type,
      title,
      content,
      imageUrl,
      credibilityScore: Math.round(score),
      verdict,
      likes: 0,
      dislikes: 0,
      comments: [],
      createdAt: 'Just now'
    };
    
    setPosts([newPost, ...posts]);
    setCurrentPage('community');
  };

  const handleUpdatePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  if (!currentUser && currentPage !== 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors pb-20 md:pb-0">
        {/* Top Navigation - Desktop */}
        <div className="hidden md:block">
          <TopNav
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            user={currentUser}
            onLogout={handleLogout}
          />
        </div>
        
        <main className="md:pt-0">
          {currentPage === 'community' && (
            <CommunityPage 
              posts={posts} 
              currentUser={currentUser}
              onUpdatePost={handleUpdatePost}
            />
          )}
          {currentPage === 'upload' && (
            <UploadPage 
              onUpload={handleUpload}
            />
          )}
          {currentPage === 'profile' && (
            <ProfilePage 
              user={currentUser}
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            />
          )}
        </main>
        
        {/* Bottom Navigation - Mobile */}
        <div className="md:hidden">
          <BottomNav
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
