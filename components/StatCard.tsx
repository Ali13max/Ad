import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  onPress?: () => void;
}

export default function StatCard({ title, value, icon: Icon, color, onPress }: StatCardProps) {
  const { colors } = useTheme();
  const { isRTL } = useLanguage();

  const cardColor = color || colors.primary;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 4,
      elevation: 2,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: `${cardColor}15`,
      alignItems: 'center',
      justifyContent: 'center',
    },
    valueText: {
      fontSize: 24,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
      textAlign: isRTL ? 'right' : 'left',
    },
    titleText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
  });

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon size={20} color={cardColor} />
        </View>
      </View>
      <Text style={styles.valueText}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Text>
      <Text style={styles.titleText}>{title}</Text>
    </Component>
  );
}