import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NotificationDialog } from '../notification-dialog';
import { RainbowButton } from '../magicui/rainbow-button';

interface NavProps {
  onOpenMobileNav?: () => void;
}

export const Nav: React.FC<NavProps> = ({ onOpenMobileNav }) => {
  return (
    <header className="h-16 border-b border-gray-200 sticky top-0 z-10 bg-white">
      <div className="h-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="md:hidden -ml-1"
              onClick={onOpenMobileNav}
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">/</span>
              </div>
              <span className="font-medium hidden sm:block">DealHunt</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <NotificationDialog isDark={false} className="hidden xs:flex" />
            <a 
              href="https://buy.stripe.com/cN29Bidj7goMh0c29S" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <RainbowButton>
                Get Featured $9
              </RainbowButton>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};