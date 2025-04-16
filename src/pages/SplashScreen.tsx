
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RaahiLogo from '@/components/ui/RaahiLogo';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-light to-primary">
      <div className="animate-bounce-light">
        <RaahiLogo size="lg" colorTheme="light" />
      </div>
      <p className="text-white mt-4 font-heading">Explore. Navigate. Experience.</p>
    </div>
  );
};

export default SplashScreen;
