import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import type { FC } from "react";
import { Pressable, Text, View } from "react-native";

import { cn } from "../cn";

const StyledGradient = cssInterop(LinearGradient, { className: "style" });

export type ButtonSize = "s" | "m" | "l" | "xxl";
export type ButtonType = "primary" | "secondary" | "tertiary" | "danger";

type SizeClasses = {
  readonly boxed: string;
  readonly link: string;
  readonly radius: string;
  readonly label: string;
};

// Figma sizes S, M, L and XXL: heights 30, 36, 44 and 56.
const SIZE_CLASSES: Readonly<Record<ButtonSize, SizeClasses>> = {
  l: {
    boxed: "h-11 px-4",
    label: "font-public-sans-semibold text-base",
    link: "h-11 px-1.5",
    radius: "rounded-xl",
  },
  m: {
    boxed: "h-9 px-3.5",
    label: "font-public-sans-semibold text-sm",
    link: "h-9 px-1",
    radius: "rounded-xl",
  },
  s: {
    boxed: "h-7.5 px-3",
    label: "font-public-sans-semibold text-xs",
    link: "h-7.5 px-1",
    radius: "rounded-xl",
  },
  xxl: {
    boxed: "h-14 px-6",
    label: "font-public-sans-semibold text-xl",
    link: "h-14 px-1.5",
    radius: "rounded-2xl",
  },
};

export type GradientLayer = {
  readonly colors: readonly [string, string];
  readonly start: { readonly x: number; readonly y: number };
  readonly end: { readonly x: number; readonly y: number };
};

// Default, then pressed (Figma Hover) and focused (Figma Focus) looks.
export type ButtonLook = {
  // `ring` stays on the Pressable: the focus ring and the Disabled opacity.
  readonly ring: string;
  // `fill` and `edge` are separate layers, so the stroke is drawn above the gradients.
  readonly fill: string;
  readonly edge: string;
  readonly label: string;
  // Gradients of the Default look, bottom layer first. They hide while pressed or focused.
  readonly gradients: readonly GradientLayer[];
  // Skeuomorphic top highlight of the filled look. It hides while pressed or focused.
  readonly highlight?: boolean;
};

export type ButtonBaseProps = {
  readonly label: string;
  readonly onPress?: () => void;
  readonly size?: ButtonSize;
  readonly disabled?: boolean;
  readonly accessibilityLabel?: string;
};

type Props = ButtonBaseProps & {
  readonly look: ButtonLook;
  readonly compact?: boolean;
};

export const ButtonBase: FC<Props> = ({
  label,
  onPress,
  size = "m",
  disabled = false,
  accessibilityLabel,
  look,
  compact = false,
}) => {
  const sizeClasses = SIZE_CLASSES[size];
  const containerClassName = cn(
    "group flex-row items-center justify-center",
    sizeClasses.radius,
    compact ? sizeClasses.link : sizeClasses.boxed,
    look.ring,
  );

  // Clips the fill, gradients and highlight to the outer radius. The stroke is not clipped.
  const fillClassName = cn(
    "absolute inset-0 overflow-hidden",
    sizeClasses.radius,
    look.fill,
  );

  const hideWhenActiveClassName =
    "absolute inset-0 opacity-100 group-active:opacity-0 group-focus:opacity-0";

  // The stroke sits on top of the fill layers, so nothing shows between it and them.
  const edgeClassName = cn("absolute inset-0", sizeClasses.radius, look.edge);

  const labelClassName = cn(sizeClasses.label, look.label);

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      className={containerClassName}
      disabled={disabled}
      onPress={onPress}
    >
      <View className={fillClassName} pointerEvents="none" testID="button-fill">
        {look.gradients.length > 0 ? (
          <View className={hideWhenActiveClassName}>
            {look.gradients.map((layer) => (
              <StyledGradient
                className="absolute inset-0"
                colors={layer.colors}
                end={layer.end}
                key={[
                  ...layer.colors,
                  layer.start.x,
                  layer.start.y,
                  layer.end.x,
                  layer.end.y,
                ].join()}
                start={layer.start}
              />
            ))}
          </View>
        ) : null}
        {look.highlight ? (
          // Figma button/skeuomorphic/rest: 2px white 25% inside the 1px stroke.
          <View
            className="bg-alpha-always-white-25 absolute inset-x-0 top-px h-0.5 group-focus:opacity-0 group-active:opacity-0"
            testID="button-highlight"
          />
        ) : null}
      </View>
      <View
        className={edgeClassName}
        pointerEvents="none"
        testID="button-edge"
      />
      <Text className={labelClassName}>{label}</Text>
    </Pressable>
  );
};
