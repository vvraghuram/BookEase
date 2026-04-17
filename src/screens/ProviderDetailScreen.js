import React, { useState, useMemo } from 'react';
import {
  View, StyleSheet, ScrollView, Image, TouchableOpacity,
} from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from '../components/StarRating';
import CategoryChip from '../components/CategoryChip';
import { COLORS } from '../utils/theme';
import { getWorkingDays, generateSlots, formatDate, formatDateShort, formatDay, formatDateKey } from '../utils/dateUtils';
import { useAppointments } from '../context/AppointmentContext';

export default function ProviderDetailScreen({ route, navigation }) {
  const { provider } = route.params;
  const { isSlotBooked } = useAppointments();
  const days = useMemo(() => getWorkingDays(7), []);

  const [selectedDay, setSelectedDay] = useState(days[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = useMemo(
    () => generateSlots(selectedDay, provider.slotStart, provider.slotEnd, provider.slotDuration),
    [selectedDay, provider]
  );

  const dateKey = formatDateKey(selectedDay);

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Image source={{ uri: provider.image }} style={styles.avatar} />
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.spec}>{provider.specialisation}</Text>
          <View style={styles.heroRow}>
            <CategoryChip category={provider.category} size="sm" />
          </View>
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={14} />
        </View>

        <View style={styles.body}>
          {/* Info Chips */}
          <View style={styles.infoRow}>
            {[
              { icon: 'briefcase-outline', label: provider.experience },
              { icon: 'map-marker-outline', label: provider.location },
              { icon: 'cash', label: provider.fee },
            ].map((item) => (
              <View key={item.icon} style={styles.infoChip}>
                <MaterialCommunityIcons name={item.icon} size={15} color={COLORS.primary} />
                <Text style={styles.infoText}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{provider.bio}</Text>
          <Divider style={styles.divider} />

          {/* Date Strip */}
          <Text style={styles.sectionTitle}>Select a Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayStrip}>
            {days.map((day) => {
              const key = formatDateKey(day);
              const isSelected = key === formatDateKey(selectedDay);
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.dayChip, isSelected && styles.dayChipActive]}
                  onPress={() => { setSelectedDay(day); setSelectedSlot(null); }}
                >
                  <Text style={[styles.dayLabel, isSelected && styles.dayLabelActive]}>
                    {formatDay(day)}
                  </Text>
                  <Text style={[styles.dayNum, isSelected && styles.dayNumActive]}>
                    {formatDateShort(day)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Slot Grid */}
          <Text style={styles.sectionTitle}>Available Slots</Text>
          <Text style={styles.dateLabel}>{formatDate(selectedDay)}</Text>
          <View style={styles.slotGrid}>
            {slots.map((slot) => {
              const booked = isSlotBooked(provider.id, dateKey, slot);
              const selected = slot === selectedSlot;
              return (
                <TouchableOpacity
                  key={slot}
                  disabled={booked}
                  style={[
                    styles.slotBtn,
                    booked && styles.slotBooked,
                    selected && styles.slotSelected,
                  ]}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <Text
                    style={[
                      styles.slotText,
                      booked && styles.slotTextBooked,
                      selected && styles.slotTextSelected,
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={styles.cta}>
        {selectedSlot ? (
          <Text style={styles.ctaHint}>
            Selected: {formatDate(selectedDay)} at {selectedSlot}
          </Text>
        ) : (
          <Text style={styles.ctaHint}>Pick a time slot above to continue</Text>
        )}
        <Button
          mode="contained"
          disabled={!selectedSlot}
          buttonColor={COLORS.primary}
          style={styles.ctaBtn}
          contentStyle={{ paddingVertical: 6 }}
          onPress={() =>
            navigation.navigate('BookingConfirm', {
              provider,
              date: dateKey,
              slot: selectedSlot,
            })
          }
        >
          Book Appointment
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  hero: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 28,
    paddingHorizontal: 20,
    gap: 6,
  },
  backBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 6,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: COLORS.mint,
    backgroundColor: COLORS.lightGreen,
  },
  name: { fontSize: 22, fontWeight: '800', color: '#fff', textAlign: 'center' },
  spec: { fontSize: 14, color: COLORS.mint, textAlign: 'center' },
  heroRow: { flexDirection: 'row', gap: 8 },
  body: { padding: 20 },
  infoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  infoText: { fontSize: 12, color: COLORS.primary, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textDark, marginBottom: 10, marginTop: 4 },
  bio: { fontSize: 14, color: COLORS.textMid, lineHeight: 22 },
  divider: { marginVertical: 20 },
  dayStrip: { marginBottom: 16 },
  dayChip: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: COLORS.border,
    minWidth: 64,
  },
  dayChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dayLabel: { fontSize: 11, color: COLORS.textMid, fontWeight: '600' },
  dayLabelActive: { color: COLORS.mint },
  dayNum: { fontSize: 13, color: COLORS.textDark, fontWeight: '700', marginTop: 2 },
  dayNumActive: { color: '#fff' },
  dateLabel: { fontSize: 13, color: COLORS.textMid, marginBottom: 12 },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  slotBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  slotBooked: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' },
  slotSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  slotText: { fontSize: 13, fontWeight: '600', color: COLORS.textDark },
  slotTextBooked: { color: COLORS.textLight },
  slotTextSelected: { color: '#fff' },
  cta: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  ctaHint: { fontSize: 13, color: COLORS.textMid, textAlign: 'center', marginBottom: 10 },
  ctaBtn: { borderRadius: 12 },
});
