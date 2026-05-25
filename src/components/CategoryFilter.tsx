import React from 'react';
import { motion } from 'framer-motion';
import { Category, CATEGORIES } from '../data/mockData';
interface CategoryFilterProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}
export function CategoryFilter({
  activeCategory,
  onSelectCategory
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 hide-scrollbar">
      <div className="flex px-4 space-x-3">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${isActive ? 'text-amber-700' : 'text-gray-600 bg-white shadow-sm hover:bg-gray-50'}`}>
              
              {isActive &&
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-amber-100 rounded-full"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }} />

              }
              <span className="relative z-10">{category}</span>
            </button>);

        })}
      </div>
    </div>);

}