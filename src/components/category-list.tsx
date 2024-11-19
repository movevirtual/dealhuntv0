import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryIcon } from './category-icon';

interface Category {
  id: string;
  label: string;
  path: string;
}

interface CategoryListProps {
  section: string;
  items: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  isDark: boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  section,
  items,
  selectedCategory,
  onSelectCategory,
  isDark,
}) => {
  const navigate = useNavigate();

  const handleCategoryClick = (item: Category) => {
    onSelectCategory(item.id);
    navigate(item.path);
  };

  return (
    <div className="mb-6">
      <h3 className={`text-xs uppercase mb-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>{section}</h3>
      <div className="space-y-1.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleCategoryClick(item)}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-sm transition-colors ${
              selectedCategory === item.id 
                ? isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
                : isDark ? 'text-gray-400 hover:bg-gray-800/50' : 'text-gray-600 hover:bg-gray-100/50'
            }`}
          >
            <CategoryIcon id={item.id as any} isDark={isDark} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};