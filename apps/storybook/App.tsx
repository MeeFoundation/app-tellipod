import {
  PublicSans_400Regular,
  PublicSans_500Medium,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
  useFonts,
} from "@expo-google-fonts/public-sans";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StorybookUIRoot from "./.rnstorybook";

export function App() {
  const [fontsLoaded] = useFonts({
    PublicSans_400Regular,
    PublicSans_500Medium,
    PublicSans_600SemiBold,
    PublicSans_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  // The providers a UI-kit Modal needs. They sit above the whole Storybook UI, so a sheet covers the
  // screen and not only the story area.
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <StorybookUIRoot />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
