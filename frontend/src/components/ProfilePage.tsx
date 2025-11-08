import { motion } from 'motion/react';
import { Calendar, Link2, FileText, Image, Music, Moon, Sun, LogOut, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import type { User } from '../App';

interface ProfilePageProps {
  user: User | null;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

// Mock verification history
const mockHistory = [
  {
    id: '1',
    type: 'url' as const,
    content: 'https://example.com/climate-study-2025',
    title: 'Breaking: New Climate Study Results',
    credibilityScore: 87,
    verdict: 'true' as const,
    verifiedDate: '2 hours ago'
  },
  {
    id: '2',
    type: 'image' as const,
    content: 'viral-protest-image.jpg',
    title: 'Viral Image: Is This Photo Real?',
    credibilityScore: 34,
    verdict: 'false' as const,
    verifiedDate: '5 hours ago'
  },
  {
    id: '3',
    type: 'text' as const,
    content: 'New research suggests that drinking 8 glasses of water daily...',
    title: 'Health Claim Verification',
    credibilityScore: 58,
    verdict: 'uncertain' as const,
    verifiedDate: '1 day ago'
  },
  {
    id: '4',
    type: 'url' as const,
    content: 'https://example.com/tech-announcement',
    title: 'Major Tech Company Announcement',
    credibilityScore: 92,
    verdict: 'true' as const,
    verifiedDate: '2 days ago'
  },
  {
    id: '5',
    type: 'audio' as const,
    content: 'celebrity-interview.mp3',
    title: 'Celebrity Interview Audio Clip',
    credibilityScore: 28,
    verdict: 'false' as const,
    verifiedDate: '3 days ago'
  }
];

export function ProfilePage({ user, onLogout, isDarkMode, onToggleDarkMode }: ProfilePageProps) {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardHeader>
            <CardTitle>Not Logged In</CardTitle>
            <CardDescription>Please log in to view your profile</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'url':
        return <Link2 className="size-4" />;
      case 'text':
        return <FileText className="size-4" />;
      case 'image':
        return <Image className="size-4" />;
      case 'audio':
        return <Music className="size-4" />;
      default:
        return null;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'uncertain':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'false':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return '';
    }
  };

  const getVerdictLabel = (verdict: string) => {
    switch (verdict) {
      case 'true':
        return 'Likely True';
      case 'uncertain':
        return 'Uncertain';
      case 'false':
        return 'Likely False';
      default:
        return verdict;
    }
  };

  // Calculate stats
  const totalVerifications = mockHistory.length;
  const trueCount = mockHistory.filter(h => h.verdict === 'true').length;
  const falseCount = mockHistory.filter(h => h.verdict === 'false').length;
  const uncertainCount = mockHistory.filter(h => h.verdict === 'uncertain').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* User Profile Card */}
          <Card className="mb-6 border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="size-24">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback className="text-2xl">{user.username[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-gray-900 dark:text-white mb-1">{user.username}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{user.email}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onToggleDarkMode}
                    >
                      {isDarkMode ? (
                        <>
                          <Sun className="size-4 mr-2" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="size-4 mr-2" />
                          Dark Mode
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onLogout}
                      className="text-red-600 dark:text-red-400"
                    >
                      <LogOut className="size-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-5 text-green-600 dark:text-green-500" />
                Verification Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-gray-900 dark:text-white mb-1">
                    {totalVerifications}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Total
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-green-700 dark:text-green-400 mb-1">
                    {trueCount}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    True
                  </div>
                </div>
                <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <div className="text-amber-700 dark:text-amber-400 mb-1">
                    {uncertainCount}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Uncertain
                  </div>
                </div>
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-red-700 dark:text-red-400 mb-1">
                    {falseCount}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    False
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent verification history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockHistory.map((item, index) => (
                  <div key={item.id}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="outline" className="flex items-center gap-1">
                              {getTypeIcon(item.type)}
                              <span className="capitalize">{item.type}</span>
                            </Badge>
                            <Badge className={getVerdictColor(item.verdict)}>
                              {getVerdictLabel(item.verdict)}
                            </Badge>
                            <Badge variant="outline">
                              {item.credibilityScore}/100
                            </Badge>
                          </div>
                          <p className="text-gray-900 dark:text-white mb-1">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <Calendar className="size-4" />
                            <span>{item.verifiedDate}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    {index < mockHistory.length - 1 && (
                      <Separator className="my-3" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
