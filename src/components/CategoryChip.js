import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORY_COLORS } from '../utils/theme';

export default function CategoryChip({ category, size = 'md' }) {
  const style = CATEGORY_COLORS[category] || { bg: '#F1F5F9', text: '#475569', icon: 'tag' };
  const fontSize = size === 'sm' ? 11 : 13;
  const iconSize = size === 'sm' ? 12 : 14;
  const pad = size === 'sm' ? { paddingHorizontal: 7, paddingVertical: 3 } : { paddingHorizontal: 10, paddingVertical: 5 };

  return (
    <View style={[styles.chip, { backgroundColor: style.bg }, pad]}>
      <MaterialCommunityIcons name={style.icon} size={iconSize} color={style.text} />
      <Text style={[styles.label, { color: style.text, fontSize }]}> {category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  label: { fontWeight: '600' },
});
