import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import { type FC, type ReactNode, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../../tailwind/tokens/colors";
import { cn } from "../cn";
import { useReduceMotion } from "../useReduceMotion";

const StyledGradient = cssInterop(LinearGradient, { className: "style" });

export type AppHeaderTitleSize = "base" | "xl";
export type AppHeaderTitleAlign = "start" | "center";

export type AppHeaderProps = {
  // Left of the title row, such as a back `HeaderIconButton`.
  readonly leading?: ReactNode;
  // Between `leading` and the text, such as an `Avatar`.
  readonly media?: ReactNode;
  // A string gets the design's title look. Any other node is shown as it is.
  readonly title?: ReactNode;
  // A string gets the design's subtitle look. Any other node is shown as it is.
  readonly subtitle?: ReactNode;
  // Right of the title row, such as a kebab `HeaderIconButton`.
  readonly trailing?: ReactNode;
  // `base` is Base/Medium and `xl` is XL/Semi Bold. It applies to a string title only.
  readonly titleSize?: AppHeaderTitleSize;
  // `center` keeps 44 px empty on a side with no `leading` or `trailing`, so the title sits on the
  // center of the header.
  readonly titleAlign?: AppHeaderTitleAlign;
  // The bottom slot, full width below the title row: a `SearchEntry` or `Tabs`.
  readonly children?: ReactNode;
  readonly testID?: string;
};

const TITLE_LOOKS: Readonly<Record<AppHeaderTitleSize, string>> = {
  base: "font-public-sans-medium text-base",
  xl: "font-public-sans-semibold text-xl",
};

// Figma home-topbar: the gradient runs from `surface/brand/light` at the top to
// `surface/default/main` at the bottom.
const GRADIENT_COLORS = [
  colors.surface.brand.light,
  colors.surface.default.main,
] as const;
const GRADIENT_START = { x: 0.5, y: 0 } as const;
const GRADIENT_END = { x: 0.5, y: 1 } as const;

const MOVE_MS = 200;

const isText = (node: ReactNode): node is string | number =>
  typeof node === "string" || typeof node === "number";

const hasContent = (node: ReactNode): boolean =>
  node !== undefined && node !== null && node !== false && node !== "";

type BottomSlotProps = {
  readonly fadeIn: boolean;
  readonly fadeOut: boolean;
  readonly testID: string;
  readonly children: ReactNode;
};

// The bottom slot. It fades in only when it arrives after the header's first render, and reanimated
// reads `entering` at mount, so the choice is made once, when the slot mounts.
const BottomSlot: FC<BottomSlotProps> = ({
  fadeIn,
  fadeOut,
  testID,
  children,
}) => {
  const [entering] = useState(() =>
    fadeIn ? { entering: FadeIn.duration(MOVE_MS) } : {},
  );

  return (
    <Animated.View
      {...entering}
      {...(fadeOut ? { exiting: FadeOut.duration(MOVE_MS) } : {})}
      testID={testID}
    >
      {children}
    </Animated.View>
  );
};

// The top bar of a screen: a rounded card under the status bar with a title row and an optional
// bottom slot. One shell with slots; the Home, Pod and Filter layouts are different content in it.
// It leaves the safe-area top inset free and draws nothing in it, because the device draws the
// status bar. Its height eases when the bottom slot comes or goes, unless the user reduces motion.
export const AppHeader: FC<AppHeaderProps> = ({
  leading,
  media,
  title,
  subtitle,
  trailing,
  titleSize = "base",
  titleAlign = "start",
  children,
  testID = "app-header",
}) => {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReduceMotion();
  // The fade-in belongs to a slot that arrives later, not to the first render.
  // A ref, not state: it flips after the first commit without a second render.
  const settled = useRef(false);
  useEffect(() => {
    settled.current = true;
  }, []);

  const centered = titleAlign === "center";
  const hasText = hasContent(title) || hasContent(subtitle);
  const hasBottom = hasContent(children);

  return (
    <Animated.View
      className="bg-surface-default-main shadow-header rounded-b-3xl"
      {...(reduceMotion ? {} : { layout: LinearTransition.duration(MOVE_MS) })}
      testID={testID}
    >
      <View
        className="border-stroke-default-main overflow-hidden rounded-b-3xl border-b"
        testID={`${testID}-surface`}
      >
        <StyledGradient
          className="absolute inset-0"
          colors={GRADIENT_COLORS}
          end={GRADIENT_END}
          start={GRADIENT_START}
          testID={`${testID}-gradient`}
        />
        <View style={{ height: insets.top }} testID={`${testID}-inset`} />
        <View className="gap-5 px-5 pt-2.5 pb-5">
          <View
            className="min-h-12 flex-row items-center gap-2"
            testID={`${testID}-row`}
          >
            {hasContent(leading) ? leading : null}
            {centered && !hasContent(leading) ? (
              <View className="w-11" testID={`${testID}-balance-start`} />
            ) : null}
            {hasContent(media) ? media : null}
            {hasText ? (
              <View
                className={cn(
                  "min-w-0 flex-1 gap-0.5",
                  centered ? "items-center" : "items-start",
                )}
                testID={`${testID}-text`}
              >
                {isText(title) ? (
                  <Text
                    className={cn(
                      "text-text-default-title",
                      TITLE_LOOKS[titleSize],
                      centered && "text-center",
                    )}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    testID={`${testID}-title`}
                  >
                    {title}
                  </Text>
                ) : hasContent(title) ? (
                  title
                ) : null}
                {isText(subtitle) ? (
                  <Text
                    className={cn(
                      "font-public-sans-regular text-text-default-subtle text-xs",
                      centered && "text-center",
                    )}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    testID={`${testID}-subtitle`}
                  >
                    {subtitle}
                  </Text>
                ) : hasContent(subtitle) ? (
                  subtitle
                ) : null}
              </View>
            ) : (
              <View className="flex-1" />
            )}
            {hasContent(trailing) ? trailing : null}
            {centered && !hasContent(trailing) ? (
              <View className="w-11" testID={`${testID}-balance-end`} />
            ) : null}
          </View>
          {hasBottom ? (
            <BottomSlot
              fadeIn={settled.current && !reduceMotion}
              fadeOut={!reduceMotion}
              testID={`${testID}-bottom`}
            >
              {children}
            </BottomSlot>
          ) : null}
        </View>
      </View>
    </Animated.View>
  );
};
