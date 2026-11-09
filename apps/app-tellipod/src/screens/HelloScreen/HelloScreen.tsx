import type { FC } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@tellipod/ui-kit";

export const HelloScreen: FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-surface-default flex-1 items-center justify-center gap-6 px-6"
      style={{ paddingBottom: insets.bottom, paddingTop: insets.top }}
    >
      <Text className="font-public-sans-semibold text-text-default text-2xl">
        Hello, Tellipod
      </Text>
      <Button label="Get started" />
    </View>
  );
};
