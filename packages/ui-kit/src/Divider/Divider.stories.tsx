import type { Meta, StoryObj } from "@storybook/react-native";
import { Text, View } from "react-native";

import { Divider } from "./Divider";

const meta = {
  component: Divider,
  title: "UI/Divider",
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

// A hairline between two groups of content.
export const Default: Story = {
  render: () => (
    <View className="gap-3 p-4">
      <Text className="text-text-default-body">Contact info</Text>
      <Divider />
      <Text className="text-text-default-body">Attachments</Text>
    </View>
  ),
};
