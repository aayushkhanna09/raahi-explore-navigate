
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface DestinationCardProps {
  title: string;
  location: string;
  imageUrl: string;
  onClick?: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  title,
  location,
  imageUrl,
  onClick,
}) => {
  return (
    <Card 
      className="overflow-hidden h-64 w-64 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardContent className="p-4">
        <h3 className="font-heading font-medium text-lg">{title}</h3>
        <div className="flex items-center text-gray-500 mt-1">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{location}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
