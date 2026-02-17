
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import { getPeptideById, Peptide } from '@/utils/api';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

export default function PeptideDetailScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { id } = useLocalSearchParams();

  const [peptide, setPeptide] = useState<Peptide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      console.log('Fetching peptide details for ID:', id);
      fetchPeptideDetails();
    }
  }, [id]);

  const fetchPeptideDetails = async () => {
    try {
      setError(null);
      const data = await getPeptideById(id as string);
      console.log('Received peptide details:', data.name);
      setPeptide(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching peptide details:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load peptide details';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const bgColor = isDark ? colors.backgroundDark : colors.backgroundLight;
  const textColor = isDark ? colors.textDark : colors.textLight;
  const cardBg = isDark ? '#1C1C1E' : '#FFFFFF';
  const borderColor = isDark ? '#38383A' : '#E0E0E0';
  const secondaryTextColor = isDark ? '#8E8E93' : '#666666';

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Loading...',
            headerBackTitle: 'Back',
          }}
        />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: textColor }]}>Loading peptide details...</Text>
        </View>
      </View>
    );
  }

  if (error || !peptide) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Error',
            headerBackTitle: 'Back',
          }}
        />
        <View style={styles.centerContent}>
          <IconSymbol
            ios_icon_name="exclamationmark.triangle"
            android_material_icon_name="warning"
            size={48}
            color={colors.error}
          />
          <Text style={[styles.errorTitle, { color: textColor }]}>Error Loading Details</Text>
          <Text style={[styles.errorMessage, { color: textColor }]}>
            {error || 'Peptide not found'}
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchPeptideDetails}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: peptide.name,
          headerBackTitle: 'Back',
        }}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={[styles.headerCard, { backgroundColor: cardBg, borderColor }]}>
          <Text style={[styles.peptideName, { color: textColor }]}>{peptide.name}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.categoryBadgeText, { color: colors.primary }]}>
              {peptide.category}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              ios_icon_name="doc.text"
              android_material_icon_name="description"
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.sectionTitle, { color: textColor }]}>Description</Text>
          </View>
          <Text style={[styles.sectionText, { color: textColor }]}>{peptide.description}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              ios_icon_name="star.fill"
              android_material_icon_name="star"
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.sectionTitle, { color: textColor }]}>Benefits</Text>
          </View>
          <Text style={[styles.sectionText, { color: textColor }]}>{peptide.benefits}</Text>
        </View>

        {peptide.reconstitutionInstructions && (
          <View style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.sectionHeader}>
              <IconSymbol
                ios_icon_name="drop.fill"
                android_material_icon_name="water-drop"
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.sectionTitle, { color: textColor }]}>Reconstitution Instructions</Text>
            </View>
            <Text style={[styles.sectionText, { color: textColor }]}>
              {peptide.reconstitutionInstructions}
            </Text>
          </View>
        )}

        <View style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              ios_icon_name="syringe"
              android_material_icon_name="medication"
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.sectionTitle, { color: textColor }]}>Dosage Information</Text>
          </View>
          <View style={styles.dosageGrid}>
            <View style={styles.dosageItem}>
              <Text style={[styles.dosageLabel, { color: secondaryTextColor }]}>Dosage Range</Text>
              <Text style={[styles.dosageValue, { color: textColor }]}>
                {peptide.dosageMin}
              </Text>
              <Text style={[styles.dosageValue, { color: textColor }]}> to </Text>
              <Text style={[styles.dosageValue, { color: textColor }]}>
                {peptide.dosageMax}
              </Text>
            </View>
            <View style={styles.dosageItem}>
              <Text style={[styles.dosageLabel, { color: secondaryTextColor }]}>Frequency</Text>
              <Text style={[styles.dosageValue, { color: textColor }]}>{peptide.frequency}</Text>
            </View>
            <View style={styles.dosageItem}>
              <Text style={[styles.dosageLabel, { color: secondaryTextColor }]}>Route</Text>
              <Text style={[styles.dosageValue, { color: textColor }]}>
                {peptide.administrationRoute}
              </Text>
            </View>
            {peptide.timing && (
              <View style={styles.dosageItem}>
                <Text style={[styles.dosageLabel, { color: secondaryTextColor }]}>Timing</Text>
                <Text style={[styles.dosageValue, { color: textColor }]}>{peptide.timing}</Text>
              </View>
            )}
          </View>
        </View>

        {peptide.sideEffects && (
          <View style={[styles.section, { backgroundColor: cardBg, borderColor }]}>
            <View style={styles.sectionHeader}>
              <IconSymbol
                ios_icon_name="exclamationmark.triangle"
                android_material_icon_name="warning"
                size={24}
                color={colors.error}
              />
              <Text style={[styles.sectionTitle, { color: textColor }]}>Side Effects</Text>
            </View>
            <Text style={[styles.sectionText, { color: textColor }]}>{peptide.sideEffects}</Text>
          </View>
        )}

        <View style={[styles.disclaimer, { backgroundColor: colors.error + '10', borderColor: colors.error + '30' }]}>
          <IconSymbol
            ios_icon_name="info.circle"
            android_material_icon_name="info"
            size={20}
            color={colors.error}
          />
          <Text style={[styles.disclaimerText, { color: colors.error }]}>
            This information is for educational purposes only. Always consult with a healthcare professional before starting any peptide therapy.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  headerCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  peptideName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  dosageGrid: {
    gap: 16,
  },
  dosageItem: {
    gap: 4,
  },
  dosageLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dosageValue: {
    fontSize: 16,
  },
  disclaimer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    marginBottom: 20,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
