import "../global.css";
import type { Preview } from "@storybook/react-native";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

const preview: Preview = {
  decorators: [
    // React Native keeps the keyboard open when the user taps outside a focused input, so a
    // story dismisses it on any tap that no control handles.
    (Story) => (
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <Story />
        </View>
      </TouchableWithoutFeedback>
    ),
  ],
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
