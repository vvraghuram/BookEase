import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppointments } from '../context/AppointmentContext';
import { COLORS } from '../utils/theme';
import CategoryChip from '../components/CategoryChip';

export default function BookingConfirmScreen({ route, navigation }) {
  const { provider, date, slot } = route.params;
  const { book } = useAppointments();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    const appt = await book({ provider, date, slot });
    setLoading(false);

    Alert.alert(
      '✅ Appointment Confirmed!',
      `Your appointment with ${provider.name} on ${date} at ${slot} is confirmed.`,
      [
        {
          text: 'View My Appointments',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Main' }] }),
        },
      ]
    );
  }

  const details = [
    { icon: 'account-outline', label: 'Provider', value: provider.name },
    { icon: 'tag-outline', label: 'Specialisation', value: provider.specialisation },
    { icon: 'calendar', label: 'Date', value: date },
    { icon: 'clock-outline', label: 'Time', value: slot },
    { icon: 'cash', label: 'Fee', value: provider.fee },
    { icon: 'map-marker-outline', label: 'Location', value: provider.location },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.topRow}>
          <Button
            icon="arrow-left"
            onPress={() => navigation.goBack()}
            textColor={COLORS.primary}
            compact
          >
            Back
          </Button>
        </View>

        <Text style={styles.title}>Confirm Booking</Text>
        <Text style={styles.sub}>Review your appointment details below</Text>

        {/* Provider Card */}
        <View style={styles.provCard}>
          <Image source={{ uri: provider.image }} style={styles.avatar} />
          <View style={styles.provInfo}>
            <Text style={styles.provName}>{provider.name}</Text>
            <CategoryChip category={provider.category} size="sm" />
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>
          {details.map((d, i) => (
            <View key={d.label}>
              <View style={styles.detailRow}>
                <View style={styles.iconBox}>
                  <MaterialCommunityIcons name={d.icon} size={18} color={COLORS.primaryLight} />
                </View>
                <View style={styles.detailTexts}>
                  <Text style={styles.detailLabel}>{d.label}</Text>
                  <Text style={styles.detailValue}>{d.value}</Text>
                </View>
              </View>
              {i < details.length - 1 && <Divider style={styles.rowDivider} />}
            </View>
          ))}
        </View>

        {/* Note */}
        <View style={styles.note}>
          <MaterialCommunityIcons name="information-outline" size={16} color={COLORS.primaryLight} />
          <Text style={styles.noteText}>
            {' '}You can cancel this appointment anytime from My Appointments.
          </Text>
        </View>

        {/* CTA */}
        <Button
          mode="contained"
          buttonColor={COLORS.primary}
          onPress={handleConfirm}
          loading={loading}
          disabled={loading}
          style={styles.confirmBtn}
          contentStyle={{ paddingVertical: 8 }}
        >
          Confirm Appointment
        </Button>
        <Button
          mode="text"
          textColor={COLORS.textMid}
          onPress={() => navigation.goBack()}
          style={{ marginTop: 8 }}
        >
          Go Back & Change
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { padding: 20, paddingBottom: 40 },
  topRow: { alignItems: 'flex-start', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textDark },
  sub: { fontSize: 14, color: COLORS.textMid, marginTop: 4, marginBottom: 20 },
  provCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.mint,
  },
  provInfo: { gap: 6 },
  provName: { fontSize: 17, fontWeight: '700', color: '#fff' },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  detailRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  detailTexts: {},
  detailLabel: { fontSize: 11, color: COLORS.textLight, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  detailValue: { fontSize: 15, color: COLORS.textDark, fontWeight: '600', marginTop: 2 },
  rowDivider: { marginHorizontal: 14 },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.lightGreen,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  noteText: { fontSize: 13, color: COLORS.primary, flex: 1 },
  confirmBtn: { borderRadius: 12 },
});
