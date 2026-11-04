import { cssInterop } from "nativewind";
import Svg from "react-native-svg";

// `text-*` classes set the SVG `color`, which shapes read through `currentColor`.
export const StyledSvg = cssInterop(Svg, {
  className: { nativeStyleToProp: { color: true }, target: "style" },
});
