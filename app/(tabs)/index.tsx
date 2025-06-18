import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Clock, CheckCircle } from 'lucide-react-native';
import Header from '@/components/Header';
import PointsBar from '@/components/PointsBar';
import StatCard from '@/components/StatCard';
import AdBanner from '@/components/AdBanner';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();
  const { userData } = useUser();

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
    statsContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      paddingHorizontal: 12,
      marginBottom: 16,
    },
    welcomeContainer: {
      marginHorizontal: 16,
      marginVertical: 16,
      padding: 20,
      backgroundColor: colors.card,
      borderRadius: 16,
      elevation: 2,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    welcomeText: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 8,
      textAlign: isRTL ? 'right' : 'left',
    },
    welcomeSubtext: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PointsBar />
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            {isRTL ? 'مرحباً بك في AdEarn Pro!' : 'Welcome to AdEarn Pro!'}
          </Text>
          <Text style={styles.welcomeSubtext}>
            {isRTL 
              ? 'ابدأ في كسب النقاط من خلال مشاهدة الإعلانات وإنجاز المهام اليومية'
              : 'Start earning points by watching ads and completing daily tasks'
            }
          </Text>
        </View>

        <AdBanner />

        <Text style={styles.sectionTitle}>
          {isRTL ? 'الإحصائيات' : 'Statistics'}
        </Text>
        
        <View style={styles.statsContainer}>
          <StatCard
            title={t('totalUsers')}
            value={userData.stats.totalUsers}
            icon={Users}
            color={colors.primary}
          />
          <StatCard
            title={t('pendingRequests')}
            value={userData.stats.pendingRequests}
            icon={Clock}
            color={colors.warning}
          />
          <StatCard
            title={t('completedRequests')}
            value={userData.stats.completedRequests}
            icon={CheckCircle}
            color={colors.success}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}