import nativewindPreset from "nativewind/preset";
import type { Config } from "tailwindcss";

import uiKitPreset from "@tellipod/ui-kit/tailwind/preset";

export default {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui-kit/src/**/*.{ts,tsx}"],
  presets: [nativewindPreset, uiKitPreset],
} satisfies Config;
