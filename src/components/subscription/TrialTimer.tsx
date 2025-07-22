import React from 'react';
import Countdown from 'react-countdown';
import { Clock } from 'lucide-react';
import { useTrial } from '../../contexts/TrialContext';

const TrialTimer: React.FC = () => {
  const { trialEndTime, remainingTime } = useTrial();
  
  if (!trialEndTime) return null;
  
  return (
    <div className="flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-luxury-soft">
      <Clock className="h-4 w-4 ml-1.5" />
      <span className="text-sm font-medium">فترة تجريبية: </span>
      <Countdown
        date={Date.now() + remainingTime}
        renderer={({ hours, minutes, seconds }) => (
          <span className="text-sm font-bold mr-1.5">
            {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        )}
      />
    </div>
  );
};

export default TrialTimer;