const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const { withSvgComponents } = require("@tellipod/ui-kit/metro");

const config = getDefaultConfig(__dirname);

withSvgComponents(config);

module.exports = withNativeWind(config, { input: "./global.css" });
