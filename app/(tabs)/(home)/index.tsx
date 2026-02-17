
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
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

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const router = useRouter();
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  const [searchQuery, setSearchQuery] = useState('');
  const [peptides, setPeptides] = useState<Peptide[]>([]);
  const [filteredPeptides, setFilteredPeptides] = useState<Peptide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'GLP-1', 'Growth Hormone', 'Cognitive', 'Recovery', 'Other'];

  useEffect(() => {
    console.log('HomeScreen mounted - fetching peptides');
    fetchPeptides();
  }, []);

  useEffect(() => {
    console.log('Search query or category changed:', searchQuery, selectedCategory);
    filterPeptides();
  }, [searchQuery, peptides, selectedCategory]);

  const fetchPeptides = async () => {
    try {
      console.log('Fetching peptides from API');
      setLoading(true);
      // TODO: Backend Integration - GET /api/peptides to fetch all peptides
      // Returns: [{ id, name, description, category, benefits, sideEffects, dosageMin, dosageMax, frequency, timing, administrationRoute }]
      
      // Mock data for now
      const mockPeptides: Peptide[] = [
        {
          id: '1',
          name: 'Semaglutide',
          description: 'GLP-1 receptor agonist used for weight management and blood sugar control',
          category: 'GLP-1',
          benefits: 'Weight loss, Improved glycemic control, Reduced appetite, Cardiovascular benefits',
          sideEffects: 'Nausea, Vomiting, Diarrhea, Constipation',
          dosageMin: '0.25mg',
          dosageMax: '2.4mg',
          frequency: 'Once weekly',
          timing: 'Any time of day',
          administrationRoute: 'Subcutaneous injection',
        },
        {
          id: '2',
          name: 'CJC-1295',
          description: 'Growth hormone releasing hormone analog that increases growth hormone production',
          category: 'Growth Hormone',
          benefits: 'Increased muscle mass, Fat loss, Improved recovery, Better sleep quality',
          sideEffects: 'Injection site reactions, Water retention, Numbness',
          dosageMin: '1mg',
          dosageMax: '2mg',
          frequency: 'Twice weekly',
          timing: 'Before bed',
          administrationRoute: 'Subcutaneous injection',
        },
        {
          id: '3',
          name: 'BPC-157',
          description: 'Body protection compound that promotes healing and tissue repair',
          category: 'Recovery',
          benefits: 'Accelerated healing, Reduced inflammation, Gut health, Joint repair',
          sideEffects: 'Minimal side effects reported, Possible fatigue',
          dosageMin: '200mcg',
          dosageMax: '500mcg',
          frequency: 'Once or twice daily',
          timing: 'Morning and evening',
          administrationRoute: 'Subcutaneous or intramuscular injection',
        },
      ];
      
      setPeptides(mockPeptides);
      console.log('Peptides loaded:', mockPeptides.length);
    } catch (error) {
      console.error('Error fetching peptides:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPeptides = () => {
    let filtered = peptides;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    setFilteredPeptides(filtered);
    console.log('Filtered peptides:', filtered.length);
  };

  const handlePeptidePress = (peptide: Peptide) => {
    console.log('User tapped peptide:', peptide.name);
    router.push({
      pathname: '/peptide-detail',
      params: { peptideId: peptide.id },
    });
  };

  const renderPeptideCard = (peptide: Peptide, index: number) => {
    const benefitsList = peptide.benefits.split(',').slice(0, 3);
    const benefitsText = benefitsList.join(', ');
    const dosageText = `${peptide.dosageMin} - ${peptide.dosageMax}`;

    return (
      <TouchableOpacity
        key={index}
        style={[styles.peptideCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
        onPress={() => handlePeptidePress(peptide)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Text style={[styles.peptideName, { color: themeColors.text }]}>{peptide.name}</Text>
            <View style={[styles.categoryBadge, { backgroundColor: themeColors.highlight }]}>
              <Text style={[styles.categoryText, { color: themeColors.primary }]}>{peptide.category}</Text>
            </View>
          </View>
          <Text style={[styles.peptideDescription, { color: themeColors.textSecondary }]} numberOfLines={2}>
            {peptide.description}
          </Text>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.infoRow}>
          <IconSymbol
            android_material_icon_name="medication"
            ios_icon_name="pills.fill"
            size={16}
            color={themeColors.primary}
          />
          <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>Dosage:</Text>
          <Text style={[styles.infoValue, { color: themeColors.text }]}>{dosageText}</Text>
        </View>

        <View style={styles.infoRow}>
          <IconSymbol
            android_material_icon_name="schedule"
            ios_icon_name="clock.fill"
            size={16}
            color={themeColors.secondary}
          />
          <Text style={[styles.infoLabel, { color: themeColors.textSecondary }]}>Frequency:</Text>
          <Text style={[styles.infoValue, { color: themeColors.text }]}>{peptide.frequency}</Text>
        </View>

        <View style={styles.benefitsRow}>
          <IconSymbol
            android_material_icon_name="check-circle"
            ios_icon_name="checkmark.circle.fill"
            size={16}
            color={themeColors.accent}
          />
          <Text style={[styles.benefitsText, { color: themeColors.textSecondary }]} numberOfLines={2}>
            {benefitsText}
          </Text>
        </View>

        <View style={styles.viewMoreRow}>
          <Text style={[styles.viewMoreText, { color: themeColors.primary }]}>View Details</Text>
          <IconSymbol
            android_material_icon_name="arrow-forward"
            ios_icon_name="chevron.right"
            size={16}
            color={themeColors.primary}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Stack.Screen
        options={{
          title: 'Peptide Guide',
          headerShown: true,
          headerStyle: { backgroundColor: themeColors.card },
          headerTintColor: themeColors.text,
        }}
      />

      <View style={[styles.searchContainer, { backgroundColor: themeColors.card, borderBottomColor: themeColors.border }]}>
        <View style={[styles.searchBar, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
          <IconSymbol
            android_material_icon_name="search"
            ios_icon_name="magnifyingglass"
            size={20}
            color={themeColors.textSecondary}
          />
          <TextInput
            style={[styles.searchInput, { color: themeColors.text }]}
            placeholder="Search peptides..."
            placeholderTextColor={themeColors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol
                android_material_icon_name="close"
                ios_icon_name="xmark.circle.fill"
                size={20}
                color={themeColors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor: isSelected ? themeColors.primary : themeColors.background,
                    borderColor: themeColors.border,
                  },
                ]}
                onPress={() => {
                  console.log('User selected category:', category);
                  setSelectedCategory(category);
                }}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    { color: isSelected ? '#FFFFFF' : themeColors.text },
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themeColors.primary} />
          <Text style={[styles.loadingText, { color: themeColors.textSecondary }]}>Loading peptides...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredPeptides.length === 0 ? (
            <View style={styles.emptyContainer}>
              <IconSymbol
                android_material_icon_name="search-off"
                ios_icon_name="magnifyingglass"
                size={64}
                color={themeColors.textSecondary}
              />
              <Text style={[styles.emptyTitle, { color: themeColors.text }]}>No peptides found</Text>
              <Text style={[styles.emptyText, { color: themeColors.textSecondary }]}>
                Try adjusting your search or category filter
              </Text>
            </View>
          ) : (
            <>
              <Text style={[styles.resultsCount, { color: themeColors.textSecondary }]}>
                {filteredPeptides.length} peptides found
              </Text>
              {filteredPeptides.map((peptide, index) => renderPeptideCard(peptide, index))}
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categoriesScroll: {
    marginTop: 4,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  resultsCount: {
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  peptideCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  peptideName: {
    fontSize: 20,
    fontWeight: '700',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  peptideDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
    opacity: 0.3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '600',
  },
  benefitsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 12,
  },
  benefitsText: {
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  viewMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
  },
});
