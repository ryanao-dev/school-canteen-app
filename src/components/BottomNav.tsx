import React from 'react';
import { HomeIcon, ShoppingBagIcon, ClockIcon, ListIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export type PageType = 'menu' | 'detail' | 'cart' | 'tracking' | 'history';
interface BottomNavProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  cartCount: number;
}
export function BottomNav({
  currentPage,
  onNavigate,
  cartCount
}: BottomNavProps) {
  const navItems = [
  {
    id: 'menu',
    label: 'Menu',
    icon: HomeIcon
  },
  {
    id: 'cart',
    label: 'Cart',
    icon: ShoppingBagIcon,
    badge: cartCount
  },
  {
    id: 'tracking',
    label: 'Active',
    icon: ClockIcon
  },
  {
    id: 'history',
    label: 'History',
    icon: ListIcon
  }] as
  const;
  // Don't show bottom nav on detail page to keep focus on the item
  if (currentPage === 'detail') return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 pb-safe pt-2 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.04)] z-50">
      <div className="flex justify-between items-center max-w-md mx-auto pb-4">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex flex-col items-center p-2 w-16">
              
              <div className="relative">
                <Icon
                  className={`w-6 h-6 mb-1 transition-colors ${isActive ? 'text-amber-600' : 'text-gray-400'}`}
                  strokeWidth={isActive ? 2.5 : 2} />
                

                {/* Cart Badge */}
                <AnimatePresence>
                  {item.badge !== undefined && item.badge > 0 &&
                  <motion.div
                    key={item.badge}
                    initial={{
                      scale: 0.5,
                      opacity: 0
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1
                    }}
                    exit={{
                      scale: 0.5,
                      opacity: 0
                    }}
                    className="absolute -top-1 -right-2 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    
                      {item.badge}
                    </motion.div>
                  }
                </AnimatePresence>
              </div>
              <span
                className={`text-[10px] font-medium transition-colors ${isActive ? 'text-amber-700' : 'text-gray-400'}`}>
                
                {item.label}
              </span>
            </button>);

        })}
      </div>
    </div>);

}