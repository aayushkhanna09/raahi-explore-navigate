
import React from 'react';
import BottomNavigation from './BottomNavigation';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavigation = false }) => {
  const location = useLocation();
  const pathsWithoutNav = ['/', '/auth'];
  
  const shouldHideNav = hideNavigation || pathsWithoutNav.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main>{children}</main>
      {!shouldHideNav && <BottomNavigation />}
    </div>
  );
};

export default Layout;
