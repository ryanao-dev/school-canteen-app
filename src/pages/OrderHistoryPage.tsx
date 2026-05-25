import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Order } from '../data/mockData';
import { fetchOrderHistory } from '../data/api';
export function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrderHistory().then(setOrders).catch(console.error);
  }, []);
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
      
      <div className="bg-white pt-12 pb-4 px-6 shadow-sm sticky top-0 z-30">
        <h1 className="text-2xl font-bold text-gray-900">Past Orders</h1>
      </div>

      <div className="p-6 space-y-4">
        {orders.map((order) =>
        <div
          key={order.id}
          className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          
            <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-4">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {order.date}
                </span>
                <h3 className="font-bold text-gray-900 mt-1">{order.id}</h3>
              </div>
              <div className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-bold">
                {order.status}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 overflow-x-auto hide-scrollbar">
              {order.items.map((item, idx) =>
            <div
              key={idx}
              className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shrink-0"
              title={item.menuItemName}>
              
                  {item.emoji}
                </div>
            )}
              <span className="text-sm text-gray-500 ml-2 font-medium">
                {order.items.length} item{order.items.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-gray-900">
                £{order.total.toFixed(2)}
              </span>
              <button className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-100 transition-colors">
                Reorder
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>);

}