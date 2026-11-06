import type { Config } from "tailwindcss";

import { colors } from "./tokens/colors";
import { opacity } from "./tokens/opacity";
import { borderRadius, borderWidth } from "./tokens/outlines";
import { boxShadow } from "./tokens/shadows";
import { spacing } from "./tokens/spacing";
import { fontFamily, fontSize } from "./tokens/typography";

// Tokens sit under `theme`, not `theme.extend`: a utility with no token has no class.
const preset = {
  content: [],
  theme: {
    borderRadius,
    borderWidth,
    boxShadow,
    colors,
    fontFamily,
    fontSize,
    opacity,
    spacing,
  },
} satisfies Config;

export default preset;
