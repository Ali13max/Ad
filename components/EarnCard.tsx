import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface EarnCardProps {
  title: string;
  description: string;
  points: number;
  icon: LucideIcon;
  color: string;
  onPress: () => void;
}

export default function EarnCard({ title, description, points, icon: Icon, color, onPress }: EarnCardProps) {
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginVertical: 6,
      marginHorizontal: 16,
      elevation: 2,
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    content: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: `${color}15`,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: isRTL ? 0 : 16,
      marginLeft: isRTL ? 16 : 0,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 4,
      textAlign: isRTL ? 'right' : 'left',
    },
    description: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      textAlign: isRTL ? 'right' : 'left',
    },
    rightSection: {
      alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
    },
    pointsContainer: {
      backgroundColor: `${color}15`,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      marginRight: isRTL ? 0 : 8,
      marginLeft: isRTL ? 8 : 0,
    },
    pointsText: {
      fontSize: 12,
      fontFamily: 'Inter-SemiBold',
      color: color,
    },
  });

  const ChevronIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon size={24} color={color} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>+{points}</Text>
          </View>
          <ChevronIcon size={20} color={colors.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}