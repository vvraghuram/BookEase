import { MD3LightTheme } from 'react-native-paper';

export const COLORS = {
  primary:      '#1B4332',
  primaryLight: '#40916C',
  accent:       '#52B788',
  mint:         '#95D5B2',
  lightGreen:   '#D8F3DC',
  background:   '#F8FAF9',
  surface:      '#FFFFFF',
  textDark:     '#1E293B',
  textMid:      '#475569',
  textLight:    '#94A3B8',
  danger:       '#DC2626',
  warning:      '#F59E0B',
  success:      '#16A34A',
  border:       '#E2E8F0',
};

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.primaryLight,
    background: COLORS.background,
    surface: COLORS.surface,
    onPrimary: '#FFFFFF',
    outline: COLORS.border,
  },
};

export const CATEGORY_COLORS = {
  Doctor:   { bg: '#FEF2F2', text: '#991B1B', icon: 'stethoscope' },
  Lawyer:   { bg: '#EFF6FF', text: '#1E40AF', icon: 'scale-balance' },
  Salon:    { bg: '#FDF4FF', text: '#6B21A8', icon: 'scissors-cutting' },
  Plumber:  { bg: '#FFF7ED', text: '#9A3412', icon: 'wrench' },
  Tutor:    { bg: '#F0FDF4', text: '#166534', icon: 'book-open-variant' },
};
