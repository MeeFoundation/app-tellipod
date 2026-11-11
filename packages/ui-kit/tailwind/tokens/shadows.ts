// Source: Figma, Shadows (effect styles shadow-1 to shadow-5 and the -strong variants).
// Each style has two layers, in the order of the Figma style.

export const boxShadow = {
  "1": "0 1px 1px 0 rgba(2, 6, 23, 0.05), 0 0 2px 0 rgba(2, 6, 23, 0.07)",
  "1-strong": "0 1px 1px 0 rgba(2, 6, 23, 0.1), 0 0 2px 0 rgba(2, 6, 23, 0.15)",
  "2": "0 2px 2px 0 rgba(2, 6, 23, 0.05), 0 0 3px 0 rgba(2, 6, 23, 0.07)",
  "2-strong": "0 2px 2px 0 rgba(2, 6, 23, 0.1), 0 0 3px 0 rgba(2, 6, 23, 0.15)",
  "3": "0 6px 18px -1px rgba(2, 6, 23, 0.05), 0 2px 6px -1px rgba(2, 6, 23, 0.07)",
  "3-strong":
    "0 6px 18px -1px rgba(2, 6, 23, 0.1), 0 2px 6px -1px rgba(2, 6, 23, 0.15)",
  "4": "0 10px 20px -2px rgba(2, 6, 23, 0.05), 0 2px 15px -3px rgba(2, 6, 23, 0.07)",
  "4-strong":
    "0 10px 20px -2px rgba(2, 6, 23, 0.1), 0 2px 15px -3px rgba(2, 6, 23, 0.15)",
  "5": "0 25px 21px -5px rgba(2, 6, 23, 0.05), 0 2px 25px -5px rgba(2, 6, 23, 0.07)",
  "5-strong":
    "0 25px 21px -5px rgba(2, 6, 23, 0.1), 0 2px 25px -5px rgba(2, 6, 23, 0.15)",
  // Figma effect style button/skeuomorphic/rest (inner shadow).
  "button-rest": "inset 0 2px 0 0 rgba(255, 255, 255, 0.25)",
  // Figma effect style Box shadow/1st Level: a 1 px ring at alpha/dark/5 and a 20 px blur at
  // alpha/always/dark/5, the surface of Card-Cell and Card-Category.
  "level-1":
    "0 0 0 1px rgba(2, 6, 23, 0.05), 0 1px 20px 1px rgba(2, 6, 23, 0.05)",
  none: "none",
  // Figma effect styles outline/*, the focus ring. NativeWind has no ring utilities, so it is a shadow.
  "outline-brand": "0 0 0 3px rgba(79, 134, 142, 0.4)",
  "outline-dark": "0 0 0 3px rgba(2, 6, 23, 0.25)",
  "outline-error": "0 0 0 3px rgba(239, 68, 68, 0.4)",
  "outline-gray": "0 0 0 3px rgba(100, 116, 139, 0.4)",
  "outline-success": "0 0 0 3px rgba(102, 142, 79, 0.4)",
  "outline-warning": "0 0 0 3px rgba(237, 149, 19, 0.4)",
  "outline-white": "0 0 0 3px rgba(255, 255, 255, 0.25)",
  // Figma Modal: the shadow cast upward by a bottom sheet, alpha/always/dark/10 at 30 px blur.
  sheet: "0 -1px 30px 0 rgba(2, 6, 23, 0.1)",
} as const;
