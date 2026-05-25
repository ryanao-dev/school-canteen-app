import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { MenuItem } from '../data/mockData';
import { UseCartReturn } from '../hooks/useCart';
interface ItemDetailPageProps {
  item: MenuItem;
  onBack: () => void;
  cart: UseCartReturn;
}
export function ItemDetailPage({ item, onBack, cart }: ItemDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]>(
    []);
  const toggleCustomization = (cust: string) => {
    setSelectedCustomizations((prev) =>
    prev.includes(cust) ? prev.filter((c) => c !== cust) : [...prev, cust]
    );
  };
  const handleAddToCart = () => {
    cart.addItem(item, quantity, selectedCustomizations);
    onBack();
  };
  const totalPrice = item.price * quantity;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0,
        y: 20
      }}
      className="min-h-screen bg-white flex flex-col">
      
      {/* Header Image Area */}
      <div className="relative bg-amber-50 h-64 flex items-center justify-center rounded-b-[40px]">
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm text-gray-800 z-10">
          
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <motion.div
          initial={{
            scale: 0.5,
            rotate: -10
          }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: 'spring',
            bounce: 0.5
          }}
          className="text-9xl drop-shadow-xl">
          
          {item.emoji}
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8 pb-32 overflow-y-auto">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {item.name}
          </h1>
          <span className="text-2xl font-bold text-amber-600">
            £{item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-500 text-base leading-relaxed mb-8">
          {item.description}
        </p>

        {/* Customizations */}
        {item.customizations.length > 0 &&
        <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Customize</h3>
            <div className="space-y-3">
              {item.customizations.map((cust) =>
            <label
              key={cust}
              className="flex items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
              
                  <div className="relative flex items-center justify-center w-6 h-6 mr-3">
                    <input
                  type="checkbox"
                  className="peer appearance-none w-6 h-6 border-2 border-gray-200 rounded-md checked:bg-amber-500 checked:border-amber-500 transition-colors"
                  checked={selectedCustomizations.includes(cust)}
                  onChange={() => toggleCustomization(cust)} />
                
                    <svg
                  className="absolute w-4 h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{cust}</span>
                </label>
            )}
            </div>
          </div>
        }

        {/* Quantity */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl mb-8">
          <span className="font-bold text-gray-900">Quantity</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
              
              <MinusIcon className="w-5 h-5" />
            </button>
            <span className="text-xl font-bold w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 active:scale-95 transition-transform">
              
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-6 pb-safe z-20">
        <motion.button
          whileTap={{
            scale: 0.98
          }}
          onClick={handleAddToCart}
          className="w-full bg-amber-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-amber-600/20 flex justify-between items-center px-6">
          
          <span>Add to Cart</span>
          <span>£{totalPrice.toFixed(2)}</span>
        </motion.button>
      </div>
    </motion.div>);

}