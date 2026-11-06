import { cssInterop } from "nativewind";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

// `text-*` classes set the SVG `color`, which shapes read through `currentColor`.
export const withColorClass = (Svg: ComponentType<SvgProps>) =>
  cssInterop(Svg, {
    className: { nativeStyleToProp: { color: true }, target: "style" },
  });
