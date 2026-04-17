import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

export default function StarRating({ rating, reviewCount, size = 14 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <View style={styles.row}>
      {Array.from({ length: full }).map((_, i) => (
        <MaterialCommunityIcons key={`f${i}`} name="star" size={size} color="#F59E0B" />
      ))}
      {half && <MaterialCommunityIcons name="star-half-full" size={size} color="#F59E0B" />}
      {Array.from({ length: empty }).map((_, i) => (
        <MaterialCommunityIcons key={`e${i}`} name="star-outline" size={size} color="#F59E0B" />
      ))}
      <Text style={[styles.label, { fontSize: size }]}>
        {' '}{rating.toFixed(1)}
        {reviewCount != null && ` (${reviewCount})`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  label: { color: COLORS.textMid, marginLeft: 2 },
});
