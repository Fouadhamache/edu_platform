import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface TrialContextType {
  trialEndTime: Date | null;
  isTrialActive: boolean;
  hasSubscription: boolean;
  initiateTrial: () => void;
  purchaseSubscription: (semesterId: string) => void;
  remainingTime: number; // in milliseconds
  forceTrialExpiry: () => void; // New function for admin control
}

const TrialContext = createContext<TrialContextType | undefined>(undefined);

export const useTrial = () => {
  const context = useContext(TrialContext);
  if (context === undefined) {
    throw new Error('useTrial must be used within a TrialProvider');
  }
  return context;
};

export const TrialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [trialEndTime, setTrialEndTime] = useState<Date | null>(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  // Load trial status from localStorage when component mounts or user changes
  useEffect(() => {
    if (user) {
      const savedTrialEnd = localStorage.getItem(`trialEndTime_${user.id}`);
      const savedSubscription = localStorage.getItem(`hasSubscription_${user.id}`);
      const forcedExpiry = localStorage.getItem(`forcedTrialExpiry_${user.id}`);
      
      if (forcedExpiry === 'true') {
        // If trial was force-expired by admin, don't load any trial time
        setTrialEndTime(null);
        console.log('Trial was force-expired by admin for user:', user.id);
      } else if (savedTrialEnd) {
        try {
          const endTime = new Date(savedTrialEnd);
          // Only set the trial end time if it's in the future
          if (endTime > new Date()) {
            setTrialEndTime(endTime);
            console.log('Loaded active trial for user:', user.id, 'End time:', endTime);
          } else {
            // Clean up expired trial
            localStorage.removeItem(`trialEndTime_${user.id}`);
            console.log('Removed expired trial for user:', user.id);
          }
        } catch (error) {
          console.error('Error parsing trial end time:', error);
          localStorage.removeItem(`trialEndTime_${user.id}`);
        }
      } else {
        // No saved trial found - this is a new user, automatically start trial
        console.log('No trial found for user, starting new trial:', user.id);
        initiateTrialForUser();
      }
      
      if (savedSubscription) {
        try {
          setHasSubscription(JSON.parse(savedSubscription));
        } catch (error) {
          console.error('Error parsing subscription status:', error);
          localStorage.removeItem(`hasSubscription_${user.id}`);
        }
      }
    } else {
      setTrialEndTime(null);
      setHasSubscription(false);
    }
  }, [user]);

  // Update remaining time every second
  useEffect(() => {
    if (!trialEndTime) {
      setRemainingTime(0);
      return;
    }

    const updateRemainingTime = () => {
      const now = new Date();
      const endTime = new Date(trialEndTime);
      const timeLeft = endTime.getTime() - now.getTime();
      
      if (timeLeft <= 0) {
        setTrialEndTime(null);
        setRemainingTime(0);
        if (user) {
          localStorage.removeItem(`trialEndTime_${user.id}`);
          console.log('Trial expired for user:', user.id);
        }
      } else {
        setRemainingTime(timeLeft);
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [trialEndTime, user]);

  const initiateTrialForUser = () => {
    if (!user) {
      console.error('Cannot initiate trial: no user logged in');
      return;
    }
    
    // Check if trial was force-expired by admin
    const forcedExpiry = localStorage.getItem(`forcedTrialExpiry_${user.id}`);
    if (forcedExpiry === 'true') {
      console.log('Cannot initiate trial: was force-expired by admin');
      return;
    }
    
    // Set trial end time to 24 hours from now
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);
    
    setTrialEndTime(endTime);
    localStorage.setItem(`trialEndTime_${user.id}`, endTime.toISOString());
    
    console.log('Trial initiated for user:', user.id, 'End time:', endTime);
  };

  const initiateTrial = () => {
    initiateTrialForUser();
  };

  const purchaseSubscription = (semesterId: string) => {
    if (!user) return;
    
    setHasSubscription(true);
    localStorage.setItem(`hasSubscription_${user.id}`, 'true');
    localStorage.setItem(`subscribedSemester_${user.id}`, semesterId);
    
    console.log('Subscription purchased for user:', user.id, 'Semester:', semesterId);
  };

  const forceTrialExpiry = () => {
    if (!user) return;
    
    // Mark trial as force-expired
    localStorage.setItem(`forcedTrialExpiry_${user.id}`, 'true');
    
    // Remove any existing trial time
    localStorage.removeItem(`trialEndTime_${user.id}`);
    setTrialEndTime(null);
    setRemainingTime(0);
    
    console.log('Trial force-expired for user:', user.id);
  };

  const isTrialActive = !!trialEndTime && remainingTime > 0;

  const value = {
    trialEndTime,
    isTrialActive,
    hasSubscription,
    initiateTrial,
    purchaseSubscription,
    remainingTime,
    forceTrialExpiry,
  };

  return <TrialContext.Provider value={value}>{children}</TrialContext.Provider>;
};