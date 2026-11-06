import {
  type FC,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AccessibilityInfo,
  Animated,
  Easing,
  type LayoutChangeEvent,
  Platform,
  Pressable,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { cn } from "../cn";
import { Icon } from "../Icon/Icon";
import { IconDefaultsProvider } from "../Icon/IconDefaults";
import {
  EDGE_LABEL_LEFT,
  EDGE_LABEL_PADDING,
  FIELD_PADDING,
  FLOATING_LABEL_PX,
  HELPER_CLASSES,
  INSIDE_TEXT_SHIFT,
  LABEL_MOVE_MS,
  RING_CLASSES,
  SIZES,
  type TextFieldSize,
  type TextFieldVariant,
  TONES,
  toneOf,
  VALUE_CLASSES,
} from "./textFieldStyles";
import { useReduceMotion } from "./useReduceMotion";

export type { TextFieldSize, TextFieldVariant } from "./textFieldStyles";

// Field heights in px, from Figma: the label-above and label-on-edge styles, then label-inside.
const FIELD_HEIGHTS: Readonly<
  Record<TextFieldSize, { readonly field: number; readonly inside: number }>
> = {
  l: { field: 44, inside: 56 },
  m: { field: 36, inside: 48 },
  s: { field: 30, inside: 40 },
};

// The smallest touch target of `code-practices/accessibility`: 44 pt on iOS and 48 dp on Android.
const MIN_TARGET = Platform.select({ android: 48, default: 44 });

// The extra touch area above and below a field, so the area reaches the minimum.
export const hitSlopFor = (height: number, minimum: number): number =>
  Math.max(0, Math.ceil((minimum - height) / 2));

// iOS draws a text input's text at the bottom of its line box when the line height is set, so
// the text sits below the middle of the field. The field's height sets the layout instead.
const NO_LINE_HEIGHT = { lineHeight: undefined } as const;

// The field border is 1 px, and the text starts 12 px in from it unless an icon comes first.
const BORDER = 1;
const DEFAULT_TEXT_X = BORDER + 12;

// Where a floating label ends up, relative to where it sits in the field. The label keeps its
// place in the field's text until it moves: on the edge style it goes up to the top border
// and left to 10 px from the field, and in the label-inside style it goes up above the text,
// which moves down to make room.
export const labelTarget = (input: {
  readonly variant: TextFieldVariant;
  readonly size: TextFieldSize;
  readonly fieldHeight: number;
  readonly labelLeft: number;
}): {
  readonly x: number;
  readonly y: number;
  readonly scale: number;
  readonly drop: number;
} => {
  const look = SIZES[input.size];
  const scale = FLOATING_LABEL_PX / look.textPx;
  if (input.variant === "label-on-edge") {
    return {
      drop: 0,
      scale,
      x: EDGE_LABEL_LEFT - input.labelLeft,
      y: -input.fieldHeight / 2,
    };
  }
  if (input.variant === "label-inside") {
    return { drop: INSIDE_TEXT_SHIFT, scale, x: 0, y: -look.line / 2 };
  }
  return { drop: 0, scale: 1, x: 0, y: 0 };
};

export type TextFieldProps = Omit<
  TextInputProps,
  "className" | "editable" | "onChangeText" | "style" | "value"
> & {
  readonly label: string;
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly variant?: TextFieldVariant;
  readonly size?: TextFieldSize;
  readonly required?: boolean;
  readonly disabled?: boolean;
  // A message puts the field in the Alert look and replaces the helper text.
  readonly error?: string;
  readonly helperText?: string;
  // Shows `length / maxLength` on the helper line. It needs `maxLength`.
  readonly counter?: boolean;
  readonly leadingIcon?: ReactNode;
  readonly trailingElement?: ReactNode;
};

export const TextField: FC<TextFieldProps> = ({
  label,
  value,
  onChangeText,
  variant = "label-above",
  size = "m",
  required = false,
  disabled = false,
  error,
  helperText,
  counter = false,
  leadingIcon,
  trailingElement,
  placeholder,
  maxLength,
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [textX, setTextX] = useState(DEFAULT_TEXT_X);
  const reduceMotion = useReduceMotion();

  const hasError = error !== undefined && error !== "";
  const filled = value !== "";
  const hasPlaceholder = placeholder !== undefined && placeholder !== "";
  const tone = TONES[toneOf({ disabled, error: hasError, focused })];
  const look = SIZES[size];
  const inside = variant === "label-inside";
  const edge = variant === "label-on-edge";

  // The label above the field never moves. The other two styles show it in the place of the
  // text until the field is focused, filled or has a placeholder, then move it.
  const floated = focused || filled || hasPlaceholder;
  const labelText = required ? `${label}*` : label;

  // 0 while the label sits in the field, 1 once it has moved. It starts where the label belongs,
  // so a field that is already filled does not animate on mount.
  const [progress] = useState(() => new Animated.Value(floated ? 1 : 0));
  useEffect(() => {
    Animated.timing(progress, {
      duration: reduceMotion ? 0 : LABEL_MOVE_MS,
      easing: Easing.out(Easing.quad),
      toValue: floated ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [floated, progress, reduceMotion]);

  // A field disabled while focused may never get a blur event, so it would come back focused.
  useEffect(() => {
    if (disabled) {
      setFocused(false);
    }
  }, [disabled]);

  // Announce an error when it appears, not when the field mounts with one or when its text changes.
  const hadError = useRef(hasError);
  useEffect(() => {
    if (hasError && !hadError.current && error !== undefined) {
      AccessibilityInfo.announceForAccessibility(error);
    }
    hadError.current = hasError;
  }, [hasError, error]);

  const iconDefaults = useMemo(
    () => ({ className: "text-text-default-body", size: look.icon }),
    [look.icon],
  );

  const heights = FIELD_HEIGHTS[size];
  const fieldHeight = inside ? heights.inside : heights.field;
  const slop = hitSlopFor(fieldHeight, MIN_TARGET);

  // A label on the edge keeps its 2 px of padding, so its text lines up with the field's text.
  const labelLeft = edge ? textX - EDGE_LABEL_PADDING : textX;
  const target = labelTarget({ fieldHeight, labelLeft, size, variant });
  const toward = (end: number) =>
    progress.interpolate({ inputRange: [0, 1], outputRange: [0, end] });
  const labelScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, target.scale],
  });

  const counterText =
    counter && maxLength !== undefined
      ? `${value.length} / ${maxLength}`
      : null;
  const message = hasError ? error : helperText;

  return (
    <View testID="text-field">
      {variant === "label-above" ? (
        <View className={cn("h-4 justify-center px-0.5", look.labelGap)}>
          <Text
            className={cn("font-public-sans-regular", look.text, tone.label)}
            testID="text-field-label"
          >
            {labelText}
          </Text>
        </View>
      ) : null}
      <Pressable
        accessible={false}
        disabled={disabled}
        hitSlop={{ bottom: slop, top: slop }}
        onPress={() => inputRef.current?.focus()}
        testID="text-field-press"
      >
        <View
          className={cn(
            "flex-row items-center rounded-xl border",
            inside ? "gap-3" : "gap-2",
            inside ? look.heightInside : look.height,
            FIELD_PADDING,
            tone.field,
          )}
          testID="text-field-field"
        >
          <IconDefaultsProvider value={iconDefaults}>
            {leadingIcon}
          </IconDefaultsProvider>
          <View
            className="flex-1 justify-center"
            onLayout={(event: LayoutChangeEvent) =>
              setTextX(BORDER + event.nativeEvent.layout.x)
            }
          >
            <Animated.View
              style={{ transform: [{ translateY: toward(target.drop) }] }}
            >
              <TextInput
                {...inputProps}
                accessibilityHint={hasError ? error : undefined}
                accessibilityLabel={required ? `${label}, required` : label}
                accessibilityState={{ disabled }}
                className={cn("p-0", look.text, VALUE_CLASSES, tone.caret)}
                editable={!disabled}
                maxLength={maxLength}
                onBlur={(event) => {
                  setFocused(false);
                  onBlur?.(event);
                }}
                onChangeText={onChangeText}
                onFocus={(event) => {
                  setFocused(true);
                  onFocus?.(event);
                }}
                placeholder={placeholder}
                ref={inputRef}
                style={NO_LINE_HEIGHT}
                testID="text-field-input"
                value={value}
              />
            </Animated.View>
          </View>
          {hasError ? (
            <Icon
              className="text-text-error-solid"
              name="exclamation-circle"
              size={look.errorIcon}
            />
          ) : null}
          <IconDefaultsProvider value={iconDefaults}>
            {trailingElement}
          </IconDefaultsProvider>
        </View>
        {tone.ring === null ? null : (
          <View
            className={cn(RING_CLASSES, tone.ring)}
            testID="text-field-ring"
          />
        )}
        {variant === "label-above" ? null : (
          <View
            accessibilityElementsHidden
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 justify-center",
              disabled && "opacity-50",
              inside ? look.heightInside : look.height,
            )}
            importantForAccessibility="no-hide-descendants"
          >
            <Animated.View
              style={{
                marginLeft: labelLeft,
                transform: [
                  { translateX: toward(target.x) },
                  { translateY: toward(target.y) },
                  { scale: labelScale },
                ],
                transformOrigin: "left center",
              }}
              testID="text-field-label-move"
            >
              <Text
                className={cn(
                  "font-public-sans-regular self-start",
                  look.text,
                  floated ? tone.label : "text-text-default-placeholder",
                  edge && "px-0.5",
                  edge && floated && tone.strip,
                )}
                numberOfLines={1}
                testID="text-field-label"
              >
                {labelText}
              </Text>
            </Animated.View>
          </View>
        )}
      </Pressable>
      {message !== undefined || counterText !== null ? (
        <View className="mt-0.5 flex-row items-center justify-end gap-2">
          <Text
            className={cn("flex-1", HELPER_CLASSES, tone.helper)}
            testID="text-field-helper"
          >
            {message}
          </Text>
          {counterText === null ? null : (
            <Text
              className={cn("shrink-0 text-right", HELPER_CLASSES, tone.helper)}
              testID="text-field-counter"
            >
              {counterText}
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};
