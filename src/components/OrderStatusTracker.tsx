import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { OrderStatus } from '../data/mockData';
interface OrderStatusTrackerProps {
  status: OrderStatus;
}
const STEPS: OrderStatus[] = ['Confirmed', 'Preparing', 'Ready'];
export function OrderStatusTracker({ status }: OrderStatusTrackerProps) {
  const currentStepIndex =
  STEPS.indexOf(status) === -1 ? 2 : STEPS.indexOf(status);
  return (
    <div className="w-full py-6">
      <div className="relative flex justify-between items-center">
        {/* Background Track */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-100 rounded-full" />

        {/* Active Track */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-amber-500 rounded-full"
          initial={{
            width: '0%'
          }}
          animate={{
            width: `${currentStepIndex / (STEPS.length - 1) * 100}%`
          }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20
          }} />
        

        {/* Steps */}
        {STEPS.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isActive = index === currentStepIndex;
          return (
            <div
              key={step}
              className="relative z-10 flex flex-col items-center">
              
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? '#f59e0b' : '#ffffff',
                  borderColor: isCompleted ? '#f59e0b' : '#e5e7eb',
                  scale: isActive ? 1.2 : 1
                }}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-sm transition-colors duration-300`}>
                
                {isCompleted && <CheckIcon className="w-4 h-4 text-white" />}
              </motion.div>
              <span
                className={`absolute top-10 text-xs font-medium whitespace-nowrap ${isActive ? 'text-amber-700' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                
                {step}
              </span>
            </div>);

        })}
      </div>
    </div>);

}