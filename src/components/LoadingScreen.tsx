
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-light to-primary">
      <div className="text-white flex flex-col items-center gap-4">
        <div className="text-4xl font-bold font-heading">
          RA<span className="font-hindi">ही</span>
        </div>
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    </div>
  );
};

export default LoadingScreen;
