import CheckCircle from "bootstrap-icons/icons/check-circle.svg";
import InfoCircle from "bootstrap-icons/icons/info-circle.svg";
import type { FC } from "react";
import Svg, { Circle, type SvgProps } from "react-native-svg";

import { withColorClass } from "./withColorClass";

// Bootstrap Icons are imported as components (react-native-svg-transformer), so only the icons
// imported here reach the bundle. Add an icon: import its SVG and add it to RAW_GLYPHS.
// Each is drawn on a 16 px grid and filled with the current color.

// A filled circle of 9 px on the 16 px grid, the leading dot of a Badge. It is not a Bootstrap icon.
const Dot: FC<SvgProps> = (props) => (
  <Svg viewBox="0 0 16 16" {...props}>
    <Circle cx={8} cy={8} fill="currentColor" r={4.5} />
  </Svg>
);

const RAW_GLYPHS = {
  "check-circle": CheckCircle,
  dot: Dot,
  "info-circle": InfoCircle,
} as const;

export type IconName = keyof typeof RAW_GLYPHS;

const entries = Object.keys(RAW_GLYPHS) as IconName[];

export const GLYPHS = Object.fromEntries(
  entries.map((name) => [name, withColorClass(RAW_GLYPHS[name])]),
) as Readonly<Record<IconName, FC<SvgProps>>>;
