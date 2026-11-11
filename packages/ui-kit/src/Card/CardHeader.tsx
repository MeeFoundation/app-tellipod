import type { FC, ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "../cn";
import { Icon, type IconName } from "../Icon/Icon";

const AVATAR_ICON_PX = 18;

type CardHeaderProps = {
  readonly icon: IconName;
  readonly title: string;
  // The chevron, drawn by the Card because it turns in one mode and not in the other.
  readonly chevron: ReactNode;
  readonly onPress: () => void;
  // Set for an expandable Card only.
  readonly expanded?: boolean;
  // A line under the header, shown while the body is open.
  readonly divided: boolean;
  readonly testID: string;
};

// Figma `cell-info` as the header of `Card-Cell-Details-Preview`: 48 px high, so it already
// reaches the minimum touch target.
export const CardHeader: FC<CardHeaderProps> = ({
  icon,
  title,
  chevron,
  onPress,
  expanded,
  divided,
  testID,
}) => (
  <Pressable
    accessibilityLabel={title}
    accessibilityRole="button"
    {...(expanded === undefined ? {} : { accessibilityState: { expanded } })}
    className={cn(
      "h-12 flex-row items-center gap-2 py-2 pr-4 pl-2",
      divided ? "border-stroke-gray-light border-b" : "",
    )}
    onPress={onPress}
    testID={testID}
  >
    <View
      accessibilityElementsHidden
      className="bg-surface-gray-light size-8 items-center justify-center rounded-full"
      importantForAccessibility="no-hide-descendants"
    >
      <Icon
        className="text-text-brand-solid"
        name={icon}
        size={AVATAR_ICON_PX}
      />
    </View>
    <Text className="font-public-sans-medium text-text-default-title flex-1 text-base">
      {title}
    </Text>
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {chevron}
    </View>
  </Pressable>
);
