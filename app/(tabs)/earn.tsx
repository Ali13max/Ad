import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Play, Calendar, Users, FileQuestion } from 'lucide-react-native';
import Header from '@/components/Header';
import PointsBar from '@/components/PointsBar';
import EarnCard from '@/components/EarnCard';
import AdBanner from '@/components/AdBanner';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { useRewardedAd } from '@/hooks/useRewardedAd';

export default function EarnScreen() {
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();
  const { addPoints } = useUser();
  const { loaded, rewarded, showAd, resetRewarded } = useRewardedAd();

  useEffect(() => {
    if (rewarded) {
      // Award points based on the reward
      const pointsEarned = Math.floor(Math.random() * 50) + 10; // 10-60 points
      addPoints(pointsEarned);
      
      if (Platform.OS !== 'web') {
        Alert.alert(
          t('congratulations'),
          `${pointsEarned} ${t('pointsEarned')}`,
          [{ text: 'OK', onPress: resetRewarded }]
        );
      } else {
        resetRewarded();
      }
    }
  }, [rewarded]);

  const handleWatchAd = () => {
    if (Platform.OS === 'web') {
      // Simulate ad reward on web
      const pointsEarned = Math.floor(Math.random() * 50) + 10;
      addPoints(pointsEarned);
      Alert.alert(
        t('congratulations'),
        `${pointsEarned} ${t('pointsEarned')}`
      );
    } else if (loaded) {
      showAd();
    } else {
      Alert.alert(
        t('error'),
        'Ad not ready yet. Please try again in a moment.'
      );
    }
  };

  const handleDailyTasks = () => {
    Alert.alert(
      t('dailyTasks'),
      'Daily tasks coming soon!'
    );
  };

  const handleReferrals = () => {
    Alert.alert(
      t('referrals'),
      'Referral system coming soon!'
    );
  };

  const handleSurveys = () => {
    Alert.alert(
      t('surveys'),
      'Surveys coming soon!'
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginHorizontal: 16,
      marginTop: 24,
      marginBottom: 16,
      textAlign: isRTL ? 'right' : 'left',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginHorizontal: 16,
      marginBottom: 16,
      textAlign: isRTL ? 'right' : 'left',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PointsBar />
        
        <Text style={styles.sectionTitle}>{t('earnPointsBy')}</Text>
        <Text style={styles.subtitle}>
          {isRTL 
            ? 'اختر إحدى الطرق التالية لكسب المزيد من النقاط'
            : 'Choose one of the following methods to earn more points'
          }
        </Text>

        <EarnCard
          title={t('watchAds')}
          description={isRTL ? 'شاهد إعلانات قصيرة واكسب نقاط' : 'Watch short ads and earn points'}
          points={50}
          icon={Play}
          color={colors.success}
          onPress={handleWatchAd}
        />

        <EarnCard
          title={t('dailyTasks')}
          description={isRTL ? 'أكمل المهام اليومية البسيطة' : 'Complete simple daily tasks'}
          points={25}
          icon={Calendar}
          color={colors.primary}
          onPress={handleDailyTasks}
        />

        <EarnCard
          title={t('referrals')}
          description={isRTL ? 'ادع أصدقاءك واكسب عن كل دعوة' : 'Invite friends and earn for each referral'}
          points={100}
          icon={Users}
          color={colors.warning}
          onPress={handleReferrals}
        />

        <EarnCard
          title={t('surveys')}
          description={isRTL ? 'شارك في الاستطلاعات القصيرة' : 'Participate in short surveys'}
          points={75}
          icon={FileQuestion}
          color={colors.secondary}
          onPress={handleSurveys}
        />

        <AdBanner />
      </ScrollView>
    </SafeAreaView>
  );
}