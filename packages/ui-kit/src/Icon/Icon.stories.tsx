import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";

import { GLYPHS } from "./glyphs";
import { Icon } from "./Icon";

const meta = {
  args: { name: "check-circle", size: 16 },
  argTypes: {
    name: { control: "select", options: Object.keys(GLYPHS) },
    size: { control: "number" },
  },
  component: Icon,
  title: "UI/Icon",
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = { args: { name: "info-circle", size: 32 } };

// Every icon the kit registers, at the size set in the controls.
export const AllIcons: Story = {
  render: ({ size }) => (
    <View className="flex-row flex-wrap gap-6 p-4">
      {(Object.keys(GLYPHS) as (keyof typeof GLYPHS)[]).map((name) => (
        <View className="items-center gap-2" key={name}>
          <Icon name={name} {...(size === undefined ? {} : { size })} />
          <Text className="text-text-default-body">{name}</Text>
        </View>
      ))}
    </View>
  ),
};
