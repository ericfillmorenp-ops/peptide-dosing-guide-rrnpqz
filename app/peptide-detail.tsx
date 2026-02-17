
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

interface Peptide {
  id: string;
  name: string;
  description: string;
  category: string;
  benefits: string;
  sideEffects: string;
  dosageMin: string;
  dosageMax: string;
  frequency: string;
  timing: string;
  administrationRoute: string;
}

export default function PeptideDetailScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { peptideId } = useLocalSearchParams();
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  const [peptide, setPeptide] = useState<Peptide | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('PeptideDetailScreen mounted for peptide ID:', peptideId);
    fetchPeptideDetails();
  }, [peptideId]);

  const fetchPeptideDetails = async () => {
    try {
      console.log('Fetching peptide details from API');
      setLoading(true);
      // TODO: Backend Integration - GET /api/peptides/:id to fetch peptide details
      // Returns: { id, name, description, category, benefits, sideEffects, dosageMin, dosageMax, frequency, timing, administrationRoute }
      
      // Mock data for now
      const mockPeptide: Peptide = {
        id: peptideId as string,
        name: 'Semaglutide',
        description: 'GLP-1 receptor agonist used for weight management and blood sugar control. It works by mimicking the GLP-1 hormone that is released in the gastrointestinal tract in response to eating.',
        category: 'GLP-1',
        benefits: 'Weight loss, Improved glycemic control, Reduced appetite, Cardiovascular benefits, Lower blood pressure',
        sideEffects: 'Nausea, Vomiting, Diarrhea, Constipation, Abdominal pain, Headache',
        dosageMin: '0.25mg',
        dosageMax: '2.4mg',
        frequency: 'Once weekly',
        timing: 'Any time of day',
        administrationRoute: 'Subcutaneous injection',
      };
      
      setPeptide(mockPeptide);
      console.log('Peptide details loaded:', mockPeptide.name);
    } catch (error) {
      console.error('Error fetching peptide details:', error);
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
            ios_icon_name="exclamationmark.triangle"
            size={64}
            color={themeColors.error}
          />
          <Text style={[styles.errorTitle, { color: themeColors.text }]}>Peptide not found</Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: themeColors.primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const benefitsList = peptide.benefits.split(',').map(b => b.trim());
  const sideEffectsList = peptide.sideEffects.split(',').map(s => s.trim());

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
              <Text style={[styles.infoValue, { color: themeColors.text }]}>{peptide.timing}</Text>
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
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
