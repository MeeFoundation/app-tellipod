import { type FC, useState } from "react";
import { Pressable, View } from "react-native";

import { cn } from "../cn";
import { Icon, type IconName } from "../Icon/Icon";
import { IconDefaultsProvider } from "../Icon/IconDefaults";
import { hitSlopFor, MIN_TARGET } from "../touchTarget";

export type HeaderIconButtonProps = {
  readonly icon: IconName;
  // Required: the button shows only an icon, so the label is all a screen reader has.
  readonly accessibilityLabel: string;
  readonly onPress?: () => void;
  readonly testID?: string;
};

const BUTTON_PX = 44;
const ICON_PX = 24;
const ICON_DEFAULTS = { className: "text-text-default-body", size: ICON_PX };

// The icon-only button of the AppHeader's title row, such as the back chevron and the kebab. It is
// not the design system's Button, and its pressed look is not in the design: the user chose it.
export const HeaderIconButton: FC<HeaderIconButtonProps> = ({
  icon,
  accessibilityLabel,
  onPress,
  testID = "header-icon-button",
}) => {
  const [pressed, setPressed] = useState(false);
  // 44 px is enough on iOS. Android needs 48 dp, so the touch area grows 2 px on each side.
  const slop = hitSlopFor(BUTTON_PX, MIN_TARGET);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      className={cn(
        "size-11 items-center justify-center overflow-hidden rounded-xl p-2.5",
        pressed && "bg-surface-gray-light",
      )}
      hitSlop={{ bottom: slop, left: slop, right: slop, top: slop }}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      testID={testID}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <IconDefaultsProvider value={ICON_DEFAULTS}>
          <Icon name={icon} />
        </IconDefaultsProvider>
      </View>
    </Pressable>
  );
};
