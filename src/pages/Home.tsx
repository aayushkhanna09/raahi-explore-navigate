
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DestinationCard from '@/components/home/DestinationCard';
import CategoryPill from '@/components/home/CategoryPill';
import { Search, Mountain, Factory, Coffee, Utensils, MapPin, Umbrella } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data - in a real app, this would come from an API
const allDestinations = [
  {
    id: 1,
    title: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    categories: ['culture']
  },
  {
    id: 2,
    title: 'Jaipur City Palace',
    location: 'Jaipur, Rajasthan',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFpcHVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    categories: ['culture']
  },
  {
    id: 3,
    title: 'Varanasi Ghats',
    location: 'Varanasi, Uttar Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1561361058-c24e021e2964?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFyYW5hc2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    categories: ['culture']
  },
  {
    id: 4,
    title: 'Manali Mountains',
    location: 'Manali, Himachal Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFuYWxpfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    categories: ['mountains']
  },
  {
    id: 5,
    title: 'Goa Beaches',
    location: 'Goa',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
    categories: ['beaches']
  },
  {
    id: 6,
    title: 'Blue Tokai Coffee',
    location: 'Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29mZmVlJTIwc2hvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    categories: ['cafe']
  },
  {
    id: 7,
    title: 'Karim\'s Restaurant',
    location: 'Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    categories: ['food']
  }
];

const categories = [
  { id: 'mountains', icon: <Mountain size={18} />, label: 'Mountains' },
  { id: 'cafe', icon: <Coffee size={18} />, label: 'Cafes' },
  { id: 'food', icon: <Utensils size={18} />, label: 'Food' },
  { id: 'culture', icon: <Factory size={18} />, label: 'Culture' },
  { id: 'beaches', icon: <Umbrella size={18} />, label: 'Beaches' },
];

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter destinations based on active category and search query
  const filteredDestinations = allDestinations.filter(destination => {
    const matchesCategory = activeCategory 
      ? destination.categories.includes(activeCategory)
      : true;
    
    const matchesSearch = searchQuery
      ? destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    return matchesCategory && matchesSearch;
  });

  const handleDestinationClick = (id: number) => {
    // In a real app, navigate to the destination detail page
    console.log(`Navigate to destination ${id}`);
  };

  const handlePlanTrip = () => {
    navigate('/plan');
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 mb-16">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-heading">
            Hello, Traveller
          </h1>
          <button 
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center"
          >
            <span className="sr-only">Profile</span>
            <span className="text-lg">👤</span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search destinations, cities..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
          <h2 className="font-heading font-medium">Plan Your Next Adventure</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">Create custom itineraries based on your preferences</p>
          <Button 
            onClick={handlePlanTrip} 
            className="bg-primary hover:bg-primary-dark w-full"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Plan a Trip
          </Button>
        </div>

        <div>
          <h2 className="font-heading font-medium mb-3">Browse by Category</h2>
          <ScrollArea className="w-full whitespace-nowrap pb-2">
            <div className="flex gap-3 pb-2">
              {categories.map(category => (
                <CategoryPill
                  key={category.id}
                  icon={category.icon}
                  label={category.label}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(
                    activeCategory === category.id ? '' : category.id
                  )}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <h2 className="font-heading font-medium mb-3">
            {activeCategory ? `${categories.find(c => c.id === activeCategory)?.label}` : 'Featured Destinations'}
          </h2>
          {filteredDestinations.length > 0 ? (
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-4 min-w-max">
                {filteredDestinations.map(destination => (
                  <DestinationCard
                    key={destination.id}
                    title={destination.title}
                    location={destination.location}
                    imageUrl={destination.imageUrl}
                    onClick={() => handleDestinationClick(destination.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500 dark:text-gray-300">No destinations found for this category.</p>
              <Button 
                variant="link" 
                onClick={() => setActiveCategory('')}
              >
                Show all destinations
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
