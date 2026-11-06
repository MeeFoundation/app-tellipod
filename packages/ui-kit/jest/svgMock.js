// Stands in for an SVG file, which Metro turns into a component through react-native-svg-transformer.
const { createElement } = require("react");
const { default: Svg } = require("react-native-svg");

module.exports = {
  __esModule: true,
  default: (props) => createElement(Svg, { viewBox: "0 0 16 16", ...props }),
};
