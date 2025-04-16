
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star } from 'lucide-react';

// Mock data - in a real app, this would come from an API
const recommendations = [
  {
    id: 1,
    name: 'Gateway of India',
    location: 'Mumbai, Maharashtra',
    category: 'Landmark',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2F0ZXdheSUyMG9mJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    duration: '2 hours',
  },
  {
    id: 2,
    name: 'Mysore Palace',
    location: 'Mysore, Karnataka',
    category: 'Architecture',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1600689652271-8d93dcc3b4d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXlzb3JlJTIwcGFsYWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    duration: '3 hours',
  },
  {
    id: 3,
    name: 'Spice Market Tour',
    location: 'Kochi, Kerala',
    category: 'Experience',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BpY2UlMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    duration: '2 hours',
  }
];

const localFood = [
  {
    id: 1,
    name: 'Paratha Wala',
    location: 'Delhi',
    category: 'Street Food',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwcGFyYXRoYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    duration: '30 mins',
  },
  {
    id: 2,
    name: 'Dosa Corner',
    location: 'Bangalore, Karnataka',
    category: 'South Indian',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    duration: '45 mins',
  },
];

const events = [
  {
    id: 1,
    name: 'Holi Festival',
    location: 'Mathura, Uttar Pradesh',
    category: 'Festival',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1576433176435-4edfe5faf099?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9saSUyMGZlc3RpdmFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    duration: 'Full day',
  },
  {
    id: 2,
    name: 'Classical Music Concert',
    location: 'Chennai, Tamil Nadu',
    category: 'Music',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwY2xhc3NpY2FsJTIwbXVzaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    duration: '3 hours',
  },
];

interface ExperienceCardProps {
  name: string;
  location: string;
  image: string;
  rating: number;
  duration: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ name, location, image, rating, duration }) => {
  return (
    <Card className="overflow-hidden">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(${image})` }}
      />
      <CardContent className="p-4">
        <h3 className="font-heading font-medium text-lg">{name}</h3>
        <div className="flex items-center text-gray-500 mt-1">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center text-amber-500">
            <Star size={14} className="mr-1" fill="currentColor" />
            <span className="text-sm">{rating}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock size={14} className="mr-1" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Explore: React.FC = () => {
  return (
    <Layout>
      <div className="p-6 mb-16">
        <h1 className="text-2xl font-bold font-heading mb-6">Explore Experiences</h1>
        
        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="food">Local Food</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended" className="space-y-4">
            {recommendations.map(item => (
              <ExperienceCard
                key={item.id}
                name={item.name}
                location={item.location}
                image={item.image}
                rating={item.rating}
                duration={item.duration}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="food" className="space-y-4">
            {localFood.map(item => (
              <ExperienceCard
                key={item.id}
                name={item.name}
                location={item.location}
                image={item.image}
                rating={item.rating}
                duration={item.duration}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            {events.map(item => (
              <ExperienceCard
                key={item.id}
                name={item.name}
                location={item.location}
                image={item.image}
                rating={item.rating}
                duration={item.duration}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Explore;
