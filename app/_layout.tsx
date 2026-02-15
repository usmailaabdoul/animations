import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Animations",
          }}
        />
        <Stack.Screen
          name="animations/apple-auto-slider"
          options={{
            title: "Apple Auto Slider",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="animations/onboarding-screens"
          options={{
            title: "Onboarding Screens",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
