// Figma Tabs, Size x State. Classes are written out in full so Tailwind finds them.

export type TabsSize = "m" | "l";
export type TabsLayout = "content" | "equal";

type SizeLook = {
  // Padding of the bar around the tabs, and the corner radius of the bar.
  readonly bar: string;
  readonly barRadius: string;
  // Height and horizontal padding of a tab. Figma's 8 px vertical padding is left out: with a
  // fixed height it only crops the content, which already fits.
  readonly tab: string;
  // Height of a tab in px, which its touch area is padded from.
  readonly tabHeight: number;
};

// Figma sizes M and L: bars of 44 and 56 px with tabs of 36 and 44 px.
export const SIZES: Readonly<Record<TabsSize, SizeLook>> = {
  l: {
    bar: "p-1.5",
    barRadius: "rounded-xl-2",
    tab: "h-11 px-4",
    tabHeight: 44,
  },
  m: {
    bar: "p-1",
    barRadius: "rounded-xl",
    tab: "h-9 px-3",
    tabHeight: 36,
  },
};

// The size in px of the icons of every tab.
export const TAB_ICON_PX = 24;

type TabLook = {
  // Fill of the tab, and the shadow of the Active tab.
  readonly fill: string;
  // The stroke, drawn on its own layer above the fill so a tab keeps its size.
  readonly edge: string;
  // Text color of the label and the icons.
  readonly text: string;
};

export type TabState = "default" | "pressed" | "focused" | "active";

// Figma Default, Hover, Focus and Active. Pressed is Hover, because touch has no hover.
// The state is tracked in `Tab` and the classes are fixed per state: NativeWind loses the press
// state of a mounted tab when pseudo-classes such as `active:` come and go with the selection.
// Figma Active keeps its look while pressed or focused.
// Every look sets a shadow. `shadow-2` sets CSS variables, and NativeWind remounts a component
// that gains variables after its first render and then logs its props, which crashes the app.
// `shadow-none` sets the same variables from the first render.
export const LOOKS: Readonly<Record<TabState, TabLook>> = {
  active: {
    edge: "border border-alpha-dark-10",
    fill: "bg-surface-default-main shadow-2",
    text: "text-text-gray-on-soft-background",
  },
  default: {
    edge: "",
    fill: "shadow-none",
    text: "text-text-gray-on-soft-background",
  },
  focused: {
    edge: "border-2 border-stroke-brand-strong",
    fill: "bg-surface-gray-soft shadow-none",
    text: "text-text-default-body",
  },
  pressed: {
    edge: "",
    fill: "bg-surface-gray-light shadow-none",
    text: "text-text-default-body",
  },
};

// The bar. Its stroke is a layer above the tabs, so the bar keeps the height of its tabs.
export const BAR_FILL = "bg-alpha-dark-5";
export const BAR_EDGE = "border border-alpha-dark-10";

export const LABEL = "font-public-sans-semibold text-base";
