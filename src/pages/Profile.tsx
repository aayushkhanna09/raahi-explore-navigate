
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings, LogOut, Moon, Globe, Bell, MapPin, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Mock data - in a real app this would come from an API
  const userProfile = {
    name: 'Aryan Gupta',
    username: '@aryang',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    location: 'Bengaluru, Karnataka',
    joinedDate: 'June 2023',
    bio: 'Passionate traveler exploring the hidden gems of India. Love street food, historical sites, and meeting new people.',
    stats: {
      trips: 12,
      reviews: 24,
      badges: 5
    },
    badges: [
      { name: 'Explorer', description: 'Visited 10+ destinations' },
      { name: 'Foodie', description: 'Tried local cuisine in 5+ cities' },
      { name: 'Photographer', description: 'Shared 20+ travel photos' },
    ]
  };

  const pastTrips = [
    {
      id: 1,
      destination: 'Goa Beach Getaway',
      date: 'March 2023',
      duration: '5 days',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 2,
      destination: 'Kerala Backwaters',
      date: 'December 2023',
      duration: '7 days',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 3,
      destination: 'Rajasthan Heritage Tour',
      date: 'October 2023',
      duration: '10 days',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGphaXB1cnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    }
  ];

  const savedPlaces = [
    {
      id: 1,
      name: 'Hampi Ruins',
      location: 'Karnataka',
      image: 'https://images.unsplash.com/photo-1590050752117-2c9be199584f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFtcGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 2,
      name: 'Valley of Flowers',
      location: 'Uttarakhand',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFuYWxpfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
    navigate('/auth');
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `${!darkMode ? 'Dark' : 'Light'} mode activated`,
      description: `Theme has been changed to ${!darkMode ? 'dark' : 'light'} mode.`,
    });
  };

  return (
    <Layout>
      <div className="p-4 pb-20">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold font-heading">Profile</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
            <Settings size={20} />
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Avatar className="h-20 w-20 mr-4">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{userProfile.name}</h2>
                <p className="text-gray-500">{userProfile.username}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {userProfile.location}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm">{userProfile.bio}</div>

            <div className="grid grid-cols-3 gap-4 mt-4 text-center">
              <div>
                <div className="text-2xl font-bold">{userProfile.stats.trips}</div>
                <div className="text-sm text-gray-500">Trips</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userProfile.stats.reviews}</div>
                <div className="text-sm text-gray-500">Reviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userProfile.stats.badges}</div>
                <div className="text-sm text-gray-500">Badges</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="trips" className="mb-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="mt-4">
            <div className="space-y-4">
              {pastTrips.map(trip => (
                <div key={trip.id} className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                  <div 
                    className="w-1/3 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${trip.image})` }}
                  />
                  <div className="w-2/3 p-4">
                    <h3 className="font-medium">{trip.destination}</h3>
                    <div className="text-sm text-gray-500 mt-1">{trip.date} • {trip.duration}</div>
                    <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-4">
            <div className="space-y-4">
              {savedPlaces.map(place => (
                <div key={place.id} className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                  <div 
                    className="w-1/3 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${place.image})` }}
                  />
                  <div className="w-2/3 p-4">
                    <h3 className="font-medium">{place.name}</h3>
                    <div className="text-sm text-gray-500 mt-1">{place.location}</div>
                    <div className="flex mt-2 gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        <Map size={14} className="mr-1" />
                        View Map
                      </Button>
                      <Button size="sm" className="h-8 bg-primary">
                        Add to Trip
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {userProfile.badges.map((badge, index) => (
                <Card key={index}>
                  <CardHeader className="py-4">
                    <Badge variant="outline" className="w-fit mb-2">
                      {badge.name}
                    </Badge>
                    <CardDescription>{badge.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon size={20} />
                <Label htmlFor="dark-mode">Dark Mode</Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleToggleDarkMode}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe size={20} />
                <Label htmlFor="language">Language</Label>
              </div>
              <select
                id="language"
                className="bg-transparent text-right cursor-pointer outline-none"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="tamil">Tamil</option>
                <option value="bengali">Bengali</option>
              </select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell size={20} />
                <Label htmlFor="notifications">Notifications</Label>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            <Separator />
            
            <Button 
              variant="destructive" 
              className="w-full mt-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
