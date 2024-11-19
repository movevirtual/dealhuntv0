import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoteStore } from '@/lib/vote-store';

interface VoteButtonsProps {
  dealId: number;
  onVote?: () => void;
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({ dealId, onVote }) => {
  const [currentVote, setCurrentVote] = useState(VoteStore.getVote(dealId)?.type || null);
  const [showUpCount, setShowUpCount] = useState(false);
  const [showDownCount, setShowDownCount] = useState(false);
  const voteCounts = VoteStore.getVoteCounts(dealId);

  const handleVote = (type: 'up' | 'down') => {
    if (currentVote === type) {
      VoteStore.removeVote(dealId);
      setCurrentVote(null);
    } else {
      VoteStore.setVote(dealId, type);
      setCurrentVote(type);
    }
    onVote?.();
  };

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className={`gap-1.5 ${currentVote === 'up' ? 'bg-green-50 border-green-200 text-green-600' : ''}`}
          onClick={() => handleVote('up')}
          onMouseEnter={() => setShowUpCount(true)}
          onMouseLeave={() => setShowUpCount(false)}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="sr-only">Upvote</span>
        </Button>
        {showUpCount && voteCounts.up > 0 && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap">
            {voteCounts.up} upvote{voteCounts.up !== 1 ? 's' : ''}
          </div>
        )}
      </div>
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className={`gap-1.5 ${currentVote === 'down' ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
          onClick={() => handleVote('down')}
          onMouseEnter={() => setShowDownCount(true)}
          onMouseLeave={() => setShowDownCount(false)}
        >
          <ThumbsDown className="w-4 h-4" />
          <span className="sr-only">Downvote</span>
        </Button>
        {showDownCount && voteCounts.down > 0 && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap">
            {voteCounts.down} downvote{voteCounts.down !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};