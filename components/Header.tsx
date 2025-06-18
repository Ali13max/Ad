import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Sun, Moon, Wallet, Globe } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { router } from 'expo-router';

export default function Header() {
  const { colors, theme, themeMode, setThemeMode } = useTheme();
  const { t, language, setLanguage, isRTL } = useLanguage();

  const toggleTheme = () => {
    if (themeMode === 'system') {
      setThemeMode('light');
    } else if (themeMode === 'light') {
      setThemeMode('dark');
    } else {
      setThemeMode('system');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navigateToAbout = () => {
    router.push('/about');
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    leftSection: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      flex: 1,
    },
    centerSection: {
      flex: 2,
      alignItems: 'center',
    },
    rightSection: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
    },
    appTitle: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      textAlign: 'center',
    },
    iconButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.surface,
      marginHorizontal: 4,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    languageButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: colors.surface,
    },
    languageText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginHorizontal: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.avatar} onPress={navigateToAbout}>
            <User size={18} color={colors.card} />
          </TouchableOpacity>
        </View>

        <View style={styles.centerSection}>
          <Text style={styles.appTitle}>{t('appName')}</Text>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
            <Globe size={16} color={colors.text} />
            <Text style={styles.languageText}>
              {language === 'en' ? '🇺🇸' : '🇸🇦'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
            {theme === 'dark' ? (
              <Sun size={18} color={colors.text} />
            ) : (
              <Moon size={18} color={colors.text} />
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <Wallet size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}