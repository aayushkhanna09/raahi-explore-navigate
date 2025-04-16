
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Map, Users, MessageCircle } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navItems = [
    { to: '/home', icon: <Home size={24} />, label: 'Home' },
    { to: '/explore', icon: <Compass size={24} />, label: 'Explore' },
    { to: '/map', icon: <Map size={24} />, label: 'Map' },
    { to: '/community', icon: <Users size={24} />, label: 'Community' },
    { to: '/chat', icon: <MessageCircle size={24} />, label: 'Chat' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            to={item.to}
            key={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center px-3 py-1 ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`
            }
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
