import { colors } from "../../tailwind/tokens/colors";
import {
  flattenColors,
  groupEntries,
  isTranslucent,
  STORY_GROUPS,
} from "./flattenColors";

describe("flattenColors", () => {
  it("follows nesting into dotted names", () => {
    expect(
      flattenColors({ a: "#111", b: { c: "#222", d: { e: "#333" } } }),
    ).toEqual([
      ["a", "#111"],
      ["b.c", "#222"],
      ["b.d.e", "#333"],
    ]);
  });

  it("names a real token as components use it", () => {
    expect(groupEntries("surface")).toContainEqual([
      "surface.brand.soft_hover",
      "#dfecee",
    ]);
  });
});

describe("story groups", () => {
  it("cover every top-level color group exactly once", () => {
    const shown = Object.values(STORY_GROUPS).flat().sort();
    expect(shown).toEqual(Object.keys(colors).sort());
  });

  it("show every color leaf", () => {
    const shown = Object.values(STORY_GROUPS).flat().flatMap(groupEntries);
    expect(shown).toHaveLength(flattenColors(colors).length);
  });
});

describe("isTranslucent", () => {
  it("is true for transparent and rgba below full alpha", () => {
    expect(isTranslucent("transparent")).toBe(true);
    expect(isTranslucent("rgba(2, 6, 23, 0.05)")).toBe(true);
    expect(isTranslucent("rgba(255, 255, 255, 0)")).toBe(true);
  });

  it("is false for opaque colors", () => {
    expect(isTranslucent("#ffffff")).toBe(false);
    expect(isTranslucent("rgba(2, 6, 23, 1)")).toBe(false);
  });
});
