import { contrastRatio } from "./contrast";
import { colors } from "./tokens/colors";

const { surface, text } = colors;

// The top edge of Filled Default buttons carries a white sheen of 15%, the lightest point.
const withSheen = (hex: string): string => {
  const blend = (offset: number) =>
    Math.round(
      Number.parseInt(hex.slice(offset, offset + 2), 16) * 0.85 + 255 * 0.15,
    )
      .toString(16)
      .padStart(2, "0");
  return `#${blend(1)}${blend(3)}${blend(5)}`;
};

type Pair = {
  readonly name: string;
  readonly text: string;
  readonly background: string;
};

// Text and background token pairs of the Button, from Figma "Buttons" (light mode).
// Link buttons have no fill, so their text sits on the white screen.
// Disabled controls are exempt from contrast and use the Default pairs at 60% opacity.
const BUTTON_PAIRS: readonly Pair[] = [
  // Filled. Primary Default is a gradient from brand-700 to brand-500: both ends are measured.
  {
    background: colors.brand[700],
    name: "Filled Primary Default (gradient start)",
    text: text.brand["on-solid-background"],
  },
  {
    background: colors.brand[500],
    name: "Filled Primary Default (gradient end)",
    text: text.brand["on-solid-background"],
  },
  {
    background: withSheen(colors.brand[700]),
    name: "Filled Primary Default (gradient start, top sheen)",
    text: text.brand["on-solid-background"],
  },
  {
    background: withSheen(colors.brand[500]),
    name: "Filled Primary Default (gradient end, top sheen)",
    text: text.brand["on-solid-background"],
  },
  {
    background: surface.brand.solid_hover,
    name: "Filled Primary Hover",
    text: text.brand["on-solid-background"],
  },
  {
    background: surface.brand.solid,
    name: "Filled Primary Focus",
    text: text.brand["on-solid-background"],
  },
  {
    background: surface.brand.soft,
    name: "Filled Secondary Default",
    text: text.brand.solid,
  },
  {
    background: surface.brand.light,
    name: "Filled Secondary Hover",
    text: text.brand.solid_hover,
  },
  {
    background: surface.brand.soft,
    name: "Filled Secondary Focus",
    text: text.brand.solid,
  },
  {
    background: surface.gray.soft,
    name: "Filled Tertiary Default",
    text: text.gray.solid,
  },
  {
    background: surface.gray.light,
    name: "Filled Tertiary Hover",
    text: text.gray.solid_hover,
  },
  {
    background: surface.gray.soft,
    name: "Filled Tertiary Focus",
    text: text.gray.solid,
  },
  {
    background: surface.error.solid,
    name: "Filled Danger Default",
    text: text.error["on-solid-background"],
  },
  {
    background: withSheen(surface.error.solid),
    name: "Filled Danger Default (top sheen)",
    text: text.error["on-solid-background"],
  },
  {
    background: surface.error.solid_hover,
    name: "Filled Danger Hover",
    text: text.error["on-solid-background"],
  },
  {
    background: surface.error.solid,
    name: "Filled Danger Focus",
    text: text.error["on-solid-background"],
  },
  // Outlined
  {
    background: surface.brand.elevated,
    name: "Outlined Primary Default",
    text: text.brand.solid,
  },
  {
    background: surface.brand.soft,
    name: "Outlined Primary Hover",
    text: text.brand.solid_hover,
  },
  {
    background: surface.brand.elevated,
    name: "Outlined Primary Focus",
    text: text.brand.solid,
  },
  {
    background: surface.brand.elevated,
    name: "Outlined Secondary Default",
    text: text.brand.solid,
  },
  {
    background: surface.brand.soft,
    name: "Outlined Secondary Hover",
    text: text.brand.solid_hover,
  },
  {
    background: surface.brand.elevated,
    name: "Outlined Secondary Focus",
    text: text.brand.solid,
  },
  {
    background: surface.gray["elevated-l1"],
    name: "Outlined Tertiary Default",
    text: text.gray.solid,
  },
  {
    background: surface.gray.light,
    name: "Outlined Tertiary Hover",
    text: text.gray.solid_hover,
  },
  {
    background: surface.gray["elevated-l1"],
    name: "Outlined Tertiary Focus",
    text: text.gray.solid,
  },
  {
    background: surface.brand.elevated,
    name: "Outlined Danger Default",
    text: text.error.solid,
  },
  {
    background: surface.error.soft,
    name: "Outlined Danger Hover",
    text: text.error.solid_hover,
  },
  {
    background: surface.brand.elevated,
    name: "Outlined Danger Focus",
    text: text.error.solid,
  },
  // Link, on the white screen
  {
    background: colors.white,
    name: "Link Primary Default",
    text: text.brand.solid,
  },
  {
    background: colors.white,
    name: "Link Primary Hover",
    text: text.brand.solid_hover,
  },
  {
    background: colors.white,
    name: "Link Secondary Default",
    text: text.brand.solid,
  },
  {
    background: colors.white,
    name: "Link Secondary Hover",
    text: text.brand.solid_hover,
  },
  {
    background: colors.white,
    name: "Link Tertiary Default",
    text: text.gray.solid,
  },
  {
    background: colors.white,
    name: "Link Tertiary Hover",
    text: text.gray.solid_hover,
  },
  {
    background: colors.white,
    name: "Link Danger Default",
    text: text.error.solid,
  },
  {
    background: colors.white,
    name: "Link Danger Hover",
    text: text.error.solid_hover,
  },
];

const MINIMUM = 4.5;

describe("Button contrast", () => {
  const measured = BUTTON_PAIRS.map((pair) => ({
    name: pair.name,
    ratio: contrastRatio(pair.text, pair.background),
  }));

  it("reports a ratio for every pair", () => {
    expect(measured).toHaveLength(BUTTON_PAIRS.length);
    for (const { ratio } of measured) {
      expect(Number.isFinite(ratio)).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(1);
    }
  });

  it("lists the pairs below 4.5:1 for the Button spec", () => {
    const failing = measured
      .filter(({ ratio }) => ratio < MINIMUM)
      .map(({ name, ratio }) => `${name}: ${ratio.toFixed(2)}`);
    // Update "Accessibility exceptions" in openspec/specs/components/ui-kit/button/spec.md
    // when this list changes.
    expect(failing).toEqual([
      "Filled Primary Default (gradient end): 4.09",
      "Filled Primary Default (gradient end, top sheen): 3.19",
    ]);
  });
});
