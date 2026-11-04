// Source: Figma, Outlines (Border Width, Border Radius, outline-thickness, outline/* effects).

export const borderWidth = {
  0: "0px",
  1: "1px",
  2: "2px",
  // Figma outline-thickness: the width of the focus ring.
  3: "3px",
  4: "4px",
  8: "8px",
  DEFAULT: "1px",
} as const;

export const borderRadius = {
  "2lg": "10px",
  "2xl": "16px",
  "3xl": "28px",
  DEFAULT: "4px",
  full: "9999px",
  lg: "8px",
  md: "6px",
  none: "0px",
  sm: "2px",
  xl: "12px",
  "xl-2": "14px",
} as const;
