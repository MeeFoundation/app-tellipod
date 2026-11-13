import { type FC, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "../cn";
import { Icon } from "../Icon/Icon";
import { hitSlopFor, MIN_TARGET } from "../touchTarget";

export type SearchEntryProps = {
  // Shown in the field's look, and read aloud as the button's label.
  readonly placeholder: string;
  readonly onPress: () => void;
  readonly testID?: string;
};

const HEIGHT_PX = 44;
const ICON_PX = 20;

// A row that looks like a search field and opens search when tapped, as in the Home header. It is a
// button, not an input: it takes no text and no focus, and never shows a keyboard.
export const SearchEntry: FC<SearchEntryProps> = ({
  placeholder,
  onPress,
  testID = "search-entry",
}) => {
  const [pressed, setPressed] = useState(false);
  const slop = hitSlopFor(HEIGHT_PX, MIN_TARGET);

  return (
    <Pressable
      accessibilityLabel={placeholder}
      accessibilityRole="button"
      className={cn(
        "border-stroke-gray-accent h-11 w-full flex-row items-center gap-2 overflow-hidden rounded-xl border p-3",
        pressed ? "bg-surface-gray-soft" : "bg-surface-default-main",
      )}
      hitSlop={{ bottom: slop, top: slop }}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      testID={testID}
    >
      <Icon className="text-text-default-body" name="search" size={ICON_PX} />
      <View className="flex-1">
        <Text
          className="font-public-sans-regular text-text-default-placeholder text-base"
          numberOfLines={1}
          testID={`${testID}-placeholder`}
        >
          {placeholder}
        </Text>
      </View>
    </Pressable>
  );
};
