
import React from 'react';
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
  const pathsWithoutChat = ['/', '/auth', '/chat']; // Added '/chat' to hide the floating button on chat page
  
  const shouldHideNav = hideNavigation || pathsWithoutNav.includes(location.pathname);
  const shouldShowChatButton = !pathsWithoutChat.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <main className="dark:text-gray-100">{children}</main>
      {!shouldHideNav && <BottomNavigation />}
      {shouldShowChatButton && <FloatingChatButton />}
    </div>
  );
};

export default Layout;
