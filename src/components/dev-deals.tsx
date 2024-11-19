<content>// Previous imports remain the same...

export const DevDeals: React.FC<DevDealsProps> = ({ category }) => {
  // Previous state and hooks remain the same...

  const filteredDeals = deals
    .filter(deal => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'featured') return deal.featured;
      if (selectedCategory === 'blackfriday') return deal.blackFriday;
      return deal.category.toLowerCase().includes(selectedCategory.toLowerCase());
    })
    .sort((a, b) => {
      // Always show BoltAI first
      if (a.title === "BoltAI") return -1;
      if (b.title === "BoltAI") return 1;
      // Then show featured deals
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then sort by ID (newest first)
      return b.id - a.id;
    });

  // Rest of the component remains the same until the deal card rendering...

  {filteredDeals.map((deal) => (
    <Link 
      key={deal.id} 
      to={`/${createSlug(deal.title)}`}
      className="block hover:bg-gray-50 transition-colors rounded-lg"
      onClick={(e) => handleDealClick(e, deal.id)}
    >
      <div className={`p-4 border-gray-200 border rounded-lg ${
        deal.title === "BoltAI" 
          ? "bg-[#FFF4CC] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-[shimmer_2s_infinite] hover:bg-[#FFF4CC]/90"
          : ""
      }`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-3">
                {favicons[deal.id] && (
                  <img 
                    src={favicons[deal.id]} 
                    alt={`${deal.title} favicon`}
                    className="w-8 h-8 rounded-lg object-cover bg-gray-50"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
                <h3 className="text-lg font-medium truncate">{deal.title}</h3>
              </div>
              <div className="flex gap-2 flex-wrap">
                {deal.featured && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500 text-black rounded-full">
                    Featured
                  </span>
                )}
                {deal.blackFriday && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-purple-500 text-white rounded-full">
                    Black Friday
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              {deal.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="vote-buttons">
                <VoteButtons dealId={deal.id} />
              </div>
              <div className="text-sm text-gray-600">
                {deal.category}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-emerald-700 font-medium whitespace-nowrap">
              {deal.discount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  ))}

  // Rest of the component remains the same...
</content>