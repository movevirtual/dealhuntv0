import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryList } from './category-list';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  categories: {
    section: string;
    items: Array<{
      id: string;
      label: string;
      path: string;
    }>;
  }[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  isDark: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  isDark,
}) => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    const selectedItem = categories.flatMap(cat => cat.items).find(item => item.id === category);
    if (selectedItem) {
      onSelectCategory(category);
      navigate(selectedItem.path);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 ${isDark ? 'bg-black' : 'bg-white'} shadow-xl`}>
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-4 pb-6">
          {categories.map(({ section, items }) => (
            <CategoryList
              key={section}
              section={section}
              items={items}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </div>
  );
};