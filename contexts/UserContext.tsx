import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserStats {
  totalUsers: number;
  pendingRequests: number;
  completedRequests: number;
}

interface UserData {
  points: number;
  balance: number;
  currency: 'SAR' | 'USD';
  stats: UserStats;
}

interface UserContextType {
  userData: UserData;
  addPoints: (points: number) => void;
  updateStats: (stats: Partial<UserStats>) => void;
  setCurrency: (currency: 'SAR' | 'USD') => void;
}

const defaultUserData: UserData = {
  points: 4675,
  balance: 2.34,
  currency: 'SAR',
  stats: {
    totalUsers: 12500,
    pendingRequests: 8,
    completedRequests: 156,
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('userData');
      if (savedData) {
        setUserData({ ...defaultUserData, ...JSON.parse(savedData) });
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const saveUserData = async (data: UserData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  const addPoints = (points: number) => {
    const newUserData = {
      ...userData,
      points: userData.points + points,
      balance: userData.balance + (points * 0.001), // 1000 points = 1 SAR/USD
    };
    setUserData(newUserData);
    saveUserData(newUserData);
  };

  const updateStats = (stats: Partial<UserStats>) => {
    const newUserData = {
      ...userData,
      stats: { ...userData.stats, ...stats },
    };
    setUserData(newUserData);
    saveUserData(newUserData);
  };

  const setCurrency = (currency: 'SAR' | 'USD') => {
    const newUserData = { ...userData, currency };
    setUserData(newUserData);
    saveUserData(newUserData);
  };

  return (
    <UserContext.Provider value={{ userData, addPoints, updateStats, setCurrency }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}