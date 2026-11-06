// Source: Figma, Typography (variable collection "Typography", mode Desktop).
// React Native loads each weight as its own font family, so there is one family per weight.

// Tailwind's config types are mutable, so these two exports are typed as such.
export const fontFamily: Record<string, string[]> = {
  "public-sans-bold": ["PublicSans_700Bold"],
  "public-sans-medium": ["PublicSans_500Medium"],
  "public-sans-regular": ["PublicSans_400Regular"],
  "public-sans-semibold": ["PublicSans_600SemiBold"],
};

export const fontSize: Record<string, [string, { lineHeight: string }]> = {
  "2xl": ["24px", { lineHeight: "32px" }],
  "3xl": ["30px", { lineHeight: "40px" }],
  "4xl": ["36px", { lineHeight: "44px" }],
  "5xl": ["48px", { lineHeight: "60px" }],
  "6xl": ["60px", { lineHeight: "72px" }],
  "7xl": ["72px", { lineHeight: "80px" }],
  "8xl": ["96px", { lineHeight: "104px" }],
  "9xl": ["128px", { lineHeight: "136px" }],
  base: ["16px", { lineHeight: "24px" }],
  lg: ["18px", { lineHeight: "28px" }],
  sm: ["14px", { lineHeight: "20px" }],
  xl: ["20px", { lineHeight: "30px" }],
  xs: ["12px", { lineHeight: "16px" }],
  xxs: ["10px", { lineHeight: "14px" }],
};
