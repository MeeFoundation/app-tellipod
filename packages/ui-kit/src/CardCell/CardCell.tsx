import type { FC, ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { Badge } from "../Badge/Badge";
import { CardSurface } from "../CardSurface/CardSurface";
import { Icon } from "../Icon/Icon";

export type CardCellProps = {
  // An `Avatar`. The card draws it at size `m`, so pass one of that size.
  readonly avatar: ReactNode;
  readonly title: string;
  // Text, or a `Breadcrumbs` of size `s`. Without it the title is centered.
  readonly subtitle?: ReactNode;
  // Shows a dot on the top leading corner of the Avatar, such as for new info.
  readonly badge?: boolean;
  readonly onPress: () => void;
  // Read aloud for the whole card. It defaults to the title and a text subtitle, with "New" in front
  // when there is a badge. Pass it when the subtitle is not plain text, as that is not read.
  readonly accessibilityLabel?: string;
  readonly testID?: string;
};

// Figma `Card-Cell`: a row card with an avatar, a title, a second line and a chevron.
// While it is pressed the surface turns `surface/gray/soft`; that look is not in the design.
// It does not draw a disabled look, because the design does not show one.
export const CardCell: FC<CardCellProps> = ({
  avatar,
  title,
  subtitle,
  badge = false,
  onPress,
  accessibilityLabel,
  testID = "card-cell",
}) => {
  const text = typeof subtitle === "string" ? `${title}, ${subtitle}` : title;
  const label = accessibilityLabel ?? (badge ? `New, ${text}` : text);

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      testID={testID}
    >
      {({ pressed }) => (
        <CardSurface
          className="min-h-15 flex-row items-center gap-2.5 py-2.5 pr-4 pl-2.5"
          pressed={pressed}
          testID={`${testID}-surface`}
        >
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {avatar}
          </View>
          <View className="flex-1">
            <Text className="font-public-sans-medium text-text-default-title text-base">
              {title}
            </Text>
            {typeof subtitle === "string" ? (
              <Text className="font-public-sans-regular text-text-default-subtle text-xs">
                {subtitle}
              </Text>
            ) : subtitle === undefined || subtitle === null ? null : (
              <View className="-mt-0.5">{subtitle}</View>
            )}
          </View>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <Icon name="chevron-right" size={16} />
          </View>
          {badge ? (
            <View
              accessibilityElementsHidden
              className="absolute start-2.5 top-2.5"
              importantForAccessibility="no-hide-descendants"
              testID={`${testID}-badge`}
            >
              <View className="border-stroke-default-main size-3 items-center justify-center rounded-full border-2">
                <Badge shape="dot" size="xs" type="danger" />
              </View>
            </View>
          ) : null}
        </CardSurface>
      )}
    </Pressable>
  );
};
