import { StyleSheet } from "react-native";

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#215D6E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: 'white',
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 28,
  },
  button: {
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: 14,

    backgroundColor: '#6e3221',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 3,
    marginTop: 20,
  },

  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
