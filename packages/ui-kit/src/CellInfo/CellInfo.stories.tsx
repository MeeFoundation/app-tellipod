import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { CellInfo } from "./CellInfo";

const meta = {
  args: { label: "First name", onEdit: () => undefined, value: "Sofia" },
  component: CellInfo,
  title: "UI/CellInfo",
} satisfies Meta<typeof CellInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Rows with and without the edit action.
export const Actions: Story = {
  render: () => (
    <View className="gap-2 px-4">
      <CellInfo label="Last name" onEdit={() => undefined} value="Walker" />
      <CellInfo label="Date of birth" value="April 8, 2018" />
    </View>
  ),
};

// A value longer than the row wraps and the pencil stays at the trailing edge.
export const LongValue: Story = {
  args: {
    label: "Notes",
    value:
      "Allergic to peanuts and shellfish. Carries an auto-injector in the red backpack.",
  },
};
