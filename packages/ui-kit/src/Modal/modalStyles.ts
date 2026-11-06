// Figma Modal. Classes are written out in full so Tailwind finds them.

// The sheet: the fill, the rounded top corners and the upward shadow.
export const SHEET = "bg-surface-default-main rounded-t-3xl shadow-sheet";

// The strip that holds the grabber, 16 px high with the pill 5 px from the top.
export const GRABBER_STRIP = "h-4 w-full items-center pt-1.25";
export const GRABBER = "h-1 w-15 rounded-full bg-surface-gray-accent";

// The header under the grabber: 16 px at the sides and 8 px above and below.
export const HEADER = "w-full px-4 py-2";
export const TITLE_ROW = "flex-row items-center gap-2";
export const TITLE =
  "flex-1 font-public-sans-medium text-xl text-text-default-title";
export const SUBTITLE =
  "font-public-sans-regular text-sm text-text-default-subtle";

// The body: 16 px on all sides, then 8 px before the bottom safe area.
export const BODY = "p-4";
export const BODY_END = "h-2";

// The gap, in px, between the top safe area and a tall sheet. It is Figma spacing/4.
export const TOP_GAP = 16;

// The backdrop: a blur of what is behind the sheet, over the `alpha/always/dark/80` fill.
// Figma asks for a 10 px blur. `BlurView` has an intensity from 0 to 100 and no pixel radius, so
// the value is matched by eye on iOS and Android.
export const BACKDROP_BLUR_INTENSITY = 10;
