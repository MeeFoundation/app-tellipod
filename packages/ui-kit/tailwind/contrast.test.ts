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

// The bar's track is `alpha/dark/5`, dark at 5%, over the white screen.
const dark5OverWhite = (() => {
  const [r, g, b] = [2, 6, 23];
  const blend = (value: number) =>
    Math.round(value * 0.05 + 255 * 0.95)
      .toString(16)
      .padStart(2, "0");
  return `#${blend(r)}${blend(g)}${blend(b)}`;
})();

// Text and background pairs of the Tabs, from Figma "Tabs" (light mode).
// A pressed tab shows Hover and a focused tab shows Focus. The Active tab is white on the track.
const TABS_PAIRS: readonly Pair[] = [
  {
    background: dark5OverWhite,
    name: "Default",
    text: text.gray["on-soft-background"],
  },
  {
    background: surface.default.main,
    name: "Active",
    text: text.gray["on-soft-background"],
  },
  {
    background: surface.gray.light,
    name: "Hover",
    text: text.default.body,
  },
  {
    background: surface.gray.soft,
    name: "Focus",
    text: text.default.body,
  },
];

// Non-text parts that must reach 3:1: the focus outline against the tab it bounds, and the
// white Active tab against the track it sits on.
const TABS_NON_TEXT: readonly Pair[] = [
  {
    background: surface.gray.soft,
    name: "Focus outline",
    text: colors.stroke.brand.strong,
  },
  {
    background: dark5OverWhite,
    name: "Active tab against the track",
    text: surface.default.main,
  },
];

describe("Tabs contrast", () => {
  const ratio = (pair: Pair) => contrastRatio(pair.text, pair.background);
  const failing = (pairs: readonly Pair[], minimum: number) =>
    pairs
      .filter((pair) => ratio(pair) < minimum)
      .map((pair) => `${pair.name}: ${ratio(pair).toFixed(2)}`);

  it("lists the text pairs below 4.5:1 for the Tabs spec", () => {
    // Update "Accessibility exceptions" in openspec/specs/components/ui-kit/tabs/spec.md
    // when this list changes.
    expect(failing(TABS_PAIRS, MINIMUM)).toEqual([]);
  });

  it("lists the non-text parts below 3:1 for the Tabs spec", () => {
    expect(failing(TABS_NON_TEXT, NON_TEXT_MINIMUM)).toEqual([
      "Active tab against the track: 1.11",
    ]);
  });
});

// Text and background pairs of the Breadcrumbs, from Figma "Breadcrumbs" (light mode).
// A pressed link shows Hover and a focused link shows Focus. The line sits on the white screen,
// or in the `outlined` box. Disabled links are exempt from contrast and use the plain-text color (text/gray/solid) faded.
const BREADCRUMBS_PAIRS: readonly Pair[] = [
  ...[
    ["on the screen", surface.default.main],
    ["in the outlined box", surface.gray.soft],
  ].flatMap(([where, background]) => [
    {
      background: background ?? "",
      name: `Default link ${where}`,
      text: text.brand.solid,
    },
    {
      background: background ?? "",
      name: `Hover link ${where}`,
      text: text.brand.solid_hover,
    },
    {
      background: background ?? "",
      name: `Plain text ${where}`,
      text: text.gray.solid,
    },
  ]),
  {
    background: surface.brand.light,
    name: "Focus link",
    text: text.brand.solid_hover,
  },
];

describe("Breadcrumbs contrast", () => {
  it("lists the text pairs below 4.5:1 for the Breadcrumbs spec", () => {
    // Update "Accessibility exceptions" in
    // openspec/specs/components/ui-kit/breadcrumbs/spec.md when this list changes.
    expect(
      BREADCRUMBS_PAIRS.filter(
        (pair) => contrastRatio(pair.text, pair.background) < MINIMUM,
      ).map(
        (pair) =>
          `${pair.name}: ${contrastRatio(pair.text, pair.background).toFixed(2)}`,
      ),
    ).toEqual([]);
  });
});

// Text and background token pairs of the Card and CellInfo, from Figma "Tellipod App" Info tab.
// The Card icon (text/brand/solid) sits on surface/gray/light in a circle and is a non-text part.
const CARD_PAIRS: readonly Pair[] = [
  {
    background: surface.default.main,
    name: "Card title",
    text: text.default.title,
  },
  {
    background: surface.default.main,
    name: "CellInfo label",
    text: text.default.subtle,
  },
  {
    background: surface.default.main,
    name: "CellInfo value",
    text: text.default.body,
  },
];

const CARD_ICON_PAIR: Pair = {
  background: surface.gray.light,
  name: "Card icon in its circle",
  text: text.brand.solid,
};

describe("Card contrast", () => {
  const failingText = (pairs: readonly Pair[], minimum: number) =>
    pairs
      .filter((pair) => contrastRatio(pair.text, pair.background) < minimum)
      .map(
        (pair) =>
          `${pair.name}: ${contrastRatio(pair.text, pair.background).toFixed(2)}`,
      );

  it("lists the text pairs below 4.5:1 for the Card and CellInfo specs", () => {
    // Update "Accessibility exceptions" in the card and cell-info specs when this list changes.
    expect(failingText(CARD_PAIRS, MINIMUM)).toEqual([]);
  });

  it("lists the non-text parts below 3:1 for the Card spec", () => {
    expect(failingText([CARD_ICON_PAIR], 3)).toEqual([]);
  });
});

// Text and background pairs of the Avatar, CardCell and CardCategory, from Figma "Avatar" and
// the Home screen (light mode). The initials are text; the icons are non-text parts.
const AVATAR_TEXT_PAIRS: readonly Pair[] = [
  {
    background: surface.brand.light,
    name: "Avatar initials",
    text: surface.brand.main,
  },
  {
    background: surface.default.main,
    name: "CardCell title",
    text: text.default.title,
  },
  {
    background: surface.default.main,
    name: "CardCell second line",
    text: text.default.subtle,
  },
  {
    background: surface.default.main,
    name: "CardCategory title",
    text: text.default.title,
  },
  {
    background: surface.default.main,
    name: "CardCategory line",
    text: text.default.subtle,
  },
];

const AVATAR_NON_TEXT_PAIRS: readonly Pair[] = [
  {
    background: surface.brand.light,
    name: "Avatar icon",
    text: surface.brand.main,
  },
  {
    background: surface.gray.light,
    name: "CardCategory icon in its circle",
    text: text.brand.solid,
  },
];

describe("Avatar and card contrast", () => {
  const ratio = (pair: Pair) => contrastRatio(pair.text, pair.background);
  const failing = (pairs: readonly Pair[], minimum: number) =>
    pairs
      .filter((pair) => ratio(pair) < minimum)
      .map((pair) => `${pair.name}: ${ratio(pair).toFixed(2)}`);

  it("lists the text pairs below 4.5:1 for the Avatar and card specs", () => {
    // Update "Accessibility exceptions" in the avatar spec when this list changes.
    expect(failing(AVATAR_TEXT_PAIRS, MINIMUM)).toEqual([
      "Avatar initials: 3.38",
    ]);
  });

  it("lists the non-text parts below 3:1 for the Avatar and card specs", () => {
    expect(failing(AVATAR_NON_TEXT_PAIRS, NON_TEXT_MINIMUM)).toEqual([]);
  });
});

// Text and background pairs of the Toast types, from Figma "Mee - Design System v5.2.4", Toast
// (light mode). Each type draws its title, description and link on its own fill.
const TOAST_LOOKS = [
  {
    description: colors.brand[800],
    fill: colors.brand[50],
    link: text.brand.solid,
    title: colors.brand[900],
    type: "primary",
  },
  {
    description: colors.gray[800],
    fill: surface.default.main,
    link: text.brand.solid,
    title: colors.gray[900],
    type: "secondary",
  },
  {
    description: colors.success[800],
    fill: colors.success[50],
    link: text.success.solid,
    title: colors.success[900],
    type: "success",
  },
  {
    description: colors.error[800],
    fill: colors.error[50],
    link: text.error.solid,
    title: colors.error[900],
    type: "danger",
  },
] as const;

const TOAST_TEXT_PAIRS: readonly Pair[] = TOAST_LOOKS.flatMap((look) => [
  { background: look.fill, name: `Toast ${look.type} title`, text: look.title },
  {
    background: look.fill,
    name: `Toast ${look.type} description`,
    text: look.description,
  },
  { background: look.fill, name: `Toast ${look.type} link`, text: look.link },
]);

// The icon and the close button are drawn in the title color and are non-text parts.
const TOAST_NON_TEXT_PAIRS: readonly Pair[] = TOAST_LOOKS.map((look) => ({
  background: look.fill,
  name: `Toast ${look.type} icon and close button`,
  text: look.title,
}));

describe("Toast contrast", () => {
  const ratio = (pair: Pair) => contrastRatio(pair.text, pair.background);
  const failing = (pairs: readonly Pair[], minimum: number) =>
    pairs
      .filter((pair) => ratio(pair) < minimum)
      .map((pair) => `${pair.name}: ${ratio(pair).toFixed(2)}`);

  it("lists the text pairs below 4.5:1 for the Toast spec", () => {
    // Update "Accessibility exceptions" in the toast spec when this list changes.
    expect(failing(TOAST_TEXT_PAIRS, MINIMUM)).toEqual([]);
  });

  it("lists the non-text parts below 3:1 for the Toast spec", () => {
    expect(failing(TOAST_NON_TEXT_PAIRS, NON_TEXT_MINIMUM)).toEqual([]);
  });

  it("measures a ratio for every Toast pair", () => {
    expect(TOAST_TEXT_PAIRS).toHaveLength(12);
    for (const pair of [...TOAST_TEXT_PAIRS, ...TOAST_NON_TEXT_PAIRS]) {
      expect(ratio(pair)).toBeGreaterThan(1);
    }
  });
});

// Text and background pairs of the AppHeader, its HeaderIconButton and its SearchEntry, from Figma
// "Mee - Tellipod App v4.0.3", home-topbar (light mode). The header text sits on a gradient, so it
// is measured against the darkest stop, `surface/brand/light`, at the top.
const APP_HEADER_TEXT_PAIRS: readonly Pair[] = [
  {
    background: surface.brand.light,
    name: "AppHeader title",
    text: text.default.title,
  },
  {
    background: surface.brand.light,
    name: "AppHeader subtitle",
    text: text.default.subtle,
  },
  {
    background: surface.default.main,
    name: "SearchEntry placeholder",
    text: text.default.placeholder,
  },
  {
    background: surface.gray.soft,
    name: "SearchEntry placeholder pressed",
    text: text.default.placeholder,
  },
];

// The icons of the HeaderIconButton are drawn in the body text color and are non-text parts.
const APP_HEADER_NON_TEXT_PAIRS: readonly Pair[] = [
  {
    background: surface.brand.light,
    name: "HeaderIconButton icon",
    text: text.default.body,
  },
  {
    background: surface.gray.light,
    name: "HeaderIconButton icon pressed",
    text: text.default.body,
  },
];

describe("AppHeader contrast", () => {
  const ratio = (pair: Pair) => contrastRatio(pair.text, pair.background);
  const failing = (pairs: readonly Pair[], minimum: number) =>
    pairs
      .filter((pair) => ratio(pair) < minimum)
      .map((pair) => `${pair.name}: ${ratio(pair).toFixed(2)}`);

  it("lists the text pairs below 4.5:1 for the AppHeader specs", () => {
    // Update "Accessibility exceptions" in the app-header and search-entry specs when this changes.
    expect(failing(APP_HEADER_TEXT_PAIRS, MINIMUM)).toEqual([]);
  });

  it("lists the non-text parts below 3:1 for the AppHeader specs", () => {
    expect(failing(APP_HEADER_NON_TEXT_PAIRS, NON_TEXT_MINIMUM)).toEqual([]);
  });
});
