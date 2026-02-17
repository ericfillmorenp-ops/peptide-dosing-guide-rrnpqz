
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { getPeptideById, Peptide } from '@/utils/api';

export default function PeptideDetailScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { peptideId } = useLocalSearchParams();
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  const [peptide, setPeptide] = useState<Peptide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('PeptideDetailScreen mounted for peptide ID:', peptideId);
    fetchPeptideDetails();
  }, [peptideId]);

  const fetchPeptideDetails = async () => {
    try {
      console.log('[PeptideDetail] Fetching peptide details from API');
      setLoading(true);
      setError(null);
      
      const data = await getPeptideById(peptideId as string);
      setPeptide(data);
      console.log('[PeptideDetail] Peptide details loaded:', data.name);
    } catch (error) {
      console.error('[PeptideDetail] Error fetching peptide details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load peptide details';
      setError(errorMessage);
      setPeptide(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Stack.Screen
          options={{
            title: 'Loading...',
            headerShown: true,
            headerStyle: { backgroundColor: themeColors.card },
            headerTintColor: themeColors.text,
          }}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.primary} />
          <Text style={[styles.loadingText, { color: themeColors.textSecondary }]}>Loading details...</Text>
        </View>
      </View>
    );
  }

  if (!peptide) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <Stack.Screen
          options={{
            title: 'Error',
            headerShown: true,
            headerStyle: { backgroundColor: themeColors.card },
            headerTintColor: themeColors.text,
          }}
        />
        <View style={styles.errorContainer}>
          <IconSymbol
            android_material_icon_name="error"
            ios_icon_name="exclamationmark.triangle.fill"
            size={64}
            color={themeColors.error}
          />
          <Text style={[styles.errorTitle, { color: themeColors.text }]}>
            {error || 'Peptide not found'}
          </Text>
          <Text style={[styles.errorText, { color: themeColors.textSecondary }]}>
            {error ? 'There was an error loading the peptide details.' : 'The requested peptide could not be found.'}
          </Text>
          <View style={styles.errorButtons}>
            <TouchableOpacity
              style={[styles.retryButton, { backgroundColor: themeColors.primary }]}
              onPress={fetchPeptideDetails}
            >
              <IconSymbol
                android_material_icon_name="refresh"
                ios_icon_name="arrow.clockwise"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backButton, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
              onPress={() => router.back()}
            >
              <Text style={[styles.backButtonText, { color: themeColors.text }]}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  const benefitsList = peptide.benefits.split(',').map(b => b.trim());
  const sideEffectsList = peptide.sideEffects 
    ? peptide.sideEffects.split(',').map(s => s.trim())
    : ['No known side effects reported'];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Stack.Screen
        options={{
          title: peptide.name,
          headerShown: true,
          headerStyle: { backgroundColor: themeColors.card },
          headerTintColor: themeColors.text,
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.headerCard, { backgroundColor: themeColors.card }]}>
          <View style={styles.headerRow}>
            <Text style={[styles.peptideName, { color: themeColors.text }]}>{peptide.name}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: themeColors.highlight }]}>
              <Text style={[styles.categoryText, { color: themeColors.primary }]}>{peptide.category}</Text>
            </View>
          </View>
          <Text style={[styles.description, { color: themeColors.textSecondary }]}>{peptide.description}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              android_material_icon_name="medication"
              ios_icon_name="pills.fill"
              size={24}
              color={themeColors.primary}
            />
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Dosing Information</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>Dosage Range</Text>
              <Text style={[styles.infoValue, { color: themeColors.text }]}>
                {peptide.dosageMin} - {peptide.dosageMax}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>Frequency</Text>
              <Text style={[styles.infoValue, { color: themeColors.text }]}>{peptide.frequency}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>Timing</Text>
              <Text style={[styles.infoValue, { color: themeColors.text }]}>
                {peptide.timing || 'As directed'}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>Administration</Text>
              <Text style={[styles.infoValue, { color: themeColors.text }]}>{peptide.administrationRoute}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              android_material_icon_name="check-circle"
              ios_icon_name="checkmark.circle.fill"
              size={24}
              color={themeColors.accent}
            />
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Benefits</Text>
          </View>

          <View style={styles.listContainer}>
            {benefitsList.map((benefit, index) => (
              <View key={index} style={styles.listItem}>
                <View style={[styles.bulletPoint, { backgroundColor: themeColors.accent }]} />
                <Text style={[styles.listText, { color: themeColors.text }]}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              android_material_icon_name="warning"
              ios_icon_name="exclamationmark.triangle.fill"
              size={24}
              color={themeColors.error}
            />
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Potential Side Effects</Text>
          </View>

          <View style={styles.listContainer}>
            {sideEffectsList.map((sideEffect, index) => (
              <View key={index} style={styles.listItem}>
                <View style={[styles.bulletPoint, { backgroundColor: themeColors.error }]} />
                <Text style={[styles.listText, { color: themeColors.text }]}>{sideEffect}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.disclaimer, { backgroundColor: themeColors.highlight }]}>
          <IconSymbol
            android_material_icon_name="info"
            ios_icon_name="info.circle.fill"
            size={20}
            color={themeColors.primary}
          />
          <Text style={[styles.disclaimerText, { color: themeColors.text }]}>
            This information is for educational purposes only. Always consult with a qualified healthcare provider before starting any peptide therapy.
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  peptideName: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 12,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    marginRight: 12,
  },
  listText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  disclaimer: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  disclaimerText: {
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 12,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  errorButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
