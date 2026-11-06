import { type FC, type ReactNode, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "../cn";
import { IconDefaultsProvider } from "../Icon/IconDefaults";
import { hitSlopFor, MIN_TARGET } from "../touchTarget";
import { useTabs } from "./TabsContext";
import { LABEL, LOOKS, SIZES, TAB_ICON_PX, type TabState } from "./tabsStyles";

export type TabProps = {
  readonly label: string;
  // The selected tab. The screen owns the selection, and a Tab never changes it.
  readonly active?: boolean;
  // Not called for the Active tab, which is already selected.
  readonly onPress?: () => void;
  // Slots. An `Icon` in one takes the size and text color of the tab.
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
  // Read aloud in place of the label.
  readonly accessibilityLabel?: string;
  readonly testID?: string;
};

// A tab button of `Tabs`. Its size and layout come from the `Tabs` around it.
export const Tab: FC<TabProps> = ({
  label,
  active = false,
  onPress,
  leadingIcon,
  trailingIcon,
  accessibilityLabel,
  testID = "tab",
}) => {
  const { size, layout } = useTabs();
  const sizeLook = SIZES[size];
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const state: TabState = active
    ? "active"
    : focused
      ? "focused"
      : pressed
        ? "pressed"
        : "default";
  const look = LOOKS[state];
  const iconDefaults = useMemo(
    () => ({ className: look.text, size: TAB_ICON_PX }),
    [look.text],
  );
  const slop = hitSlopFor(sizeLook.tabHeight, MIN_TARGET);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      className={cn(
        "rounded-2lg flex-row items-center justify-center gap-2",
        sizeLook.tab,
        layout === "equal" ? "flex-1" : "",
        look.fill,
      )}
      hitSlop={{ bottom: slop, top: slop }}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onPress={() => {
        if (!active) {
          onPress?.();
        }
      }}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      testID={testID}
    >
      <IconDefaultsProvider value={iconDefaults}>
        {leadingIcon}
        <Text className={cn(LABEL, look.text)}>{label}</Text>
        {trailingIcon}
      </IconDefaultsProvider>
      <View
        className={cn("rounded-2lg absolute inset-0", look.edge)}
        pointerEvents="none"
        testID={`${testID}-edge`}
      />
    </Pressable>
  );
};
