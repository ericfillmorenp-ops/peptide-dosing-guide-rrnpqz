
import { StyleSheet } from 'react-native';

export const colors = {
  // Medical/Scientific theme with blue-green palette
  light: {
    background: '#F8FAFB',
    card: '#FFFFFF',
    text: '#1A2332',
    textSecondary: '#6B7280',
    primary: '#0EA5E9',
    secondary: '#06B6D4',
    accent: '#10B981',
    highlight: '#E0F2FE',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
  },
  dark: {
    background: '#0F172A',
    card: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    primary: '#38BDF8',
    secondary: '#22D3EE',
    accent: '#34D399',
    highlight: '#1E3A5F',
    border: '#334155',
    error: '#F87171',
    success: '#34D399',
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
  },
});
