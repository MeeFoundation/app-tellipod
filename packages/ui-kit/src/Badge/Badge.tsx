import { type FC, type ReactNode, useMemo } from "react";
import { Text, View } from "react-native";

import { cn } from "../cn";
import { Icon } from "../Icon/Icon";
import { IconDefaultsProvider } from "../Icon/IconDefaults";

export type BadgeType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";
export type BadgeVariant = "filled-solid" | "filled-light" | "outlined-light";
export type BadgeSize = "xxs" | "xs" | "s" | "m";
export type BadgeShape = "rounded" | "pill" | "circle" | "dot";

type Look = {
  // Fill and stroke of the badge, and of the Dot shape.
  readonly surface: string;
  // Text color of the label, the count and the icons.
  readonly text: string;
};

// Figma Badge, Type x Style. Primary is brand, Secondary is gray and Danger is error.
// Classes are written out in full so Tailwind finds them.
const LOOKS: Readonly<Record<BadgeVariant, Readonly<Record<BadgeType, Look>>>> =
  {
    "filled-light": {
      danger: {
        surface: "border border-stroke-error-light bg-surface-error-soft",
        text: "text-text-error-solid",
      },
      primary: {
        surface: "border border-stroke-brand-light bg-surface-brand-soft",
        text: "text-text-brand-solid",
      },
      secondary: {
        surface: "border border-stroke-gray-light bg-surface-gray-soft",
        text: "text-text-gray-solid",
      },
      success: {
        surface: "border border-stroke-success-light bg-surface-success-soft",
        text: "text-text-success-solid",
      },
      warning: {
        surface: "border border-stroke-warning-light bg-surface-warning-soft",
        text: "text-text-warning-solid",
      },
    },
    "filled-solid": {
      danger: {
        surface: "border border-stroke-error-solid bg-surface-error-solid",
        text: "text-text-error-on-solid-background",
      },
      primary: {
        surface: "border border-stroke-brand-solid bg-surface-brand-solid",
        text: "text-text-brand-on-solid-background",
      },
      secondary: {
        surface: "border border-stroke-gray-solid bg-surface-gray-solid",
        text: "text-text-gray-on-solid-background",
      },
      success: {
        surface: "border border-stroke-success-solid bg-surface-success-solid",
        text: "text-text-success-on-solid-background",
      },
      warning: {
        surface: "border border-stroke-warning-solid bg-surface-warning-solid",
        text: "text-text-warning-on-solid-background",
      },
    },
    "outlined-light": {
      danger: {
        surface: "border border-stroke-error-light",
        text: "text-text-error-solid",
      },
      primary: {
        surface: "border border-stroke-brand-light",
        text: "text-text-brand-solid",
      },
      secondary: {
        surface: "border border-stroke-gray-light",
        text: "text-text-gray-solid",
      },
      success: {
        surface: "border border-stroke-success-light",
        text: "text-text-success-solid",
      },
      warning: {
        surface: "border border-stroke-warning-light",
        text: "text-text-warning-solid",
      },
    },
  };

type SizeClasses = {
  // Height and horizontal padding of a rounded or pill badge. Figma's 2 px vertical padding is
  // left out: with a fixed height it only crops the label, which already fits.
  readonly box: string;
  // Height, minimum width and padding of a circle badge: as wide as high, at least.
  readonly circle: string;
  // Horizontal padding of the label, the same as the badge's.
  readonly labelPadding: string;
  readonly label: string;
  // Corner radius of a rounded badge.
  readonly radius: string;
  // Width and height of a dot badge.
  readonly dot: string;
  // Size in px of the leading dot and of the icons.
  readonly iconSize: number;
};

// Figma sizes XXS, XS, S and M: heights 16, 20, 24 and 28.
const SIZE_CLASSES: Readonly<Record<BadgeSize, SizeClasses>> = {
  m: {
    box: "h-7 px-2",
    circle: "h-7 min-w-7 px-0.5",
    dot: "size-4",
    iconSize: 16,
    label: "font-public-sans-semibold text-base",
    labelPadding: "px-2",
    radius: "rounded-md",
  },
  s: {
    box: "h-6 px-1.5",
    circle: "h-6 min-w-6 px-0.5",
    dot: "size-3",
    iconSize: 14,
    label: "font-public-sans-semibold text-sm",
    labelPadding: "px-1.5",
    radius: "rounded",
  },
  xs: {
    box: "h-5 px-1",
    circle: "h-5 min-w-5 px-0.5",
    dot: "size-2",
    iconSize: 12,
    label: "font-public-sans-semibold text-xs",
    labelPadding: "px-1",
    radius: "rounded",
  },
  xxs: {
    box: "h-4 px-1",
    circle: "h-4 min-w-4",
    dot: "size-1",
    iconSize: 10,
    label: "font-public-sans-semibold text-xxs",
    labelPadding: "px-1",
    radius: "rounded",
  },
};

type BadgeCommonProps = {
  readonly type?: BadgeType;
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
  readonly accessibilityLabel?: string;
};

// A rounded or pill badge: a label, a leading dot and slots for an `Icon`, which takes the
// size and text color of the badge.
type BadgeTextProps = BadgeCommonProps & {
  readonly shape?: "rounded" | "pill";
  readonly label?: string;
  readonly dot?: boolean;
  readonly leadingIcon?: ReactNode;
  readonly trailingIcon?: ReactNode;
};

// A circle badge holds a count only.
type BadgeCircleProps = BadgeCommonProps & {
  readonly shape: "circle";
  readonly label?: string;
  readonly dot?: never;
  readonly leadingIcon?: never;
  readonly trailingIcon?: never;
};

// A dot badge holds nothing: it is a bare status mark.
type BadgeDotProps = BadgeCommonProps & {
  readonly shape: "dot";
  readonly label?: never;
  readonly dot?: never;
  readonly leadingIcon?: never;
  readonly trailingIcon?: never;
};

export type BadgeProps = BadgeTextProps | BadgeCircleProps | BadgeDotProps;

export const Badge: FC<BadgeProps> = ({
  label,
  type = "primary",
  variant = "filled-solid",
  size = "m",
  shape = "rounded",
  dot = false,
  leadingIcon,
  trailingIcon,
  accessibilityLabel,
}) => {
  const look = LOOKS[variant][type];
  const sizeClasses = SIZE_CLASSES[size];
  const iconDefaults = useMemo(
    () => ({ className: look.text, size: sizeClasses.iconSize }),
    [look.text, sizeClasses.iconSize],
  );

  if (shape === "dot") {
    // A bare dot has no text, so it is decorative unless it is given a label.
    const a11yProps =
      accessibilityLabel === undefined
        ? {
            accessibilityElementsHidden: true,
            accessible: false,
            importantForAccessibility: "no-hide-descendants" as const,
          }
        : {
            accessibilityLabel,
            accessibilityRole: "text" as const,
            accessible: true,
          };

    return (
      <View
        {...a11yProps}
        className={cn("rounded-full", look.surface, sizeClasses.dot)}
        testID="badge"
      />
    );
  }

  const isCircle = shape === "circle";
  const containerClassName = cn(
    "flex-row items-center justify-center self-start overflow-hidden",
    look.surface,
    shape === "rounded" ? sizeClasses.radius : "rounded-full",
    isCircle ? sizeClasses.circle : sizeClasses.box,
  );
  const labelClassName = cn(
    sizeClasses.label,
    look.text,
    sizeClasses.labelPadding,
  );

  // Without a name the badge is not a focusable stop, so an icon inside keeps its own label.
  const name = accessibilityLabel ?? label;
  const a11yProps =
    name === undefined
      ? {}
      : {
          accessibilityLabel: name,
          accessibilityRole: "text" as const,
          accessible: true,
        };

  return (
    <View {...a11yProps} className={containerClassName} testID="badge">
      <IconDefaultsProvider value={iconDefaults}>
        {dot && !isCircle ? <Icon name="dot" /> : null}
        {isCircle ? null : leadingIcon}
        {label === undefined ? null : (
          <Text className={labelClassName} testID="badge-label">
            {label}
          </Text>
        )}
        {isCircle ? null : trailingIcon}
      </IconDefaultsProvider>
    </View>
  );
};
