import type { FC, ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import { Icon } from "../Icon/Icon";
import { IconDefaultsProvider } from "../Icon/IconDefaults";
import { hitSlopFor, MIN_TARGET } from "../touchTarget";

export type ToastType = "primary" | "secondary" | "success" | "danger";

export type ToastLink = {
  readonly label: string;
  readonly onPress: () => void;
};

export type ToastProps = {
  // Defaults to `secondary`, the white toast.
  readonly type?: ToastType;
  // An `Icon`. The Toast draws it at 16 px in the title color of its type.
  readonly icon?: ReactNode;
  readonly title: string;
  readonly description?: string;
  // One link at the right edge of the title row.
  readonly action?: ToastLink;
  // Links in a row below the description.
  readonly actions?: readonly ToastLink[];
  // The close button shows only when this is given. The Toast never hides itself.
  readonly onClose?: () => void;
  readonly testID?: string;
};

type Look = {
  readonly fill: string;
  readonly edge: string;
  readonly title: string;
  readonly description: string;
  readonly link: string;
};

// Figma Toast types Primary, Secondary, Success and Danger. Static class names, so NativeWind
// extracts them.
const LOOKS: Readonly<Record<ToastType, Look>> = {
  danger: {
    description: "text-error-800",
    edge: "border-error-300",
    fill: "bg-error-50",
    link: "text-text-error-solid",
    title: "text-error-900",
  },
  primary: {
    description: "text-brand-800",
    edge: "border-brand-300",
    fill: "bg-brand-50",
    link: "text-text-brand-solid",
    title: "text-brand-900",
  },
  secondary: {
    description: "text-gray-800",
    edge: "border-gray-200",
    fill: "bg-surface-default-main",
    link: "text-text-brand-solid",
    title: "text-gray-900",
  },
  success: {
    description: "text-success-800",
    edge: "border-success-300",
    fill: "bg-success-50",
    link: "text-text-success-solid",
    title: "text-success-900",
  },
};

const ICON_SIZE = 16;
const CLOSE_SIZE = 20;
// Links and the close button are one text line high, so their touch area grows vertically.
const LINK_HEIGHT = 20;
// The clip around the content pads 12 px vertically and 16 px horizontally. A touch area cannot
// reach past it, so the slop is capped there.
const CLIP_PAD_Y = 12;
const CLIP_PAD_X = 16;
const slopY = (size: number) =>
  Math.min(hitSlopFor(size, MIN_TARGET), CLIP_PAD_Y);
const slopX = (size: number) =>
  Math.min(hitSlopFor(size, MIN_TARGET), CLIP_PAD_X);

type LinkProps = {
  readonly link: ToastLink;
  readonly className: string;
  readonly testID: string;
};

const Link: FC<LinkProps> = ({ link, className, testID }) => (
  <Pressable
    accessibilityRole="button"
    hitSlop={{
      bottom: slopY(LINK_HEIGHT),
      top: slopY(LINK_HEIGHT),
    }}
    onPress={link.onPress}
    testID={testID}
  >
    <Text
      className={`font-public-sans-regular text-sm ${className}`}
      testID={`${testID}-label`}
    >
      {link.label}
    </Text>
  </Pressable>
);

// Figma `Toast`: a short message card with an icon, a title, a description and its actions. It
// holds no state and does not place itself: `ToastHost` shows it above the screen.
// It does not draw the Avatar layout or the types Tertiary, Dark and Warning.
export const Toast: FC<ToastProps> = ({
  type = "secondary",
  icon,
  title,
  description,
  action,
  actions,
  onClose,
  testID = "toast",
}) => {
  const look = LOOKS[type];
  const hasIcon = icon !== undefined && icon !== null;
  const readAloud =
    description === undefined ? title : `${title} ${description}`;

  return (
    <View
      className={`shadow-3 w-full rounded-lg border ${look.fill} ${look.edge}`}
      testID={testID}
    >
      <View
        className="flex-row items-center gap-2 overflow-hidden rounded-lg px-4 py-3"
        testID={`${testID}-clip`}
      >
        <View className="flex-1">
          <View
            accessibilityLabel={readAloud}
            accessibilityRole="text"
            accessible
          >
            <View className="flex-row items-start gap-1.5">
              {hasIcon ? (
                <View
                  accessibilityElementsHidden
                  className="w-4 items-center justify-center py-0.5"
                  importantForAccessibility="no-hide-descendants"
                  testID={`${testID}-icon`}
                >
                  <IconDefaultsProvider
                    value={{ className: look.title, size: ICON_SIZE }}
                  >
                    {icon}
                  </IconDefaultsProvider>
                </View>
              ) : null}
              <Text
                className={`font-public-sans-semibold flex-1 text-sm ${look.title}`}
                testID={`${testID}-title`}
              >
                {title}
              </Text>
            </View>
            {description === undefined ? null : (
              <View className="flex-row items-start gap-1.5">
                {hasIcon ? (
                  <View className="h-5 w-4" testID={`${testID}-icon-spacer`} />
                ) : null}
                <Text
                  className={`font-public-sans-regular flex-1 text-sm ${look.description}`}
                  testID={`${testID}-description`}
                >
                  {description}
                </Text>
              </View>
            )}
          </View>
          {actions === undefined || actions.length === 0 ? null : (
            <View
              className="flex-row items-center gap-4 pt-1.5"
              testID={`${testID}-actions`}
            >
              {/* With the gap-4 after it, 6 + 16 = the icon column (16) plus its gap (6). */}
              {hasIcon ? <View className="h-5 w-1.5" /> : null}
              {actions.map((link, index) => (
                <Link
                  className={look.link}
                  // biome-ignore lint/suspicious/noArrayIndexKey: labels may repeat
                  key={`${index}-${link.label}`}
                  link={link}
                  testID={`${testID}-action-${index}`}
                />
              ))}
            </View>
          )}
        </View>
        {action === undefined && onClose === undefined ? null : (
          <View className="flex-row items-start gap-4 self-stretch">
            {action === undefined ? null : (
              <Link
                className={look.link}
                link={action}
                testID={`${testID}-right-action`}
              />
            )}
            {onClose === undefined ? null : (
              <Pressable
                accessibilityLabel="Close"
                accessibilityRole="button"
                hitSlop={{
                  bottom: slopY(CLOSE_SIZE),
                  left: slopX(CLOSE_SIZE),
                  right: slopX(CLOSE_SIZE),
                  top: slopY(CLOSE_SIZE),
                }}
                onPress={onClose}
                testID={`${testID}-close`}
              >
                <Icon className={look.title} name="x" size={CLOSE_SIZE} />
              </Pressable>
            )}
          </View>
        )}
      </View>
    </View>
  );
};
