import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useTheme } from '@/contexts/ThemeContext';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3940256099942544/6300978111';

export default function AdBanner() {
  const { colors } = useTheme();
  const [adLoaded, setAdLoaded] = useState(false);

  if (Platform.OS === 'web') {
    return null; // Don't show ads on web
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 8,
      marginVertical: 8,
      marginHorizontal: 16,
      overflow: 'hidden',
    },
  });

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => setAdLoaded(true)}
        onAdFailedToLoad={(error) => {
          console.log('Banner ad failed to load:', error);
        }}
      />
    </View>
  );
}