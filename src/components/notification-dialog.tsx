import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const NotificationDialog = ({ isDark, className = '' }: { isDark: boolean; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`gap-2 w-full sm:w-auto ${className}`}>
          <DollarSign className="h-4 w-4" />
          Submit Deal
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} max-w-md mx-4 sm:mx-auto`}>
        <DialogHeader>
          <DialogTitle className={isDark ? 'text-white' : 'text-gray-900'}>Submit a Deal</DialogTitle>
          <DialogDescription className={isDark ? 'text-gray-400' : 'text-gray-500'}>
            Choose how you'd like to submit your deal
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="text-sm text-center mb-2">
            Feature your product deals for just $9 <span className="line-through">$49</span> (for 3 days)
          </div>
          
          <a href="https://buy.stripe.com/cN29Bidj7goMh0c29S" target="_blank" rel="noopener noreferrer">
            <RainbowButton className="w-full flex items-center justify-center gap-2">
              Get Featured $9
            </RainbowButton>
          </a>
          
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} text-center`}>or</p>
          
          <a href="https://tally.so/r/3j0xD9" target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline" 
              className={`w-full ${isDark ? 'text-white hover:bg-gray-800' : 'text-gray-900 hover:bg-gray-100'}`}
              onClick={() => setIsOpen(false)}
            >
              Submit Free Deal
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};