import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StarRating from './StarRating';
import CategoryChip from './CategoryChip';
import { COLORS } from '../utils/theme';

export default function ProviderCard({ provider, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: provider.image }} style={styles.avatar} />
      <View style={styles.body}>
        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.spec}>{provider.specialisation}</Text>
        <View style={styles.row}>
          <CategoryChip category={provider.category} size="sm" />
          <View style={styles.expBadge}>
            <Text style={styles.expText}>{provider.experience}</Text>
          </View>
        </View>
        <StarRating rating={provider.rating} reviewCount={provider.reviewCount} size={12} />
        <View style={styles.locRow}>
          <MaterialCommunityIcons name="map-marker-outline" size={12} color={COLORS.textLight} />
          <Text style={styles.loc}> {provider.location}</Text>
        </View>
      </View>
      <View style={styles.feeBox}>
        <Text style={styles.fee}>{provider.fee}</Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.primaryLight} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.lightGreen,
    marginRight: 12,
  },
  body: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: COLORS.textDark, marginBottom: 2 },
  spec: { fontSize: 12, color: COLORS.textMid, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 },
  expBadge: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  expText: { fontSize: 11, color: COLORS.primary, fontWeight: '600' },
  locRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  loc: { fontSize: 11, color: COLORS.textLight },
  feeBox: { alignItems: 'flex-end', marginLeft: 4 },
  fee: { fontSize: 12, color: COLORS.primary, fontWeight: '700', textAlign: 'right' },
});
