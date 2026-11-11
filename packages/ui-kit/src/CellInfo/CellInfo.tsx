import type { FC } from "react";
import { Pressable, Text, View } from "react-native";

import { Icon } from "../Icon/Icon";
import { hitSlopFor, MIN_TARGET } from "../touchTarget";

export type CellInfoProps = {
  readonly label: string;
  readonly value: string;
  // Shows the pencil button. The CellInfo only shows the value, so the screen decides where editing
  // happens.
  readonly onEdit?: () => void;
  readonly testID?: string;
};

const PENCIL_PX = 16;
const SLOP = hitSlopFor(PENCIL_PX, MIN_TARGET);

// Figma `cell-info` in the body of a card: a small label above a value, and a trailing pencil.
export const CellInfo: FC<CellInfoProps> = ({
  label,
  value,
  onEdit,
  testID = "cell-info",
}) => (
  <View
    className="w-full flex-row items-center gap-3 py-3 pr-2"
    testID={testID}
  >
    <View
      accessibilityLabel={`${label}, ${value}`}
      accessible
      className="flex-1"
    >
      <Text className="font-public-sans-regular text-text-default-subtle text-xs">
        {label}
      </Text>
      <Text className="font-public-sans-medium text-text-default-body text-base">
        {value}
      </Text>
    </View>
    {onEdit === undefined ? null : (
      <Pressable
        accessibilityLabel={`Edit ${label}`}
        accessibilityRole="button"
        hitSlop={{ bottom: SLOP, left: SLOP, right: SLOP, top: SLOP }}
        onPress={onEdit}
        testID={`${testID}-edit`}
      >
        <Icon name="pencil" size={PENCIL_PX} />
      </Pressable>
    )}
  </View>
);
