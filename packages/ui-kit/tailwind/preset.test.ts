import resolveConfig from "tailwindcss/resolveConfig";

import preset from "./preset";

const TOKEN_GROUPS = [
  "colors",
  "spacing",
  "borderWidth",
  "borderRadius",
  "opacity",
  "boxShadow",
  "fontFamily",
  "fontSize",
] as const;

describe("tailwind preset", () => {
  const theme = resolveConfig({ content: [], presets: [preset] }).theme;

  it.each(TOKEN_GROUPS)("holds the %s token group", (group) => {
    // Read the preset itself: resolveConfig would fill a missing group with Tailwind's defaults.
    expect(Object.keys(preset.theme[group]).length).toBeGreaterThan(0);
    expect(Object.keys(theme[group]).length).toBeGreaterThan(0);
  });

  it("keeps Figma token names", () => {
    expect(preset.theme.colors.surface.brand.solid).toBe("#3b5b63");
    expect(preset.theme.spacing["3.5"]).toBe("14px");
    expect(preset.theme.fontSize["sm"]).toEqual([
      "14px",
      { lineHeight: "20px" },
    ]);
  });

  it("holds the Figma alpha/dark colors", () => {
    expect(preset.theme.colors.alpha.dark["5"]).toBe("rgba(2, 6, 23, 0.05)");
    expect(preset.theme.colors.alpha.dark["10"]).toBe("rgba(2, 6, 23, 0.1)");
  });

  it("has no default Tailwind color outside the tokens", () => {
    expect(Object.hasOwn(theme.colors, "slate")).toBe(false);
    expect(Object.hasOwn(theme.colors, "red")).toBe(false);
  });
});
