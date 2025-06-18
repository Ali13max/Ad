import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Coins, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';

export default function PointsBar() {
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();
  const { userData } = useUser();

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 16,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    content: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    leftSection: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    rightSection: {
      alignItems: isRTL ? 'flex-start' : 'flex-end',
    },
    pointsText: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: '#FFFFFF',
      marginLeft: isRTL ? 0 : 12,
      marginRight: isRTL ? 12 : 0,
    },
    pointsLabel: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: '#FFFFFF',
      opacity: 0.9,
      marginLeft: isRTL ? 0 : 4,
      marginRight: isRTL ? 4 : 0,
    },
    balanceText: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: '#FFFFFF',
    },
    balanceLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: '#FFFFFF',
      opacity: 0.8,
      marginTop: 2,
    },
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.content}
      >
        <View style={styles.leftSection}>
          <Coins size={32} color="#FFFFFF" />
          <View>
            <Text style={styles.pointsText}>
              {userData.points.toLocaleString()}
            </Text>
            <Text style={styles.pointsLabel}>{t('points')}</Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.balanceText}>
            {userData.balance.toFixed(2)} {t(userData.currency.toLowerCase())}
          </Text>
          <Text style={styles.balanceLabel}>{t('balance')}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}