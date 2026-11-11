import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { CardCategory } from "./CardCategory";

const noop = () => undefined;

const meta = {
  args: { icon: "people", line: "2 pods", onPress: noop, title: "People" },
  component: CardCategory,
  title: "UI/CardCategory",
} satisfies Meta<typeof CardCategory>;

export default meta;

type Story = StoryObj<typeof meta>;

// A count line, and a category without pods.
export const Lines: Story = {
  render: (args) => (
    <View className="w-1/2 gap-3 p-4">
      <CardCategory {...args} />
      <CardCategory {...args} line="No pods yet" />
    </View>
  ),
};

// A title that does not fit on one line.
export const LongTitle: Story = {
  render: (args) => (
    <View className="w-1/2 p-4">
      <CardCategory {...args} title="Health & Wellness and Medical Records" />
    </View>
  ),
};

// Two tiles in a row, as in a grid with a 12 px gap.
export const Row: Story = {
  render: (args) => (
    <View className="flex-row gap-3 p-4">
      <View className="flex-1">
        <CardCategory {...args} />
      </View>
      <View className="flex-1">
        <CardCategory {...args} line="1 pod" title="Documents" />
      </View>
    </View>
  ),
};

// A tile without `onPress` is plain: it is not a button and shows no pressed look.
export const Plain: Story = {
  render: () => (
    <View className="w-1/2 p-4">
      <CardCategory icon="people" line="2 pods" title="People" />
    </View>
  ),
};
