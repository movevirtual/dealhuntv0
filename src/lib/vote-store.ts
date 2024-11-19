interface Vote {
  dealId: number;
  type: 'up' | 'down';
  timestamp: number;
}

const VOTES_KEY = 'dealhunt:votes';
const VOTE_COUNTS_KEY = 'dealhunt:vote-counts';

interface VoteCounts {
  [dealId: number]: {
    up: number;
    down: number;
  };
}

export const VoteStore = {
  getVote(dealId: number): Vote | null {
    const votes = this.getAllVotes();
    return votes.find(vote => vote.dealId === dealId) || null;
  },

  getAllVotes(): Vote[] {
    try {
      const votes = localStorage.getItem(VOTES_KEY);
      return votes ? JSON.parse(votes) : [];
    } catch {
      return [];
    }
  },

  getVoteCounts(dealId: number): { up: number; down: number } {
    try {
      const counts = localStorage.getItem(VOTE_COUNTS_KEY);
      const allCounts: VoteCounts = counts ? JSON.parse(counts) : {};
      return allCounts[dealId] || { up: 0, down: 0 };
    } catch {
      return { up: 0, down: 0 };
    }
  },

  setVote(dealId: number, type: 'up' | 'down') {
    const votes = this.getAllVotes().filter(vote => vote.dealId !== dealId);
    votes.push({ dealId, type, timestamp: Date.now() });
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));

    const counts = localStorage.getItem(VOTE_COUNTS_KEY);
    const allCounts: VoteCounts = counts ? JSON.parse(counts) : {};
    
    if (!allCounts[dealId]) {
      allCounts[dealId] = { up: 0, down: 0 };
    }
    
    const previousVote = this.getVote(dealId);
    if (previousVote && previousVote.type !== type) {
      allCounts[dealId][previousVote.type] = Math.max(0, allCounts[dealId][previousVote.type] - 1);
    }
    
    allCounts[dealId][type]++;
    localStorage.setItem(VOTE_COUNTS_KEY, JSON.stringify(allCounts));
  },

  removeVote(dealId: number) {
    const previousVote = this.getVote(dealId);
    const votes = this.getAllVotes().filter(vote => vote.dealId !== dealId);
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));

    if (previousVote) {
      const counts = localStorage.getItem(VOTE_COUNTS_KEY);
      const allCounts: VoteCounts = counts ? JSON.parse(counts) : {};
      
      if (allCounts[dealId]) {
        allCounts[dealId][previousVote.type] = Math.max(0, allCounts[dealId][previousVote.type] - 1);
        localStorage.setItem(VOTE_COUNTS_KEY, JSON.stringify(allCounts));
      }
    }
  }
};