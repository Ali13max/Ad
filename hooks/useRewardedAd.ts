import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-3940256099942544/5224354917';

export function useRewardedAd() {
  const [loaded, setLoaded] = useState(false);
  const [rewarded, setRewarded] = useState<{ type: string; amount: number } | null>(null);

  const rewardedAd = Platform.OS !== 'web' ? RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  }) : null;

  useEffect(() => {
    if (!rewardedAd) return;

    const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        setRewarded(reward);
      },
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(RewardedAdEventType.CLOSED, () => {
      setLoaded(false);
      rewardedAd.load();
    });

    // Start loading the rewarded ad straight away
    rewardedAd.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, []);

  const showAd = () => {
    if (loaded && rewardedAd) {
      rewardedAd.show();
    }
  };

  return {
    loaded,
    rewarded,
    showAd,
    resetRewarded: () => setRewarded(null),
  };
}