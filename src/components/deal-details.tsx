import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { NotificationDialog } from './notification-dialog';
import { MobileNav } from './mobile-nav';
import { VoteButtons } from './vote-buttons';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { deals } from '@/data/deals';
import { categories } from '@/config/categories';
import { createSlug } from '@/lib/utils';
import { CategoryIcon } from './category-icon';
import { Nav } from './layout/nav';

export const DealDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { dealSlug } = useParams();
  const navigate = useNavigate();
  
  const deal = deals.find(d => createSlug(d.title) === dealSlug);

  if (!deal) {
    return <div>Deal not found</div>;
  }

  const handleCategorySelect = (category: string) => {
    const selectedItem = categories.flatMap(cat => cat.items).find(item => item.id === category);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Nav onOpenMobileNav={() => setIsMobileNavOpen(true)} />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        isDark={false}
      />

      <div className="flex">
        <aside className="hidden md:flex w-64 border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16 flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {categories.map(({ section, items }) => (
              <div key={section} className="mb-6">
                <h3 className="text-xs uppercase mb-3 text-gray-600">{section}</h3>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-sm transition-colors ${
                        selectedCategory === item.id 
                          ? 'bg-gray-100 text-black'
                          : 'text-gray-600 hover:bg-gray-100/50'
                      }`}
                    >
                      <CategoryIcon id={item.id as any} isDark={false} />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h3 className="font-medium mb-2">Get Featured</h3>
              <p className="text-sm text-gray-600 mb-4">
                Feature your product deals for just $9 <span className="line-through">$49</span> (for 3 days).
              </p>
              <a href="https://buy.stripe.com/cN29Bidj7goMh0c29S" target="_blank" rel="noopener noreferrer">
                <RainbowButton className="w-full">
                  Get Featured Today!
                </RainbowButton>
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-32">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold">{deal.title}</h1>
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
              <p className="text-lg text-gray-600">
                {deal.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {deal.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-gray-700">
                {deal.longDescription}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Stats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {deal.stats.map((stat, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-100">
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {deal.reviews.map((review, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-100">
                    <p className="mb-3">{review.content}</p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{review.author}</span>
                      {review.role && <span> · {review.role}</span>}
                      {review.company && <span> · {review.company}</span>}
                    </div>
                    <div className="text-xs mt-1 text-gray-400">
                      via {review.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
              <div className="flex-shrink-0">
                <VoteButtons dealId={deal.id} />
              </div>
              {deal.promoCode && (
                <div className="relative group">
                  <Button
                    variant="outline"
                    className="gap-2 bg-gray-50 border-2 hover:bg-gray-100 transition-colors"
                    onClick={() => handleCopyCode(deal.promoCode!)}
                  >
                    <span className="font-medium">{deal.promoCode}</span>
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-green-600 text-white text-xs rounded-md whitespace-nowrap">
                    Click to copy the code & apply on checkout
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-green-600"></div>
                  </div>
                </div>
              )}
              <a 
                href={deal.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" className="w-full h-10">
                  Get This Deal
                </Button>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};