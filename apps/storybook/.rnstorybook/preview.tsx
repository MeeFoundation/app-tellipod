import "../global.css";
import type { Preview } from "@storybook/react-native";

const preview: Preview = {
  // Storybook's story view already dismisses the keyboard on a tap that no control handles,
  // without claiming the touch. Wrapping stories in a Touchable would swallow swipes meant for
  // a ScrollView inside a story.
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
