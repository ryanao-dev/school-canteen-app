import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from 'lucide-react';
import { MenuItem } from '../data/mockData';
interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
}
export function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20
        },
        visible: {
          opacity: 1,
          y: 0
        }
      }}
      whileTap={{
        scale: 0.97
      }}
      onClick={onClick}
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col cursor-pointer hover:shadow-md transition-shadow">
      
      <div className="flex justify-between items-start mb-3">
        <div className="text-5xl bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center">
          {item.emoji}
        </div>
        <div className="bg-amber-50 text-amber-700 px-2 py-1 rounded-lg text-sm font-bold">
          £{item.price.toFixed(2)}
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">
        {item.name}
      </h3>
      <p className="text-gray-500 text-sm line-clamp-2 flex-grow mb-4">
        {item.description}
      </p>

      <button className="mt-auto w-full bg-gray-50 hover:bg-amber-50 text-gray-900 hover:text-amber-700 py-2.5 rounded-xl flex items-center justify-center font-medium transition-colors group">
        <PlusIcon className="w-4 h-4 mr-1 text-gray-400 group-hover:text-amber-600 transition-colors" />
        Add
      </button>
    </motion.div>);

}