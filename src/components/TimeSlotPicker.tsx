import React from 'react';

interface TimeSlotPickerProps {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimeSlotPicker({ selectedTime, onSelectTime }: TimeSlotPickerProps) {
  return (
    <div className="w-full">
      <p className="text-sm text-gray-500 mb-3">Choose your pickup date and time:</p>
      <input
        type="datetime-local"
        value={selectedTime ?? ''}
        onChange={(e) => onSelectTime(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
    </div>
  );
}
