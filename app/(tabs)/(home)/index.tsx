
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
  RefreshControl,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { getAllPeptides, searchPeptides, getPeptidesByCategory, Peptide } from '@/utils/api';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [peptides, setPeptides] = useState<Peptide[]>([]);
  const [filteredPeptides, setFilteredPeptides] = useState<Peptide[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'GLP-1', 'Growth Hormone', 'Healing', 'Skin & Cosmetic', 'Performance', 'Metabolic', 'Immune', 'Cognitive'];

  useEffect(() => {
    console.log('HomeScreen mounted, fetching peptides...');
    fetchPeptides();
  }, []);

  useEffect(() => {
    console.log('Filtering peptides. Search:', searchQuery, 'Category:', selectedCategory, 'Total peptides:', peptides.length);
    fetchFilteredPeptides();
  }, [searchQuery, selectedCategory]);

  const fetchPeptides = async () => {
    try {
      console.log('Calling getAllPeptides API...');
      setError(null);
      const data = await getAllPeptides();
      console.log('Received peptides:', data.length);
      setPeptides(data);
      setFilteredPeptides(data);
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      console.error('Error fetching peptides:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load peptides';
      setError(errorMessage);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchFilteredPeptides = async () => {
    try {
      setError(null);
      let data: Peptide[];

      // Use backend API for filtering when possible
      if (searchQuery && selectedCategory && selectedCategory !== 'All') {
        // Search first, then filter client-side by category
        console.log('Searching with query:', searchQuery);
        const searchResults = await searchPeptides(searchQuery);
        data = searchResults.filter(p => p.category === selectedCategory);
      } else if (searchQuery) {
        // Use search endpoint
        console.log('Searching with query:', searchQuery);
        data = await searchPeptides(searchQuery);
      } else if (selectedCategory && selectedCategory !== 'All') {
        // Use category endpoint
        console.log('Filtering by category:', selectedCategory);
        data = await getPeptidesByCategory(selectedCategory);
      } else {
        // Show all peptides
        data = peptides;
      }

      console.log('Filtered results:', data.length);
      setFilteredPeptides(data);
    } catch (err) {
      console.error('Error filtering peptides:', err);
      // Fallback to showing all peptides on error
      setFilteredPeptides(peptides);
    }
  };

  const handlePeptidePress = (peptide: Peptide) => {
    console.log('User tapped peptide:', peptide.name);
    router.push({
      pathname: '/peptide-detail',
      params: { id: peptide.id }
    });
  };

  const onRefresh = () => {
    console.log('User pulled to refresh');
    setRefreshing(true);
    fetchPeptides();
  };

  const bgColor = isDark ? colors.backgroundDark : colors.backgroundLight;
  const textColor = isDark ? colors.textDark : colors.textLight;
  const cardBg = isDark ? '#1c1c1e' : '#ffffff';
  const borderColor = isDark ? '#38383a' : '#e5e5ea';

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: textColor }]}>Loading peptides...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.centerContent}>
          <IconSymbol
            ios_icon_name="exclamationmark.triangle"
            android_material_icon_name="warning"
            size={48}
            color={colors.error}
          />
          <Text style={[styles.errorTitle, { color: textColor }]}>Error Loading Peptides</Text>
          <Text style={[styles.errorMessage, { color: textColor }]}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchPeptides}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const noPeptidesMessage = peptides.length === 0 
    ? 'Database is being seeded with peptides. Please wait a moment and pull down to refresh.'
    : 'No peptides match your search.';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: bgColor, borderBottomColor: borderColor }]}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Peptide Guide</Text>
        <Text style={[styles.headerSubtitle, { color: textColor }]}>
          {peptides.length} peptides available
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: bgColor }]}>
        <View style={[styles.searchBar, { backgroundColor: cardBg, borderColor }]}>
          <IconSymbol
            ios_icon_name="magnifyingglass"
            android_material_icon_name="search"
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search peptides..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <IconSymbol
                ios_icon_name="xmark.circle.fill"
                android_material_icon_name="cancel"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContainer}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isSelected ? colors.primary : cardBg,
                  borderColor: isSelected ? colors.primary : borderColor,
                }
              ]}
              onPress={() => {
                console.log('User selected category:', category);
                setSelectedCategory(category);
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: isSelected ? '#ffffff' : textColor }
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Peptide List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {filteredPeptides.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol
              ios_icon_name="tray"
              android_material_icon_name="inbox"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={[styles.emptyText, { color: textColor }]}>
              {noPeptidesMessage}
            </Text>
            {peptides.length === 0 && (
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={onRefresh}
              >
                <IconSymbol
                  ios_icon_name="arrow.clockwise"
                  android_material_icon_name="refresh"
                  size={20}
                  color="#ffffff"
                />
                <Text style={styles.refreshButtonText}>Refresh</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredPeptides.map((peptide, index) => {
            const benefitsPreview = peptide.benefits.length > 100
              ? peptide.benefits.substring(0, 100) + '...'
              : peptide.benefits;

            return (
              <TouchableOpacity
                key={peptide.id}
                style={[styles.peptideCard, { backgroundColor: cardBg, borderColor }]}
                onPress={() => handlePeptidePress(peptide)}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.peptideName, { color: textColor }]}>
                    {peptide.name}
                  </Text>
                  <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.categoryBadgeText, { color: colors.primary }]}>
                      {peptide.category}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.peptideBenefits, { color: colors.textSecondary }]}>
                  {benefitsPreview}
                </Text>
                <View style={styles.cardFooter}>
                  <View style={styles.dosageInfo}>
                    <IconSymbol
                      ios_icon_name="syringe"
                      android_material_icon_name="medication"
                      size={16}
                      color={colors.textSecondary}
                    />
                    <Text style={[styles.dosageText, { color: colors.textSecondary }]}>
                      {peptide.dosageMin}
                    </Text>
                    <Text style={[styles.dosageText, { color: colors.textSecondary }]}>-</Text>
                    <Text style={[styles.dosageText, { color: colors.textSecondary }]}>
                      {peptide.dosageMax}
                    </Text>
                  </View>
                  <IconSymbol
                    ios_icon_name="chevron.right"
                    android_material_icon_name="chevron-right"
                    size={20}
                    color={colors.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            );
          })
        )}
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
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  listContainer: {
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  refreshButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  peptideCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  peptideName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  peptideBenefits: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dosageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dosageText: {
    fontSize: 14,
  },
});
