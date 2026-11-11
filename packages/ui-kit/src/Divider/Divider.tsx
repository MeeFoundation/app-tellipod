import type { FC } from "react";
import { View } from "react-native";

// A horizontal hairline as wide as its parent. Figma `Divider`: 1 px of `stroke/gray/light`.
// It only separates, so assistive technology skips it.
export const Divider: FC<{ readonly testID?: string }> = ({
  testID = "divider",
}) => (
  <View
    accessibilityElementsHidden
    className="bg-stroke-gray-light h-px w-full"
    importantForAccessibility="no-hide-descendants"
    testID={testID}
  />
);
