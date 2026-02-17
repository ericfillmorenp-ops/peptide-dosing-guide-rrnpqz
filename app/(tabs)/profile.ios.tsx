
import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Stack.Screen
        options={{
          title: 'About',
          headerShown: true,
          headerStyle: { backgroundColor: themeColors.card },
          headerTintColor: themeColors.text,
          headerLargeTitle: true,
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.headerCard, { backgroundColor: themeColors.card }]}>
          <IconSymbol
            android_material_icon_name="science"
            ios_icon_name="flask.fill"
            size={64}
            color={themeColors.primary}
          />
          <Text style={[styles.title, { color: themeColors.text }]}>Peptide Guide</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Your comprehensive resource for peptide information and dosing protocols
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              android_material_icon_name="info"
              ios_icon_name="info.circle.fill"
              size={24}
              color={themeColors.primary}
            />
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>About This App</Text>
          </View>
          <Text style={[styles.bodyText, { color: themeColors.textSecondary }]}>
            This app provides detailed information about peptides, including dosing protocols, benefits, and potential side effects. Our database includes over 100 peptides across various categories including GLP-1 agonists, growth hormone peptides, cognitive enhancers, and recovery compounds.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              android_material_icon_name="search"
              ios_icon_name="magnifyingglass"
              size={24}
              color={themeColors.secondary}
            />
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>How to Use</Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: themeColors.primary }]}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={[styles.stepText, { color: themeColors.text }]}>
                Search for a specific peptide by name or browse by category
              </Text>
            </View>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: themeColors.primary }]}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={[styles.stepText, { color: themeColors.text }]}>
                Tap on any peptide card to view detailed information
              </Text>
            </View>
            <View style={styles.step}>
              <View style={[styles.stepNumber, { backgroundColor: themeColors.primary }]}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={[styles.stepText, { color: themeColors.text }]}>
                Review dosing protocols, benefits, and side effects
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: themeColors.card }]}>
          <View style={styles.sectionHeader}>
            <IconSymbol
              android_material_icon_name="category"
              ios_icon_name="square.grid.2x2.fill"
              size={24}
              color={themeColors.accent}
            />
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Categories</Text>
          </View>
          <View style={styles.categoryList}>
            <View style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: themeColors.primary }]} />
              <Text style={[styles.categoryName, { color: themeColors.text }]}>GLP-1 Agonists</Text>
            </View>
            <View style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: themeColors.secondary }]} />
              <Text style={[styles.categoryName, { color: themeColors.text }]}>Growth Hormone</Text>
            </View>
            <View style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: themeColors.accent }]} />
              <Text style={[styles.categoryName, { color: themeColors.text }]}>Cognitive Enhancement</Text>
            </View>
            <View style={styles.categoryItem}>
              <View style={[styles.categoryDot, { backgroundColor: themeColors.primary }]} />
              <Text style={[styles.categoryName, { color: themeColors.text }]}>Recovery & Healing</Text>
            </View>
          </View>
        </View>

        <View style={[styles.disclaimer, { backgroundColor: themeColors.highlight }]}>
          <IconSymbol
            android_material_icon_name="warning"
            ios_icon_name="exclamationmark.triangle.fill"
            size={24}
            color={themeColors.error}
          />
          <View style={styles.disclaimerContent}>
            <Text style={[styles.disclaimerTitle, { color: themeColors.text }]}>Important Disclaimer</Text>
            <Text style={[styles.disclaimerText, { color: themeColors.textSecondary }]}>
              This app is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding peptide therapy.
            </Text>
          </View>
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
    padding: 32,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
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
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
  },
  stepContainer: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    paddingTop: 4,
  },
  categoryList: {
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '500',
  },
  disclaimer: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  disclaimerContent: {
    flex: 1,
    marginLeft: 12,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 22,
  },
});
