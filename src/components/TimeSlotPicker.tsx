import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
interface TimeSlotPickerProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}
export function TimeSlotPicker({
  selectedTime,
  onSelectTime
}: TimeSlotPickerProps) {
  const timeSlots = useMemo(() => {
    const slots = [];
    const now = new Date();
    // Start slots 15 mins from now, rounded to next 15 min interval
    let current = new Date(now.getTime() + 15 * 60000);
    current.setMinutes(Math.ceil(current.getMinutes() / 15) * 15);
    current.setSeconds(0);
    current.setMilliseconds(0);
    for (let i = 0; i < 8; i++) {
      const timeString = current.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      });
      slots.push(timeString);
      current = new Date(current.getTime() + 15 * 60000);
    }
    return slots;
  }, []);
  return (
    <div className="w-full overflow-x-auto pb-2 hide-scrollbar">
      <div className="flex space-x-3 px-1">
        {timeSlots.map((time) => {
          const isActive = selectedTime === time;
          return (
            <button
              key={time}
              onClick={() => onSelectTime(time)}
              className={`relative px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors border ${isActive ? 'border-amber-600 text-amber-700' : 'border-gray-200 text-gray-600 bg-white hover:border-amber-300'}`}>
              
              {isActive &&
              <motion.div
                layoutId="activeTimeSlot"
                className="absolute inset-0 bg-amber-50 rounded-xl -z-10"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }} />

              }
              {time}
            </button>);

        })}
      </div>
    </div>);

}