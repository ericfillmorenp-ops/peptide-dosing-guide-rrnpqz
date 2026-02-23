
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';
import * as SecureStore from 'expo-secure-store';

export default function DisclaimerScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleAccept = async () => {
    console.log('User accepted disclaimer');
    try {
      await SecureStore.setItemAsync('disclaimer_accepted', 'true');
      console.log('Disclaimer acceptance saved to SecureStore');
      router.replace('/(tabs)/(home)');
    } catch (error) {
      console.error('Error saving disclaimer acceptance:', error);
      // Still navigate even if storage fails
      router.replace('/(tabs)/(home)');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        style={[
          styles.container,
          { backgroundColor: colorScheme === 'dark' ? colors.dark.background : colors.light.background },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <IconSymbol
              ios_icon_name="info.circle.fill"
              android_material_icon_name="info"
              size={80}
              color={colorScheme === 'dark' ? colors.dark.primary : colors.light.primary}
            />
          </View>

          <Text
            style={[
              styles.title,
              { color: colorScheme === 'dark' ? colors.dark.text : colors.light.text },
            ]}
          >
            Important Notice
          </Text>

          <ScrollView
            style={styles.disclaimerContainer}
            contentContainerStyle={styles.disclaimerContent}
          >
            <Text
              style={[
                styles.disclaimerText,
                { color: colorScheme === 'dark' ? colors.dark.text : colors.light.text },
              ]}
            >
              This app is for educational purposes only and does not provide medical advice.
            </Text>

            <Text
              style={[
                styles.additionalText,
                { color: colorScheme === 'dark' ? colors.dark.secondaryText : colors.light.secondaryText },
              ]}
            >
              The information provided in this app is intended for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment.
            </Text>

            <Text
              style={[
                styles.additionalText,
                { color: colorScheme === 'dark' ? colors.dark.secondaryText : colors.light.secondaryText },
              ]}
            >
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or treatment.
            </Text>
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colorScheme === 'dark' ? colors.dark.primary : colors.light.primary },
            ]}
            onPress={handleAccept}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>I Understand</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  disclaimerContainer: {
    flex: 1,
    width: '100%',
  },
  disclaimerContent: {
    paddingBottom: 20,
  },
  disclaimerText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
  },
  additionalText: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
