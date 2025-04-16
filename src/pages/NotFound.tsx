
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { MapPinOff } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="flex flex-col items-center text-center">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <MapPinOff size={42} className="text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold font-heading mb-4">Lost Your Way?</h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md">
          Even the most experienced traveler gets lost sometimes. Let's get you back on track!
        </p>
        
        <Button 
          onClick={() => navigate('/home')}
          className="bg-primary hover:bg-primary-dark"
          size="lg"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
