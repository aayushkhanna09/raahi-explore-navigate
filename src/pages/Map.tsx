
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, MapPin, Navigation, Map as MapIcon, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock map component - in a real app, we'd use a library like react-map-gl or Google Maps
const MockMap: React.FC = () => {
  return (
    <div className="relative h-full w-full bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <MapIcon className="h-16 w-16 text-primary mb-2 mx-auto" />
        <p className="text-gray-500">Map visualization would appear here.</p>
        <p className="text-xs text-gray-400 mt-1">Using mapping libraries in a real app</p>
      </div>
      
      {/* Mock map markers */}
      <div className="absolute top-1/4 left-1/3">
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
          <MapPin size={16} />
        </div>
      </div>
      <div className="absolute bottom-1/3 right-1/4">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
          <MapPin size={16} />
        </div>
      </div>
      <div className="absolute top-1/2 right-1/3">
        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-black">
          <MapPin size={16} />
        </div>
      </div>
    </div>
  );
};

const MapPage: React.FC = () => {
  const [transportMode, setTransportMode] = useState('walking');
  const [searchQuery, setSearchQuery] = useState('');

  const transportOptions = [
    { value: 'walking', label: 'Walking' },
    { value: 'cycling', label: 'Cycling' },
    { value: 'driving', label: 'Driving' },
    { value: 'transit', label: 'Public Transit' },
  ];

  const placeCategories = [
    { id: 'attractions', label: 'Tourist Attractions' },
    { id: 'food', label: 'Restaurants & Cafes' },
    { id: 'hotels', label: 'Hotels & Accommodations' },
    { id: 'shopping', label: 'Shopping' },
    { id: 'transport', label: 'Transport Hubs' },
  ];

  const safetyFeatures = [
    { id: 'crowdLevel', label: 'Show Crowd Levels' },
    { id: 'safetyRating', label: 'Show Safety Ratings' },
    { id: 'womenFriendly', label: 'Women-Friendly Routes' },
  ];

  return (
    <Layout>
      <div className="h-screen flex flex-col">
        <div className="p-4 flex items-center gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search locations..."
              className="pl-10 pr-20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Map Filters</SheetTitle>
                    <SheetDescription>
                      Customize what you see on the map
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Show on Map</h3>
                      <div className="space-y-2">
                        {placeCategories.map(category => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox id={category.id} defaultChecked />
                            <Label htmlFor={category.id}>{category.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Safety Features</h3>
                      <div className="space-y-2">
                        {safetyFeatures.map(feature => (
                          <div key={feature.id} className="flex items-center space-x-2">
                            <Checkbox id={feature.id} />
                            <Label htmlFor={feature.id}>{feature.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2">
          <Select value={transportMode} onValueChange={setTransportMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Transport Mode" />
            </SelectTrigger>
            <SelectContent>
              {transportOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Navigation className="h-4 w-4" />
          </Button>
          <Button className="bg-primary">
            <MapPin className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
        </div>

        <div className="flex-grow">
          <MockMap />
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
