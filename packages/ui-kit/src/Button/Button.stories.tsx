import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import {
  Button,
  type ButtonSize,
  type ButtonType,
  type ButtonVariant,
} from "./Button";

const meta = {
  args: { label: "Button" },
  argTypes: {
    disabled: { control: "boolean" },
    onPress: { action: "pressed" },
    size: { control: "select", options: ["s", "m", "l", "xxl"] },
    type: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "danger"],
    },
    variant: { control: "select", options: ["filled", "outlined", "link"] },
  },
  component: Button,
  title: "UI/Button",
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const TYPES: readonly ButtonType[] = [
  "primary",
  "secondary",
  "tertiary",
  "danger",
];
const STYLES: readonly ButtonVariant[] = ["filled", "outlined", "link"];
const SIZES: readonly ButtonSize[] = ["s", "m", "l", "xxl"];

// One button per type, all filled.
export const Types: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      {TYPES.map((type) => (
        <Button key={type} label={type} type={type} />
      ))}
    </View>
  ),
};

// One button per style, all primary.
export const Styles: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      {STYLES.map((variant) => (
        <Button key={variant} label={variant} variant={variant} />
      ))}
    </View>
  ),
};

// One button per size, with its height in the label.
export const Sizes: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      {SIZES.map((size) => (
        <Button key={size} label={`Size ${size}`} size={size} />
      ))}
    </View>
  ),
};

// Default and disabled for each style. Press and hold a button to see the pressed look.
export const States: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      {STYLES.map((variant) => (
        <View className="flex-row gap-3" key={variant}>
          <Button label="Default" variant={variant} />
          <Button disabled label="Disabled" variant={variant} />
        </View>
      ))}
    </View>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <View className="items-start p-4">
      <Button {...args} />
    </View>
  ),
};
