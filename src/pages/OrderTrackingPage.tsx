import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Order } from '../data/mockData';
import { OrderStatusTracker } from '../components/OrderStatusTracker';
interface OrderTrackingPageProps {
  order: Order | null;
  onBackToMenu: () => void;
}
export function OrderTrackingPage({
  order,
  onBackToMenu
}: OrderTrackingPageProps) {
  // Simulate order progress for demo purposes
  const [currentStatus, setCurrentStatus] = useState(
    order?.status || 'Confirmed'
  );
  useEffect(() => {
    if (!order) return;
    const timer1 = setTimeout(() => setCurrentStatus('Preparing'), 3000);
    const timer2 = setTimeout(() => setCurrentStatus('Ready'), 8000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [order]);
  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          No active orders
        </h2>
        <button onClick={onBackToMenu} className="text-amber-600 font-medium">
          Browse Menu
        </button>
      </div>);

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
      className="min-h-screen bg-background pb-24">
      
      <div className="bg-amber-600 pt-16 pb-8 px-6 text-white rounded-b-[40px] shadow-md">
        <h1 className="text-3xl font-bold mb-2">Order {order.id}</h1>
        <p className="text-amber-100 text-lg">
          Estimated pickup:{' '}
          <span className="font-bold text-white">{order.estimatedTime}</span>
        </p>
      </div>

      <div className="px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <OrderStatusTracker status={currentStatus} />

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {currentStatus === 'Confirmed' && 'Order received!'}
              {currentStatus === 'Preparing' && 'Kitchen is cooking...'}
              {currentStatus === 'Ready' && 'Ready for pickup!'}
            </h3>
            <p className="text-gray-500 text-sm">
              {currentStatus === 'Confirmed' &&
              'We are sending your order to the kitchen.'}
              {currentStatus === 'Preparing' &&
              'Your food is being prepared with care.'}
              {currentStatus === 'Ready' &&
              'Head to the counter to grab your food.'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">
            Order Summary
          </h3>
          <div className="space-y-4">
            {order.items.map((item) =>
            <div key={item.id} className="flex justify-between items-start">
                <div className="flex gap-3">
                  <span className="text-gray-500 font-medium">
                    {item.quantity}x
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">
                      {item.menuItemName}
                    </p>
                    {item.customizations.length > 0 &&
                  <p className="text-xs text-gray-500 mt-0.5">
                        {item.customizations.join(', ')}
                      </p>
                  }
                  </div>
                </div>
                <span className="font-medium text-gray-900">
                  £{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-900">Total Paid</span>
            <span className="text-xl font-bold text-amber-600">
              £{(order.total + 0.5).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>);

}