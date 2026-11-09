import {
  PublicSans_400Regular,
  PublicSans_500Medium,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
  useFonts,
} from "@expo-google-fonts/public-sans";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { type ErrorBoundaryProps, Slot } from "expo-router";
import { Provider as JotaiProvider } from "jotai";
import type { FC } from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../../global.css";

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({ error }) => (
  <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
    <Text>{error.message}</Text>
  </View>
);

const RootLayout: FC = () => {
  const [fontsLoaded, fontError] = useFonts({
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
  });

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <JotaiProvider>
          <BottomSheetModalProvider>
            <Slot />
          </BottomSheetModalProvider>
        </JotaiProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
