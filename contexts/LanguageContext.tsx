import React, { createContext, useContext, useState, useEffect } from 'react';
import { I18nManager } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from 'i18n-js';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    appName: 'AdEarn Pro',
    home: 'Home',
    earnPoints: 'Earn Points', 
    requests: 'Requests',
    about: 'About',
    points: 'Points',
    totalUsers: 'Total Users',
    pendingRequests: 'Pending Requests',
    completedRequests: 'Completed Requests',
    watchAds: 'Watch Ads',
    dailyTasks: 'Daily Tasks',
    referrals: 'Referrals',
    surveys: 'Surveys',
    pending: 'Pending',
    completed: 'Completed',
    rejected: 'Rejected',
    watchAdEarn: 'Watch Ad & Earn',
    pointsEarned: 'points earned!',
    congratulations: 'Congratulations!',
    developer: 'Developer: ALI JUBRAN',
    version: 'Version 1.0.0',
    balance: 'Balance',
    sar: 'SAR',
    usd: 'USD',
    earnPointsBy: 'Earn points by:',
    myRequests: 'My Requests',
    requestHistory: 'Request History',
    noRequests: 'No requests found',
    loading: 'Loading...',
    error: 'Error occurred',
    retry: 'Retry',
  },
  ar: {
    appName: 'AdEarn Pro',
    home: 'الرئيسية',
    earnPoints: 'كسب النقاط',
    requests: 'الطلبات', 
    about: 'حول التطبيق',
    points: 'نقطة',
    totalUsers: 'إجمالي المستخدمين',
    pendingRequests: 'طلبات معلقة',
    completedRequests: 'طلبات منفذة',
    watchAds: 'مشاهدة الإعلانات',
    dailyTasks: 'المهام اليومية',
    referrals: 'الإحالات',
    surveys: 'الاستطلاعات',
    pending: 'معلق',
    completed: 'منفذ',
    rejected: 'مرفوض',
    watchAdEarn: 'شاهد إعلان واكسب',
    pointsEarned: 'نقطة تم كسبها!',
    congratulations: 'تهانينا!',
    developer: 'المطور: علي جبران',
    version: 'الإصدار 1.0.0',
    balance: 'الرصيد',
    sar: 'ريال',
    usd: 'دولار',
    earnPointsBy: 'اكسب النقاط من خلال:',
    myRequests: 'طلباتي',
    requestHistory: 'سجل الطلبات',
    noRequests: 'لا توجد طلبات',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    retry: 'إعادة المحاولة',
  },
};

const i18n = new I18n(translations);

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const isRTL = language === 'ar';

  useEffect(() => {
    loadLanguagePreference();
  }, []);

  useEffect(() => {
    i18n.locale = language;
    // Note: RTL changes require app restart in production
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }
  }, [language, isRTL]);

  const loadLanguagePreference = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
        setLanguageState(savedLanguage as Language);
      }
    } catch (error) {
      console.log('Error loading language preference:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.log('Error saving language preference:', error);
    }
  };

  const t = (key: string, options?: any) => {
    return i18n.t(key, options);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}