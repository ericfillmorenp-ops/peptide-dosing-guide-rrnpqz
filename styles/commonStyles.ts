
import { StyleSheet } from 'react-native';

export const colors = {
  // Improved light theme with better contrast
  backgroundLight: '#FFFFFF',
  backgroundDark: '#000000',
  textLight: '#000000',
  textDark: '#FFFFFF',
  textSecondary: '#666666',
  primary: '#007AFF',
  secondary: '#5AC8FA',
  accent: '#34C759',
  error: '#FF3B30',
  success: '#34C759',
  warning: '#FF9500',
  
  // Legacy support (keeping for backward compatibility)
  light: {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    textSecondary: '#666666',
    primary: '#007AFF',
    secondary: '#5AC8FA',
    accent: '#34C759',
    highlight: '#E3F2FD',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
  },
  dark: {
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    primary: '#0A84FF',
    secondary: '#64D2FF',
    accent: '#30D158',
    highlight: '#1C3A5A',
    border: '#38383A',
    error: '#FF453A',
    success: '#30D158',
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
