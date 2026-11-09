import { colors } from "../../tailwind/tokens/colors";

type Tree = { readonly [key: string]: string | Tree };

export type ColorEntry = readonly [name: string, value: string];

// Every leaf of a color tree as its dotted token name and its value, in definition order.
export const flattenColors = (
  tree: Tree,
  prefix: string = "",
): readonly ColorEntry[] =>
  Object.entries(tree).flatMap(([key, node]) => {
    const name = prefix === "" ? key : `${prefix}.${key}`;
    return typeof node === "string"
      ? [[name, node]]
      : flattenColors(node, name);
  });

// The top-level token groups each story shows. Together they cover every group in `colors`.
export const STORY_GROUPS = {
  Overlays: ["outline", "alpha"],
  Palette: [
    "brand",
    "gray",
    "error",
    "success",
    "warning",
    "black",
    "white",
    "transparent",
  ],
  Stroke: ["stroke"],
  Surface: ["surface"],
  Text: ["text"],
} as const satisfies Record<string, readonly (keyof typeof colors)[]>;

// The swatches of one top-level group, such as `surface`, with their full token names.
export const groupEntries = (
  group: keyof typeof colors,
): readonly ColorEntry[] => {
  const node = colors[group];
  return typeof node === "string"
    ? [[group, node]]
    : flattenColors(node, group);
};

// Whether a color lets the page show through: `transparent`, or an `rgba` with alpha below 1.
export const isTranslucent = (value: string): boolean => {
  if (value === "transparent") return true;
  const alpha = /^rgba\(.*,\s*([\d.]+)\s*\)$/.exec(value)?.[1];
  return alpha !== undefined && Number(alpha) < 1;
};
