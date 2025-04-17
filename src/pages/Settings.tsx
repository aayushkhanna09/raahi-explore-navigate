
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BellRing, 
  UserRound, 
  ShieldCheck, 
  Lock, 
  Globe, 
  Moon, 
  LogOut, 
  X,
  Plus,
  Tag
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Profile editing state
  const [profileData, setProfileData] = useState({
    name: 'Aryan Gupta',
    bio: 'Passionate traveler exploring the hidden gems of India. Love street food, historical sites, and meeting new people.',
    location: 'Bengaluru, Karnataka',
    email: 'aryan.gupta@example.com',
    phoneNumber: '+91 9876543210'
  });

  // Travel tags state
  const [tags, setTags] = useState([
    'Solo Traveller', 
    'Foodie', 
    'Photographer', 
    'Mountain Lover'
  ]);
  const [newTag, setNewTag] = useState('');

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!",
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Apply dark mode to the document
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: `${!darkMode ? 'Dark' : 'Light'} mode activated`,
      description: `Theme has been changed to ${!darkMode ? 'dark' : 'light'} mode.`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Come back soon!",
    });
    navigate('/auth');
  };

  return (
    <Layout>
      <div className="p-4 pb-20">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold font-heading">Settings</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <UserRound size={20} />
          </Button>
        </div>

        <Tabs defaultValue="profile" className="mb-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleProfileChange}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                  />
                </div>

                <Button onClick={handleSaveProfile} className="w-full">
                  Save Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="mr-2 h-5 w-5" />
                  Travel Tags
                </CardTitle>
                <CardDescription>Add tags that describe you as a traveler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                      {tag}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4 rounded-full"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., Backpacker)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleProfileChange}
                  />
                </div>

                <Separator className="my-4" />
                
                <Button variant="outline" className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how RAही looks</CardDescription>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing size={20} />
                    <Label htmlFor="trip-updates">Trip Updates</Label>
                  </div>
                  <Switch
                    id="trip-updates"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing size={20} />
                    <Label htmlFor="messages">New Messages</Label>
                  </div>
                  <Switch
                    id="messages"
                    checked={true}
                    onCheckedChange={() => {}}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BellRing size={20} />
                    <Label htmlFor="community">Community Activity</Label>
                  </div>
                  <Switch
                    id="community"
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language</CardTitle>
                <CardDescription>Choose your preferred language</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck size={20} />
                    <Label htmlFor="profile-visibility">Public Profile</Label>
                  </div>
                  <Switch
                    id="profile-visibility"
                    checked={true}
                    onCheckedChange={() => {}}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck size={20} />
                    <Label htmlFor="location-sharing">Location Sharing</Label>
                  </div>
                  <Switch
                    id="location-sharing"
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Button 
              variant="destructive" 
              className="w-full mt-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
