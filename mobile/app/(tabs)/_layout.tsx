import { Slot } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Text, View } from 'react-native';

export default function TabsLayout() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return (
      <View>
        <Text>DEBUG: Tabs Layout Rendered (not authenticated)</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>DEBUG: Tabs Layout Rendered (authenticated)</Text>
      <Slot />
    </View>
  );
}
