import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Text, Button, Divider, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useAppointments } from '../context/AppointmentContext';
import { COLORS } from '../utils/theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { upcoming, past } = useAppointments();

  function handleLogout() {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  }

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const stats = [
    { label: 'Upcoming', value: upcoming.length, icon: 'calendar-clock' },
    { label: 'Completed', value: past.filter((a) => a.status === 'CANCELLED').length > 0 ? past.length - past.filter(a => a.status === 'CANCELLED').length : past.length, icon: 'calendar-check' },
    { label: 'Cancelled', value: past.filter((a) => a.status === 'CANCELLED').length, icon: 'calendar-remove' },
  ];

  const menuItems = [
    { icon: 'account-outline', label: 'Full Name', value: user?.name },
    { icon: 'email-outline', label: 'Email', value: user?.email },
    { icon: 'calendar-outline', label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Avatar.Text size={72} label={initials || 'U'} style={{ backgroundColor: COLORS.mint }} color={COLORS.primary} />
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statBox}>
              <MaterialCommunityIcons name={s.icon} size={22} color={COLORS.primary} />
              <Text style={styles.statVal}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Details</Text>
          {menuItems.map((item, i) => (
            <View key={item.label}>
              <View style={styles.menuRow}>
                <View style={styles.menuIconBox}>
                  <MaterialCommunityIcons name={item.icon} size={18} color={COLORS.primaryLight} />
                </View>
                <View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuValue}>{item.value}</Text>
                </View>
              </View>
              {i < menuItems.length - 1 && <Divider style={{ marginHorizontal: 14 }} />}
            </View>
          ))}
        </View>

        {/* About */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About BookEase</Text>
          <Text style={styles.about}>
            BookEase is a React Native appointment scheduling app built for the 4N EcoTech assignment.
            {'\n\n'}Version: 1.0.0{'\n'}Developer: vvraghuram{'\n'}Tech: Expo SDK 51 + React Navigation 6 + AsyncStorage
          </Text>
        </View>

        <Button
          mode="contained"
          buttonColor={COLORS.danger}
          onPress={handleLogout}
          style={styles.logoutBtn}
          contentStyle={{ paddingVertical: 6 }}
          icon="logout"
        >
          Sign Out
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
    gap: 6,
  },
  name: { fontSize: 20, fontWeight: '800', color: '#fff' },
  email: { fontSize: 13, color: COLORS.mint },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-around',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  statBox: { alignItems: 'center', gap: 4 },
  statVal: { fontSize: 22, fontWeight: '800', color: COLORS.textDark },
  statLabel: { fontSize: 11, color: COLORS.textMid, fontWeight: '600' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    padding: 14,
    paddingBottom: 8,
  },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  menuIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuLabel: { fontSize: 11, color: COLORS.textLight, fontWeight: '600' },
  menuValue: { fontSize: 14, color: COLORS.textDark, fontWeight: '600', marginTop: 1 },
  about: { fontSize: 13, color: COLORS.textMid, lineHeight: 20, padding: 14, paddingTop: 0 },
  logoutBtn: { marginHorizontal: 16, marginTop: 20, marginBottom: 40, borderRadius: 12 },
});
