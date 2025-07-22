import { Slot } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function TabsLayout() {
  return (
    <>
      <ThemedText>DEBUG: Tabs Layout Rendered</ThemedText>
      <Slot />
    </>
  );
}
