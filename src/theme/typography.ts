import type { TextStyle } from 'react-native';

type TypographyStyle = Pick<
  TextStyle,
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textTransform'
>;

export const typography = {
  display: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700',
    letterSpacing: -0.5,
  },

  heading1: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
    letterSpacing: -0.25,
  },

  heading2: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },

  heading3: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
  },

  bodyLarge: {
    fontSize: 18,
    lineHeight: 27,
    fontWeight: '400',
  },

  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },

  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },

  label: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  labelSmall: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
  },

  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },

  overline: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TypographyStyle>;

export type TypographyToken = keyof typeof typography;
