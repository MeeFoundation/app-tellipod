// Metro helper for apps that consume the kit: SVG files import as React components
// (react-native-svg-transformer), not as assets.
const withSvgComponents = (config) => {
  config.transformer.babelTransformerPath = require.resolve(
    "react-native-svg-transformer/expo",
  );
  config.resolver.assetExts = config.resolver.assetExts.filter(
    (ext) => ext !== "svg",
  );
  config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];
  return config;
};

module.exports = { withSvgComponents };
