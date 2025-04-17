
import React, { useEffect } from 'react';
import BottomNavigation from './BottomNavigation';
import FloatingChatButton from '../chat/FloatingChatButton';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNavigation = false }) => {
  const location = useLocation();
  const pathsWithoutNav = ['/', '/auth'];
  const pathsWithoutChat = ['/', '/auth', '/chat'];
  
  const shouldHideNav = hideNavigation || pathsWithoutNav.includes(location.pathname);
  const shouldShowChatButton = !pathsWithoutChat.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main>{children}</main>
      {!shouldHideNav && <BottomNavigation />}
      {shouldShowChatButton && <FloatingChatButton />}
    </div>
  );
};

export default Layout;
