const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  withStorybook,
} = require("@storybook/react-native/metro/withStorybook");

const { withSvgComponents } = require("@tellipod/ui-kit/metro");

const config = getDefaultConfig(__dirname);

withSvgComponents(config);

module.exports = withStorybook(
  withNativeWind(config, { input: "./global.css" }),
  {
    configPath: "./.rnstorybook",
    enabled: true,
  },
);
