
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, ThumbsUp, Share, Star, Camera, PlusCircle, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';

// Mock data - in a real app this would come from an API
const communityPosts = [
  {
    id: 1,
    author: {
      name: 'Priya Sharma',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      badge: 'Explorer',
    },
    destination: 'Manali, Himachal Pradesh',
    timePosted: '2 hours ago',
    content: 'Just reached Manali and the views are breathtaking! Any recommendations for less crowded hiking trails?',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFuYWxpfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    likes: 24,
    comments: 8,
    isLiked: false,
  },
  {
    id: 2,
    author: {
      name: 'Amit Patel',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      badge: 'Local Expert',
    },
    destination: 'Jaipur, Rajasthan',
    timePosted: '1 day ago',
    content: 'Found this amazing rooftop cafe near Hawa Mahal with the best masala chai and view of the old city. Must visit!',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGphaXB1cnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    likes: 56,
    comments: 14,
    isLiked: true,
  },
];

const localQuestions = [
  {
    id: 1,
    author: {
      name: 'Raj Kumar',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    },
    destination: 'Pondicherry',
    timePosted: '5 hours ago',
    question: 'Is renting a scooter safe for getting around Pondicherry? Any recommended rental places?',
    responses: 3,
  },
  {
    id: 2,
    author: {
      name: 'Meera Iyer',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    destination: 'Darjeeling',
    timePosted: '2 days ago',
    question: 'Planning to visit Darjeeling next week. How's the weather in October? Should I pack heavy jackets?',
    responses: 7,
  },
];

interface PostCardProps {
  post: typeof communityPosts[0];
  onLike: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <p className="font-medium">{post.author.name}</p>
                {post.author.badge && (
                  <span className="ml-2 px-2 py-0.5 bg-accent text-xs rounded-full">
                    {post.author.badge}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">{post.destination} • {post.timePosted}</div>
            </div>
          </div>
        </div>
        
        <p className="mb-3">{post.content}</p>
        
        {post.image && (
          <div className="mb-3 rounded-md overflow-hidden">
            <img src={post.image} alt="Post" className="w-full h-64 object-cover" />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              className={`flex items-center space-x-1 ${post.isLiked ? 'text-primary' : 'text-gray-500'}`}
              onClick={() => onLike(post.id)}
            >
              <ThumbsUp size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-500">
              <MessageCircle size={18} />
              <span>{post.comments}</span>
            </button>
          </div>
          <button className="text-gray-500">
            <Share size={18} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

interface QuestionCardProps {
  question: typeof localQuestions[0];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarImage src={question.author.avatar} alt={question.author.name} />
            <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{question.author.name}</p>
            <div className="text-xs text-gray-500">{question.destination} • {question.timePosted}</div>
          </div>
        </div>
        
        <p className="mb-3 text-sm font-medium">{question.question}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{question.responses} responses</span>
          <Button variant="outline" size="sm">Answer</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Community: React.FC = () => {
  const [posts, setPosts] = useState(communityPosts);
  const [questions] = useState(localQuestions);
  const [newPostContent, setNewPostContent] = useState('');
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked,
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) {
      toast({
        variant: "destructive",
        title: "Post cannot be empty",
        description: "Please write something to share with the community.",
      });
      return;
    }

    // In a real app, we would send this to an API
    toast({
      title: "Post created",
      description: "Your post has been shared with the community.",
    });
    setNewPostContent('');
  };

  return (
    <Layout>
      <div className="p-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold font-heading">Community</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a Post</DialogTitle>
                <DialogDescription>
                  Share your travel experiences, tips or ask questions
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <Textarea 
                  placeholder="What's on your mind?" 
                  className="min-h-[100px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
                <div className="flex items-center">
                  <Button variant="outline" size="sm" className="mr-2">
                    <Camera className="h-4 w-4 mr-1" />
                    Add Photo
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    Add Location
                  </Button>
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" className="bg-primary" onClick={handleCreatePost}>
                  Share Post
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search communities & posts..."
            className="pl-10"
          />
        </div>
        
        <Tabs defaultValue="feed">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="feed">Travel Feed</TabsTrigger>
            <TabsTrigger value="questions">Local Questions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed">
            <div className="space-y-1">
              {posts.map(post => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="questions">
            <div className="space-y-1">
              {questions.map(question => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Community;
