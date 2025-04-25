// src/hooks/useMood.js
import { useContext, createContext, useState, useCallback } from 'react';
import { useAuth } from './useAuth';

const MoodContext = createContext(null);

export function MoodProvider({ children }) {
  const { user } = useAuth();
  const [currentMood, setCurrentMood] = useState(null);
  
  const updateMood = useCallback(async (moodData) => {
    if (!user) return;
    
    try {
      // In a real app, send data to your backend
      console.log('Updating mood:', moodData);
      
      // Store in local storage for demo purposes
      localStorage.setItem(`roomieMatchMood_${user.id}`, JSON.stringify(moodData));
      setCurrentMood(moodData);
      return moodData;
    } catch (error) {
      console.error('Error updating mood:', error);
      throw error;
    }
  }, [user]);
  
  const getCurrentMood = useCallback(async () => {
    if (!user) return null;
    
    // In a real app, fetch from your backend
    const storedMood = localStorage.getItem(`roomieMatchMood_${user.id}`);
    const parsedMood = storedMood ? JSON.parse(storedMood) : null;
    setCurrentMood(parsedMood);
    return parsedMood;
  }, [user]);
  
  const value = {
    currentMood,
    updateMood,
    getCurrentMood
  };
  
  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
}

export function useMood() {
  return useContext(MoodContext);
}