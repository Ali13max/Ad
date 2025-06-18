import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ArrowRight, User, Code, Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutScreen() {
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.surface,
    },
    headerTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginLeft: isRTL ? 0 : 16,
      marginRight: isRTL ? 16 : 0,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    appInfoContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      marginBottom: 24,
      elevation: 2,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    appIcon: {
      width: 80,
      height: 80,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    appName: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 8,
    },
    appVersion: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginBottom: 16,
    },
    appDescription: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    sectionContainer: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      elevation: 2,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
      textAlign: isRTL ? 'right' : 'left',
    },
    developerInfo: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    developerIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isRTL ? 0 : 16,
      marginLeft: isRTL ? 16 : 0,
    },
    developerText: {
      flex: 1,
    },
    developerName: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
      textAlign: isRTL ? 'right' : 'left',
    },
    developerRole: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    featureItem: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    featureIcon: {
      width: 32,
      height: 32,
      borderRadius: 8,
      backgroundColor: `${colors.primary}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isRTL ? 0 : 12,
      marginLeft: isRTL ? 12 : 0,
    },
    featureText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      textAlign: isRTL ? 'right' : 'left',
    },
    thankYouText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });

  const BackIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <BackIcon size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('about')}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.appInfoContainer}>
          <View style={styles.appIcon}>
            <Code size={40} color={colors.card} />
          </View>
          <Text style={styles.appName}>{t('appName')}</Text>
          <Text style={styles.appVersion}>{t('version')}</Text>
          <Text style={styles.appDescription}>
            {isRTL 
              ? 'تطبيق احترافي لكسب النقاط من خلال مشاهدة الإعلانات وإنجاز المهام اليومية'
              : 'A professional app for earning points through watching ads and completing daily tasks'
            }
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {isRTL ? 'المطور' : 'Developer'}
          </Text>
          <View style={styles.developerInfo}>
            <View style={styles.developerIcon}>
              <User size={24} color={colors.card} />
            </View>
            <View style={styles.developerText}>
              <Text style={styles.developerName}>ALI JUBRAN</Text>
              <Text style={styles.developerRole}>
                {isRTL ? 'مطور تطبيقات الجوال' : 'Mobile App Developer'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {isRTL ? 'المميزات' : 'Features'}
          </Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Code size={16} color={colors.primary} />
            </View>
            <Text style={styles.featureText}>
              {isRTL ? 'دعم اللغة العربية والإنجليزية' : 'Arabic & English Support'}
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Heart size={16} color={colors.primary} />
            </View>
            <Text style={styles.featureText}>
              {isRTL ? 'الوضع الليلي والنهاري' : 'Dark & Light Theme'}
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <User size={16} color={colors.primary} />
            </View>
            <Text style={styles.featureText}>
              {isRTL ? 'واجهة مستخدم حديثة' : 'Modern User Interface'}
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.thankYouText}>
            {isRTL 
              ? 'شكراً لك لاستخدام تطبيق AdEarn Pro. نحن نقدر ثقتك ونسعى دائماً لتحسين تجربتك.'
              : 'Thank you for using AdEarn Pro. We appreciate your trust and always strive to improve your experience.'
            }
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}