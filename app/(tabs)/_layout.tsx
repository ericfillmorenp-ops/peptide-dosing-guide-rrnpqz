
import React from 'react';
import { useColorScheme } from 'react-native';
import FloatingTabBar from '@/components/FloatingTabBar';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? colors.dark : colors.light;

  const tabs = [
    {
      route: '/(tabs)/(home)',
      label: 'Search',
      ios_icon_name: 'magnifyingglass',
      android_material_icon_name: 'search' as const,
    },
    {
      route: '/(tabs)/profile',
      label: 'About',
      ios_icon_name: 'info.circle',
      android_material_icon_name: 'info' as const,
    },
  ];

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
