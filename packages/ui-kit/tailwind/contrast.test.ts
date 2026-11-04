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

// Text and background token pairs of the Badge, from Figma "Badge" (light mode).
// Outlined badges have no fill, so their text sits on the white screen.
const BADGE_GROUPS = ["brand", "gray", "success", "error", "warning"] as const;

const BADGE_PAIRS: readonly Pair[] = BADGE_GROUPS.flatMap((group) => [
  {
    background: surface[group].solid,
    name: `Filled - solid ${group}`,
    text: text[group]["on-solid-background"],
  },
  {
    background: surface[group].soft,
    name: `Filled - light ${group}`,
    text: text[group].solid,
  },
  {
    background: colors.white,
    name: `Outlined - light ${group}`,
    text: text[group].solid,
  },
]);

describe("Badge contrast", () => {
  const measured = BADGE_PAIRS.map((pair) => ({
    name: pair.name,
    ratio: contrastRatio(pair.text, pair.background),
  }));

  it("reports a ratio for every pair", () => {
    expect(measured).toHaveLength(BADGE_PAIRS.length);
    for (const { ratio } of measured) {
      expect(Number.isFinite(ratio)).toBe(true);
      expect(ratio).toBeGreaterThanOrEqual(1);
    }
  });

  it("lists the pairs below 4.5:1 for the Badge spec", () => {
    const failing = measured
      .filter(({ ratio }) => ratio < MINIMUM)
      .map(({ name, ratio }) => `${name}: ${ratio.toFixed(2)}`);
    // Update "Accessibility exceptions" in openspec/specs/components/ui-kit/badge/spec.md
    // when this list changes.
    expect(failing).toEqual([]);
  });
});

// Text and background pairs of the TextField, from Figma "Text Field" (light mode).
// Every text sits on the white `surface/default/main` of the field or the screen.
// Disabled fields are exempt from contrast.
const TEXT_FIELD_PAIRS: readonly Pair[] = [
  { name: "Value", text: text.default.body },
  { name: "Placeholder and inline label", text: text.default.placeholder },
  { name: "Label", text: text.default.body },
  { name: "Label, focused", text: text.brand.solid },
  { name: "Label and message, error", text: text.error.solid },
  { name: "Helper text and counter", text: text.default.subtle },
].map((pair) => ({ ...pair, background: surface.default.main }));

// The stroke that bounds a field is a non-text element that must reach 3:1.
const NON_TEXT_MINIMUM = 3;
const TEXT_FIELD_STROKES: readonly Pair[] = [
  { name: "Stroke, default", text: colors.stroke.gray.accent },
  { name: "Stroke, focused", text: colors.stroke.brand.solid },
  { name: "Stroke, error", text: colors.stroke.error.solid },
].map((pair) => ({ ...pair, background: surface.default.main }));

describe("TextField contrast", () => {
  const ratio = (pair: Pair) => contrastRatio(pair.text, pair.background);
  const failing = (pairs: readonly Pair[], minimum: number) =>
    pairs
      .filter((pair) => ratio(pair) < minimum)
      .map((pair) => `${pair.name}: ${ratio(pair).toFixed(2)}`);

  it("lists the text pairs below 4.5:1 for the TextField spec", () => {
    // Update "Accessibility exceptions" in openspec/specs/components/ui-kit/text-field/spec.md
    // when this list changes.
    expect(failing(TEXT_FIELD_PAIRS, MINIMUM)).toEqual([]);
  });

  it("lists the strokes below 3:1 for the TextField spec", () => {
    expect(failing(TEXT_FIELD_STROKES, NON_TEXT_MINIMUM)).toEqual([
      "Stroke, default: 1.48",
    ]);
  });
});
