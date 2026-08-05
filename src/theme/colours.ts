export const colours = {
  //Basic
  black: '#000000',
  white: '#FFFFFF',

  // Brand
  primary: '#215D6E',
  primaryPressed: '#194B59',
  primaryDisabled: '#7FA3AD',

  secondary: '#D8A84E',
  secondaryPressed: '#B98C38',

  tertiary: '#6e3221',

  // Backgrounds
  background: '#215D6E',
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F4F6',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#D1D5DB',
  textMuted: '#9CA3AF',
  textInverse: '#111827',
  textDisabled: '#6B7280',

  // Borders and separators
  border: '#D1D5DB',
  borderStrong: '#9CA3AF',
  divider: '#E5E7EB',

  // Feedback
  success: '#15803D',
  warning: '#B45309',
  error: '#B91C1C',
  info: '#1D4ED8',

  // Interactive states
  focus: '#60A5FA',
  disabled: '#D1D5DB',

  // Transparent
  transparent: 'transparent',
} as const;

export type ColourToken = keyof typeof colours;
