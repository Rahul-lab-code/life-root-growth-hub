
import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppLogoProps {
  variant?: 'default' | 'sidebar';
}

const AppLogo: React.FC<AppLogoProps> = ({ variant = 'default' }) => {
  const isSidebar = variant === 'sidebar';
  
  return (
    <Link to="/" className={`flex items-center gap-2 ${isSidebar ? 'justify-center py-6' : ''}`}>
      <div className="bg-liferoot-green rounded-full p-2 flex items-center justify-center">
        <Leaf className="h-5 w-5 text-white" />
      </div>
      <span className={`font-bold text-xl ${isSidebar ? 'text-sidebar-foreground' : 'text-primary'}`}>
        Life<span className="text-liferoot-blue">Root</span>
      </span>
    </Link>
  );
};

export default AppLogo;
