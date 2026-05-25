import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MinusIcon, PlusIcon, XIcon, ArrowRightIcon } from 'lucide-react';
import { UseCartReturn } from '../hooks/useCart';
import { TimeSlotPicker } from '../components/TimeSlotPicker';
import { Order } from '../data/mockData';
import { placeOrder } from '../data/api';
interface CartPageProps {
  cart: UseCartReturn;
  onPlaceOrder: (order: Order) => void;
  onBrowse: () => void;
}
export function CartPage({ cart, onPlaceOrder, onBrowse }: CartPageProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const handlePlaceOrder = async () => {
    if (!selectedTime || cart.cartItems.length === 0) return;
    const order = await placeOrder(
      cart.cartItems.map((item) => ({
        itemId: item.menuItem.id,
        quantity: item.quantity,
        customizations: item.customizations
      })),
      selectedTime
    );
    onPlaceOrder(order);
  };
  if (cart.cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background pb-24">
        <div className="bg-white pt-12 pb-4 px-6 shadow-sm sticky top-0 z-30">
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        </div>
        <div className="flex flex-col items-center justify-center px-6 pt-24">
          <div className="w-32 h-32 bg-amber-50 rounded-full flex items-center justify-center mb-6">
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Looks like you haven't added any delicious items yet.
          </p>
          <button
            onClick={onBrowse}
            className="bg-amber-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-amber-600/20">
            Browse Menu
          </button>
        </div>
      </motion.div>
    );
  }
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
      className="min-h-screen bg-background pb-32">
      
      <div className="bg-white pt-12 pb-4 px-6 shadow-sm sticky top-0 z-30">
        <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Items List */}
        <div className="space-y-4">
          {cart.cartItems.map((item) =>
          <div
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
            
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
                {item.menuItem.emoji}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 leading-tight pr-4">
                    {item.menuItem.name}
                  </h3>
                  <button
                  onClick={() => cart.removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 p-1">
                  
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>

                {item.customizations.length > 0 &&
              <p className="text-xs text-gray-500 mt-1 mb-2">
                    {item.customizations.join(', ')}
                  </p>
              }

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-amber-600">
                    £{(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-2 py-1">
                    <button
                    onClick={() => cart.updateQuantity(item.id, -1)}
                    className="text-gray-600 p-1">
                    
                      <MinusIcon className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                    onClick={() => cart.updateQuantity(item.id, 1)}
                    className="text-gray-600 p-1">
                    
                      <PlusIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pickup Time */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Pickup Time</h3>
          <TimeSlotPicker
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime} />
          
        </div>

        {/* Summary */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>£{cart.cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Platform Fee</span>
            <span>£0.50</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <span className="text-xl font-bold text-gray-900">
              £{(cart.cartTotal + 0.5).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-100 p-4 pb-safe z-20">
        <motion.button
          whileTap={{
            scale: 0.98
          }}
          onClick={handlePlaceOrder}
          disabled={!selectedTime}
          className={`w-full py-4 rounded-xl font-bold text-lg flex justify-center items-center space-x-2 transition-colors ${selectedTime ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
          
          <span>Place Order</span>
          {selectedTime && <ArrowRightIcon className="w-5 h-5" />}
        </motion.button>
      </div>
    </motion.div>);

}