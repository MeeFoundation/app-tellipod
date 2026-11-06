// Figma Text Field, input part: Style x Size x State. Classes are written out in full so Tailwind finds them.

export type TextFieldVariant = "label-above" | "label-on-edge" | "label-inside";
export type TextFieldSize = "s" | "m" | "l";

// The look the field takes. Alert is `error`, and a focused field shows the focus ring.
export type TextFieldTone =
  | "default"
  | "focus"
  | "error"
  | "error-focus"
  | "disabled";

export const toneOf = (state: {
  readonly disabled: boolean;
  readonly error: boolean;
  readonly focused: boolean;
}): TextFieldTone => {
  if (state.disabled) {
    return "disabled";
  }
  if (state.error) {
    return state.focused ? "error-focus" : "error";
  }
  return state.focused ? "focus" : "default";
};

type SizeLook = {
  // Height of the field in the label-above and label-on-edge styles, then in label-inside.
  readonly height: string;
  readonly heightInside: string;
  // Line height of the text in px, which the label moves by in the label-inside style.
  readonly line: number;
  // Size of the text in px, which a floating label shrinks from to FLOATING_LABEL_PX.
  readonly textPx: number;
  // Size of the text in the field and of the label above the field.
  readonly text: string;
  // Space between the label above the field and the field.
  readonly labelGap: string;
  // Size of the leading icon and of the error icon, in px.
  readonly icon: number;
  readonly errorIcon: number;
};

// Figma sizes S, M and L: fields of 30, 36 and 44 px, and 40, 48 and 56 px with the label inside.
export const SIZES: Readonly<Record<TextFieldSize, SizeLook>> = {
  l: {
    errorIcon: 20,
    height: "h-11",
    heightInside: "h-14",
    icon: 20,
    labelGap: "mb-2",
    line: 24,
    text: "text-base",
    textPx: 16,
  },
  m: {
    errorIcon: 14,
    height: "h-9",
    heightInside: "h-12",
    icon: 16,
    labelGap: "mb-1.5",
    line: 20,
    text: "text-sm",
    textPx: 14,
  },
  s: {
    errorIcon: 14,
    height: "h-7.5",
    heightInside: "h-10",
    icon: 14,
    labelGap: "mb-0.5",
    line: 16,
    text: "text-xs",
    textPx: 12,
  },
};

type ToneLook = {
  // Fill and stroke of the field.
  readonly field: string;
  // The focus ring drawn outside the field, or null while the field is not focused.
  readonly ring: string | null;
  // Color of the label, whether above, on the edge or inside.
  readonly label: string;
  // Color of the helper text, the error message and the counter.
  readonly helper: string;
  // Color of the caret.
  readonly caret: string;
  // Fill behind a label that sits on the border, so the border does not run through the text.
  readonly strip: string;
};

export const TONES: Readonly<Record<TextFieldTone, ToneLook>> = {
  default: {
    caret: "caret-text-brand-solid",
    field: "border-stroke-gray-accent bg-surface-default-main",
    helper: "text-text-default-subtle",
    label: "text-text-default-body",
    ring: null,
    strip: "bg-surface-default-main",
  },
  disabled: {
    caret: "caret-text-brand-solid",
    field: "border-stroke-gray-accent bg-surface-gray-light opacity-50",
    helper: "text-text-default-subtle",
    label: "text-text-default-body",
    ring: null,
    strip: "bg-surface-gray-light",
  },
  error: {
    caret: "caret-text-error-solid",
    field: "border-stroke-error-solid bg-surface-default-main",
    helper: "text-text-error-solid",
    label: "text-text-error-solid",
    ring: null,
    strip: "bg-surface-default-main",
  },
  "error-focus": {
    caret: "caret-text-error-solid",
    field: "border-stroke-error-solid bg-surface-default-main",
    helper: "text-text-error-solid",
    label: "text-text-error-solid",
    ring: "border-outline-error",
    strip: "bg-surface-default-main",
  },
  focus: {
    caret: "caret-text-brand-solid",
    field: "border-stroke-brand-solid bg-surface-default-main",
    helper: "text-text-default-subtle",
    label: "text-text-brand-solid",
    ring: "border-outline-brand",
    strip: "bg-surface-default-main",
  },
};

// The text of the field and of its placeholder.
export const VALUE_CLASSES =
  "font-public-sans-regular text-text-default-body placeholder:text-text-default-placeholder";

// Helper text, error message and counter are 12 px at every size.
export const HELPER_CLASSES = "font-public-sans-regular text-xs";

// Horizontal padding of every field, in the label-above and the other two styles.
export const FIELD_PADDING = "px-3";

// A label that floats, on the edge or inside the field, is 12 px at every size.
export const FLOATING_LABEL_PX = 12;

// How far the text moves down to make room for a label inside the field, in px.
export const INSIDE_TEXT_SHIFT = 8;

// Figma gives the label no motion, so the move is a short ease-out.
export const LABEL_MOVE_MS = 150;

// Where a label on the edge rests: 10 px from the left of the field, plus 2 px of padding.
export const EDGE_LABEL_LEFT = 10;
export const EDGE_LABEL_PADDING = 2;

// The focus ring is a 3 px border around the field. NativeWind turns `shadow-outline-*` into a
// blurred iOS shadow that Android ignores, so a spread-only ring cannot be drawn with a shadow.
export const RING_CLASSES =
  "pointer-events-none absolute -inset-0.75 rounded-2xl border-3";
