import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CategoryChip from './CategoryChip';
import { COLORS } from '../utils/theme';
import { formatDate } from '../utils/dateUtils';
import { parseISO } from 'date-fns';

export default function AppointmentCard({ appt, onCancel }) {
  const isUpcoming = appt.status === 'UPCOMING';

  function handleCancel() {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel your appointment with ${appt.providerName} on ${appt.date} at ${appt.slot}?`,
      [
        { text: 'Keep it', style: 'cancel' },
        { text: 'Cancel Appointment', style: 'destructive', onPress: () => onCancel(appt.id) },
      ]
    );
  }

  return (
    <View style={[styles.card, !isUpcoming && styles.cardCancelled]}>
      <View style={styles.top}>
        <Image source={{ uri: appt.providerImage }} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{appt.providerName}</Text>
          <Text style={styles.spec}>{appt.providerSpecialisation}</Text>
          <CategoryChip category={appt.providerCategory} size="sm" />
        </View>
        <View style={[styles.statusBadge, { backgroundColor: isUpcoming ? COLORS.lightGreen : '#F1F5F9' }]}>
          <Text style={[styles.statusText, { color: isUpcoming ? COLORS.primary : COLORS.textLight }]}>
            {appt.status}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={15} color={COLORS.primaryLight} />
          <Text style={styles.detailText}> {appt.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="clock-outline" size={15} color={COLORS.primaryLight} />
          <Text style={styles.detailText}> {appt.slot}</Text>
        </View>
      </View>

      {isUpcoming && onCancel && (
        <Button
          mode="outlined"
          onPress={handleCancel}
          textColor={COLORS.danger}
          style={styles.cancelBtn}
          contentStyle={{ paddingVertical: 0 }}
          compact
        >
          Cancel Appointment
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardCancelled: { opacity: 0.65 },
  top: { flexDirection: 'row', alignItems: 'flex-start' },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.lightGreen,
    marginRight: 12,
  },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
  spec: { fontSize: 12, color: COLORS.textMid },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: { fontSize: 11, fontWeight: '700' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  details: { flexDirection: 'row', gap: 20 },
  detailRow: { flexDirection: 'row', alignItems: 'center' },
  detailText: { fontSize: 13, color: COLORS.textMid },
  cancelBtn: {
    marginTop: 10,
    borderColor: COLORS.danger,
    borderRadius: 8,
  },
});
