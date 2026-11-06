import type { StorybookConfig } from "@storybook/react-native";

const main: StorybookConfig = {
  deviceAddons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
  ],
  stories: ["../../../packages/ui-kit/src/**/*.stories.?(ts|tsx)"],
};

export default main;
