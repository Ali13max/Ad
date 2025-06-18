import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react-native';
import Header from '@/components/Header';
import PointsBar from '@/components/PointsBar';
import AdBanner from '@/components/AdBanner';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

type RequestStatus = 'pending' | 'completed' | 'rejected';

interface Request {
  id: string;
  type: string;
  amount: number;
  status: RequestStatus;
  date: string;
}

const mockRequests: Request[] = [
  { id: '1', type: 'Withdrawal', amount: 50, status: 'pending', date: '2024-01-15' },
  { id: '2', type: 'Withdrawal', amount: 25, status: 'completed', date: '2024-01-10' },
  { id: '3', type: 'Withdrawal', amount: 100, status: 'rejected', date: '2024-01-05' },
  { id: '4', type: 'Withdrawal', amount: 75, status: 'completed', date: '2024-01-01' },
];

export default function RequestsScreen() {
  const { colors } = useTheme();
  const { t, isRTL } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<RequestStatus | 'all'>('all');

  const filteredRequests = selectedTab === 'all' 
    ? mockRequests 
    : mockRequests.filter(req => req.status === selectedTab);

  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color={colors.warning} />;
      case 'completed':
        return <CheckCircle size={16} color={colors.success} />;
      case 'rejected':
        return <XCircle size={16} color={colors.error} />;
    }
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'completed':
        return colors.success;
      case 'rejected':
        return colors.error;
    }
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
    tabContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      marginHorizontal: 16,
      marginBottom: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: colors.primary,
    },
    tabText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.card,
    },
    requestCard: {
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
    requestHeader: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    requestType: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    statusContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      marginLeft: isRTL ? 0 : 6,
      marginRight: isRTL ? 6 : 0,
    },
    requestDetails: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    amountText: {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    dateText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyIcon: {
      marginBottom: 16,
    },
    emptyText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <PointsBar />
        
        <Text style={styles.sectionTitle}>{t('myRequests')}</Text>

        <View style={styles.tabContainer}>
          {(['all', 'pending', 'completed', 'rejected'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText
              ]}>
                {tab === 'all' ? (isRTL ? 'الكل' : 'All') : t(tab)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredRequests.length === 0 ? (
          <View style={styles.emptyContainer}>
            <FileText size={48} color={colors.textSecondary} style={styles.emptyIcon} />
            <Text style={styles.emptyText}>{t('noRequests')}</Text>
          </View>
        ) : (
          filteredRequests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <Text style={styles.requestType}>{request.type}</Text>
                <View style={styles.statusContainer}>
                  {getStatusIcon(request.status)}
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(request.status) }
                  ]}>
                    {t(request.status)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.requestDetails}>
                <Text style={styles.amountText}>
                  {request.amount} {isRTL ? 'ريال' : 'SAR'}
                </Text>
                <Text style={styles.dateText}>{request.date}</Text>
              </View>
            </View>
          ))
        )}

        <AdBanner />
      </ScrollView>
    </SafeAreaView>
  );
}