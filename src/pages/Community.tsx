
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Heart, MessageCircle, Share, Bookmark, Users, Image as ImageIcon } from 'lucide-react';

// Utility function to format the time passed since a post
const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};

// Sample data for stories
const stories = [
  { id: 1, username: 'aryan_travels', name: 'Aryan', avatar: '/placeholder.svg', seen: false },
  { id: 2, username: 'priya_adventure', name: 'Priya', avatar: '/placeholder.svg', seen: false },
  { id: 3, username: 'rahul_nomad', name: 'Rahul', avatar: '/placeholder.svg', seen: true },
  { id: 4, username: 'simran_explorer', name: 'Simran', avatar: '/placeholder.svg', seen: false },
  { id: 5, username: 'karan_backpacker', name: 'Karan', avatar: '/placeholder.svg', seen: true },
  { id: 6, username: 'meera_globetrotter', name: 'Meera', avatar: '/placeholder.svg', seen: false },
  { id: 7, username: 'vikram_traveler', name: 'Vikram', avatar: '/placeholder.svg', seen: true },
  { id: 8, username: 'ananya_wanderlust', name: 'Ananya', avatar: '/placeholder.svg', seen: false },
];

// Sample data for posts
const posts = [
  {
    id: 1,
    username: 'aryan_travels',
    name: 'Aryan Kumar',
    avatar: '/placeholder.svg',
    image: '/placeholder.svg',
    content: 'Just reached Rishikesh! The view of the Ganges is breathtaking. Can\'t wait to try river rafting tomorrow! #Rishikesh #TravelIndia',
    likes: 245,
    comments: 32,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: 2,
    username: 'priya_adventure',
    name: 'Priya Sharma',
    avatar: '/placeholder.svg',
    image: '/placeholder.svg',
    content: 'Spent the day exploring the ancient ruins of Hampi. The architecture is incredible and tells stories of a glorious past. Would highly recommend adding this UNESCO World Heritage site to your travel bucket list! #Hampi #IncredibleIndia',
    likes: 189,
    comments: 21,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
  },
  {
    id: 3,
    username: 'rahul_nomad',
    name: 'Rahul Singh',
    avatar: '/placeholder.svg',
    image: '/placeholder.svg',
    content: 'Trekking through the valleys of Spiti. The stark landscape and Buddhist monasteries offer a surreal experience. The local Spitian people are incredibly warm and welcoming! #SpitiValley #HimachalPradesh',
    likes: 320,
    comments: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

// Community Events
const events = [
  {
    id: 1,
    title: 'Backpacking Trip to Northeast',
    date: 'Oct 15 - Oct 25, 2025',
    attendees: 24,
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Himalayan Photography Workshop',
    date: 'Nov 5 - Nov 10, 2025',
    attendees: 18,
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Kerala Houseboat Experience',
    date: 'Dec 20 - Dec 24, 2025',
    attendees: 30,
    image: '/placeholder.svg',
  },
];

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('feed');

  return (
    <Layout>
      <div className="flex flex-col w-full">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/80 to-primary-light p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-white/90 max-w-2xl">
            Connect with fellow travelers, share your experiences, discover travel buddies, and join exciting community events!
          </p>
        </div>

        {/* Stories */}
        <div className="p-4 bg-white">
          <h2 className="text-lg font-semibold mb-3">Travel Stories</h2>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {stories.map((story) => (
                <CarouselItem key={story.id} className="basis-1/6 sm:basis-1/6">
                  <div className="flex flex-col items-center">
                    <div className={`rounded-full p-1 ${story.seen ? 'bg-gray-300' : 'bg-gradient-to-tr from-primary to-accent'}`}>
                      <Avatar className="h-16 w-16 border-2 border-white">
                        <AvatarImage src={story.avatar} alt={story.name} />
                        <AvatarFallback>{story.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="text-xs mt-1 text-center">{story.username}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {/* Main Content Tabs */}
        <div className="flex-1 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="feed" className="text-sm">Feed</TabsTrigger>
              <TabsTrigger value="events" className="text-sm">Events</TabsTrigger>
              <TabsTrigger value="discover" className="text-sm">Discover</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="space-y-4">
              {/* Create Post Card */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt="Your profile" />
                      <AvatarFallback>YP</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-secondary/80">
                      Share your travel experience...
                    </div>
                  </div>
                  <div className="flex justify-around mt-3">
                    <Button variant="ghost" className="text-sm">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Photo
                    </Button>
                    <Button variant="ghost" className="text-sm">
                      <Users className="h-4 w-4 mr-2" />
                      Tag Friends
                    </Button>
                    <Button variant="ghost" className="text-sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Ask Community
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Posts */}
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden animate-fade-in">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} alt={post.name} />
                        <AvatarFallback>{post.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{post.name}</CardTitle>
                        <CardDescription className="text-xs">
                          @{post.username} • {timeAgo(post.timestamp)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm mb-3">{post.content}</p>
                    <div className="rounded-md overflow-hidden mb-2">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full object-cover h-64"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 px-4 flex justify-between border-t">
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Heart className="h-4 w-4 mr-1" /> {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <MessageCircle className="h-4 w-4 mr-1" /> {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Share className="h-4 w-4 mr-1" /> Share
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Bookmark className="h-4 w-4 mr-1" /> Save
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white font-semibold">{event.title}</h3>
                        <p className="text-white/80 text-sm">{event.date}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          <Users className="h-4 w-4 inline mr-1" /> 
                          {event.attendees} attending
                        </span>
                        <Button size="sm" variant="outline">Join</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discover" className="space-y-4">
              <div className="bg-secondary p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-2">Discover Fellow Travelers</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Find travel companions with similar interests or get inspired by experienced travelers
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {stories.slice(0, 8).map((traveler) => (
                    <div key={traveler.id} className="flex flex-col items-center">
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={traveler.avatar} alt={traveler.name} />
                        <AvatarFallback>{traveler.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{traveler.name}</span>
                      <span className="text-xs text-gray-500">@{traveler.username}</span>
                      <Button variant="outline" size="sm" className="mt-2 text-xs w-full">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Popular Travel Topics</CardTitle>
                  <CardDescription>Join conversations about these trending topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">#BackpackingIndia</Button>
                    <Button variant="outline" size="sm">#SoloTravel</Button>
                    <Button variant="outline" size="sm">#BudgetTravel</Button>
                    <Button variant="outline" size="sm">#Himalayas</Button>
                    <Button variant="outline" size="sm">#StreetFood</Button>
                    <Button variant="outline" size="sm">#Photography</Button>
                    <Button variant="outline" size="sm">#RuralTourism</Button>
                    <Button variant="outline" size="sm">#NorthEast</Button>
                    <Button variant="outline" size="sm">#WildlifeIndia</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
