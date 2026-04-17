import React, { useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppointments } from '../context/AppointmentContext';
import AppointmentCard from '../components/AppointmentCard';
import { COLORS } from '../utils/theme';

export default function AppointmentsScreen() {
  const { upcoming, past, loading, cancel, refresh } = useAppointments();
  const [activeTab, setActiveTab] = useState('upcoming');

  const data = activeTab === 'upcoming' ? upcoming : past;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Appointments</Text>
        <Text style={styles.sub}>{upcoming.length} upcoming booking{upcoming.length !== 1 ? 's' : ''}</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabs}>
        {['upcoming', 'past'].map((tab) => (
          <View
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
              onPress={() => setActiveTab(tab)}
            >
              {tab === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
            </Text>
          </View>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentCard
            appt={item}
            onCancel={activeTab === 'upcoming' ? cancel : null}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={COLORS.primary} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialCommunityIcons
              name={activeTab === 'upcoming' ? 'calendar-blank-outline' : 'calendar-check-outline'}
              size={64}
              color={COLORS.mint}
            />
            <Text style={styles.emptyTitle}>
              {activeTab === 'upcoming' ? 'No upcoming bookings' : 'No past appointments'}
            </Text>
            <Text style={styles.emptyText}>
              {activeTab === 'upcoming'
                ? 'Browse providers and book your first appointment!'
                : 'Your completed and cancelled bookings will appear here.'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 14 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textDark },
  sub: { fontSize: 13, color: COLORS.textMid, marginTop: 2 },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.textMid },
  tabTextActive: { color: '#fff' },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  empty: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 30 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textDark, marginTop: 16, textAlign: 'center' },
  emptyText: { fontSize: 14, color: COLORS.textMid, marginTop: 8, textAlign: 'center', lineHeight: 22 },
});
