import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, ShoppingBagIcon } from 'lucide-react';
import { MenuItem, Category } from '../data/mockData';
import { fetchMenu } from '../data/api';
import { CategoryFilter } from '../components/CategoryFilter';
import { MenuItemCard } from '../components/MenuItemCard';
interface MenuPageProps {
  onItemSelect: (id: string) => void;
  onGoToCart: () => void;
  cartCount: number;
}
export function MenuPage({
  onItemSelect,
  onGoToCart,
  cartCount
}: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu()
      .then(setMenuItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, menuItems]);
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="min-h-screen bg-background pb-28">
      
      {/* Header */}
      <div className="bg-white pt-12 pb-4 px-4 shadow-sm sticky top-0 z-30">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good morning! ☀️
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              What are you craving today?
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for food, coffee, snacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all outline-none" />
          
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-[140px] z-20 bg-background/95 backdrop-blur-sm">
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory} />
        
      </div>

      {/* Menu Grid */}
      <motion.div
        className="px-4 pt-4 grid grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}>
        
        {loading ?
        <div className="col-span-2 text-center py-12 text-gray-400">Loading menu...</div> :
        filteredItems.length > 0 ?
        filteredItems.map((item) =>
        <MenuItemCard
          key={item.id}
          item={item}
          onClick={() => onItemSelect(item.id)} />

        ) :

        <div className="col-span-2 text-center py-12 text-gray-500">
            No items found matching your search.
          </div>
        }
      </motion.div>

      {/* Floating Cart Button (Mobile) */}
      {cartCount > 0 &&
      <motion.button
        initial={{
          y: 100,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={onGoToCart}
        className="fixed bottom-24 right-4 bg-amber-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center z-40 md:hidden">
        
          <div className="relative">
            <ShoppingBagIcon className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-amber-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </motion.button>
      }
    </motion.div>);

}