
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';

export default function PeptideCalculator() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [totalDosage, setTotalDosage] = useState('');
  const [desiredDosage, setDesiredDosage] = useState('');
  const [reconstitutionVolume, setReconstitutionVolume] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const bgColor = isDark ? colors.backgroundDark : colors.backgroundLight;
  const textColor = isDark ? colors.textDark : colors.textLight;
  const cardBg = isDark ? '#1C1C1E' : '#FFFFFF';
  const borderColor = isDark ? '#38383A' : '#E0E0E0';
  const secondaryTextColor = isDark ? '#8E8E93' : '#666666';
  const inputBg = isDark ? '#2C2C2E' : '#F5F5F5';

  const calculateUnits = () => {
    console.log('User tapped Calculate button');
    console.log('Inputs - Total:', totalDosage, 'Desired:', desiredDosage, 'Volume:', reconstitutionVolume);

    const total = parseFloat(totalDosage);
    const desired = parseFloat(desiredDosage);
    const volume = parseFloat(reconstitutionVolume);

    if (isNaN(total) || isNaN(desired) || isNaN(volume) || total <= 0 || volume <= 0) {
      console.log('Invalid input values');
      setResult(null);
      return;
    }

    const units = (desired / total) * volume * 100;
    const roundedUnits = Math.round(units * 100) / 100;
    
    console.log('Calculated units:', roundedUnits);
    setResult(roundedUnits);
  };

  const clearCalculator = () => {
    console.log('User tapped Clear button');
    setTotalDosage('');
    setDesiredDosage('');
    setReconstitutionVolume('');
    setResult(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: cardBg, borderColor }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          console.log('User toggled calculator:', !isExpanded);
          setIsExpanded(!isExpanded);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <IconSymbol
            ios_icon_name="function"
            android_material_icon_name="calculate"
            size={24}
            color={colors.primary}
          />
          <Text style={[styles.title, { color: textColor }]}>Peptide Calculator</Text>
        </View>
        <IconSymbol
          ios_icon_name={isExpanded ? 'chevron.up' : 'chevron.down'}
          android_material_icon_name={isExpanded ? 'expand-less' : 'expand-more'}
          size={24}
          color={secondaryTextColor}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          <Text style={[styles.description, { color: secondaryTextColor }]}>
            Calculate insulin syringe units for peptide reconstitution
          </Text>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Total Peptide Dosage (mg)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor }]}
              placeholder="e.g., 5"
              placeholderTextColor={secondaryTextColor}
              keyboardType="decimal-pad"
              value={totalDosage}
              onChangeText={setTotalDosage}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Desired Injection Dosage (mg)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor }]}
              placeholder="e.g., 0.25"
              placeholderTextColor={secondaryTextColor}
              keyboardType="decimal-pad"
              value={desiredDosage}
              onChangeText={setDesiredDosage}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Reconstitution Fluid Volume (ml)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor }]}
              placeholder="e.g., 2"
              placeholderTextColor={secondaryTextColor}
              keyboardType="decimal-pad"
              value={reconstitutionVolume}
              onChangeText={setReconstitutionVolume}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.calculateButton]}
              onPress={calculateUnits}
            >
              <Text style={styles.calculateButtonText}>Calculate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.clearButton, { borderColor }]}
              onPress={clearCalculator}
            >
              <Text style={[styles.clearButtonText, { color: textColor }]}>Clear</Text>
            </TouchableOpacity>
          </View>

          {result !== null && (
            <View style={[styles.resultContainer, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
              <View style={styles.resultHeader}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={24}
                  color={colors.primary}
                />
                <Text style={[styles.resultLabel, { color: colors.primary }]}>Result</Text>
              </View>
              <View style={styles.resultValueRow}>
                <Text style={[styles.resultValue, { color: textColor }]}>
                  {result}
                </Text>
                <Text style={[styles.resultUnit, { color: textColor }]}> units</Text>
              </View>
              <Text style={[styles.resultSubtext, { color: secondaryTextColor }]}>
                on an insulin syringe
              </Text>
            </View>
          )}

          <View style={[styles.infoBox, { backgroundColor: inputBg, borderColor }]}>
            <IconSymbol
              ios_icon_name="info.circle"
              android_material_icon_name="info"
              size={16}
              color={secondaryTextColor}
            />
            <Text style={[styles.infoText, { color: secondaryTextColor }]}>
              Formula: (Desired Dose ÷ Total Dose) × Volume × 100
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 12,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateButton: {
    backgroundColor: colors.primary,
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
    alignItems: 'center',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  resultUnit: {
    fontSize: 20,
    fontWeight: '600',
  },
  resultSubtext: {
    fontSize: 14,
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoText: {
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
});
