import { Stack } from 'expo-router';

export default function CustomerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="qr-scan" />
      <Stack.Screen name="index" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="notification-settings" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="leave-options" />
      <Stack.Screen name="leave-confirm" />
    </Stack>
  );
}
