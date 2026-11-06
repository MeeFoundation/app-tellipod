import { type FC, type ReactNode, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "../cn";
import { Icon } from "../Icon/Icon";
import { IconDefaultsProvider } from "../Icon/IconDefaults";
import { hitSlopFor, MIN_TARGET } from "../touchTarget";
import { useBreadcrumbs } from "./BreadcrumbsContext";
import { type ItemState, LABEL, LOOKS, SIZES } from "./breadcrumbsStyles";

export type BreadcrumbProps = {
  readonly label: string;
  // With it the item is a link. Without it, the item is plain text: the current place.
  readonly onPress?: () => void;
  // A link that does nothing and looks faded.
  readonly disabled?: boolean;
  // Slot, such as a house. An `Icon` in it takes the size and text color of the item.
  readonly leadingIcon?: ReactNode;
  // Read aloud in place of the label.
  readonly accessibilityLabel?: string;
  readonly testID?: string;
};

// An item of `Breadcrumbs`. Its size and whether it is last come from the `Breadcrumbs` around it.
export const Breadcrumb: FC<BreadcrumbProps> = ({
  label,
  onPress,
  disabled = false,
  leadingIcon,
  accessibilityLabel,
  testID = "breadcrumb",
}) => {
  const { size, last } = useBreadcrumbs();
  const sizeLook = SIZES[size];
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const isLink = onPress !== undefined;
  const state: ItemState = disabled
    ? "disabled"
    : !isLink
      ? "text"
      : pressed
        ? "pressed"
        : focused
          ? "focused"
          : "default";
  const look = LOOKS[state];
  const iconDefaults = useMemo(
    () => ({ className: look.text, size: sizeLook.iconPx }),
    [look.text, sizeLook.iconPx],
  );
  const itemClassName = cn(
    "flex-row items-center rounded",
    sizeLook.item,
    look.item,
  );
  const content = (
    <IconDefaultsProvider value={iconDefaults}>
      {leadingIcon}
      <View>
        <Text className={cn(LABEL, sizeLook.label, look.text)}>{label}</Text>
        {look.underline ? (
          <View
            className={cn(
              "bg-surface-brand-solid_hover absolute right-0 left-0 h-px",
              sizeLook.underline,
            )}
            testID={`${testID}-underline`}
          />
        ) : null}
      </View>
      {last ? null : (
        <Icon
          className={look.text}
          name="chevron-right"
          size={sizeLook.chevronPx}
        />
      )}
    </IconDefaultsProvider>
  );

  if (!isLink) {
    return (
      <View
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityRole="text"
        accessibilityState={{ disabled }}
        accessible
        className={itemClassName}
        testID={testID}
      >
        {content}
      </View>
    );
  }

  const slop = hitSlopFor(sizeLook.itemHeight, MIN_TARGET);
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      className={itemClassName}
      disabled={disabled}
      hitSlop={{ bottom: slop, top: slop }}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      testID={testID}
    >
      {content}
    </Pressable>
  );
};
