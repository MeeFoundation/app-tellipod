// Figma Breadcrumbs, Size x Style, and Breadcrumb, Link x State x Size.
// Classes are written out in full so Tailwind finds them.

export type BreadcrumbsSize = "s" | "m" | "l";
export type BreadcrumbsVariant = "simple" | "outlined";

type SizeLook = {
  // Height, gap and padding of an item. The padding at the end leaves room after the chevron.
  readonly item: string;
  // Font size and line height of the label.
  readonly label: string;
  // Where the Hover underline sits, from the bottom of the label.
  readonly underline: string;
  // Sizes in px of the leading icon and of the chevron.
  readonly iconPx: number;
  readonly chevronPx: number;
  // Height of an item in px, which its touch area is padded from.
  readonly itemHeight: number;
  // Horizontal padding of the outlined box, as a class and in px.
  readonly box: string;
  readonly boxPx: number;
};

// Figma sizes S, M and L: items of 16, 20 and 24 px.
export const SIZES: Readonly<Record<BreadcrumbsSize, SizeLook>> = {
  l: {
    box: "px-2.5",
    boxPx: 10,
    chevronPx: 14,
    iconPx: 20,
    item: "h-6 gap-2 pl-0.5 pr-1.5",
    itemHeight: 24,
    label: "text-base",
    underline: "bottom-0.75",
  },
  m: {
    box: "px-2",
    boxPx: 8,
    chevronPx: 12,
    iconPx: 16,
    item: "h-5 gap-1.5 pl-0.5 pr-1",
    itemHeight: 20,
    label: "text-sm",
    underline: "bottom-0.5",
  },
  s: {
    box: "px-1.5",
    boxPx: 6,
    chevronPx: 10,
    iconPx: 14,
    item: "h-4 gap-1 px-0.5",
    itemHeight: 16,
    label: "text-xs",
    underline: "bottom-px",
  },
};

// The line. `simple` has no box, and `outlined` has a pale box with a thin border.
// Both are as wide as their items and no wider than the parent.
export const LINE = "self-start max-w-full";
export const VARIANTS: Readonly<Record<BreadcrumbsVariant, string>> = {
  outlined:
    "overflow-hidden rounded-md border border-stroke-gray-light bg-surface-gray-soft py-1",
  simple: "",
};

export const LABEL = "font-public-sans-regular";

export type ItemState = "default" | "pressed" | "focused" | "disabled" | "text";

type ItemLook = {
  // Fill, radius and opacity of the item.
  readonly item: string;
  // Text color of the label, the house and the chevron.
  readonly text: string;
  readonly underline: boolean;
};

// Figma Default, Hover, Focus and Disabled links, and the plain text. Pressed is Hover, because
// touch has no hover. The state is tracked in `Breadcrumb` and the classes are fixed per state.
export const LOOKS: Readonly<Record<ItemState, ItemLook>> = {
  default: {
    item: "",
    text: "text-text-brand-solid",
    underline: false,
  },
  disabled: {
    item: "opacity-60",
    text: "text-text-gray-solid",
    underline: false,
  },
  focused: {
    item: "bg-surface-brand-light",
    text: "text-text-brand-solid_hover",
    underline: false,
  },
  pressed: {
    item: "",
    text: "text-text-brand-solid_hover",
    underline: true,
  },
  text: {
    item: "",
    text: "text-text-gray-solid",
    underline: false,
  },
};
