
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);

  useEffect(() => {
    checkDisclaimerStatus();
  }, []);

  const checkDisclaimerStatus = async () => {
    console.log('Checking disclaimer acceptance status');
    try {
      const accepted = await SecureStore.getItemAsync('disclaimer_accepted');
      console.log('Disclaimer accepted:', accepted);
      setHasAcceptedDisclaimer(accepted === 'true');
    } catch (error) {
      console.error('Error checking disclaimer status:', error);
      setHasAcceptedDisclaimer(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!hasAcceptedDisclaimer) {
    console.log('Redirecting to disclaimer screen');
    return <Redirect href="/disclaimer" />;
  }

  console.log('Redirecting to home screen');
  return <Redirect href="/(tabs)/(home)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
