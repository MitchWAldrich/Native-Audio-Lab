import { StyleSheet } from "react-native";

import { colours, spacing, typography } from '../../theme';

export const audioRecorderScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    ...typography.heading1,
    color: colours.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.subtitle,
    color: colours.textMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  button: {
    minHeight: 52,
    paddingHorizontal: spacing.xl,
    borderRadius: 14,

    backgroundColor: colours.tertiary,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: colours.black,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 3,
    marginTop: spacing.xl,
  },

  buttonDisabled: {
  opacity: 0.5,
},

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    ...typography.label,
    color: colours.white,
  },
});
