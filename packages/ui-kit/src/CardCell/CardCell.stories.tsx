import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Avatar } from "../Avatar/Avatar";
import { Breadcrumb, Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Icon } from "../Icon/Icon";
import { CardCell } from "./CardCell";

const noop = () => undefined;

const meta = {
  args: {
    avatar: <Avatar initials="M" />,
    onPress: noop,
    subtitle: "New info shared by Andrew 2 hours ago.",
    title: "Carpathian MTB Event",
  },
  argTypes: { badge: { control: "boolean" } },
  component: CardCell,
  title: "UI/CardCell",
} satisfies Meta<typeof CardCell>;

export default meta;

type Story = StoryObj<typeof meta>;

// A text second line, with and without the dot of new info.
export const TextSubtitle: Story = {
  render: (args) => (
    <View className="gap-3 p-4">
      <CardCell {...args} badge />
      <CardCell {...args} />
    </View>
  ),
};

// A Breadcrumbs second line: a pod in a category, and a pod in one category.
export const BreadcrumbsSubtitle: Story = {
  render: (args) => (
    <View className="gap-3 p-4">
      <CardCell
        {...args}
        avatar={<Avatar content="icon" icon="people" />}
        subtitle={
          <Breadcrumbs size="s">
            <Breadcrumb label="People" leadingIcon={<Icon name="people" />} />
            <Breadcrumb label="Immediate Family" />
          </Breadcrumbs>
        }
        title="About Sofia"
      />
      <CardCell
        {...args}
        avatar={<Avatar content="icon" />}
        subtitle={
          <Breadcrumbs size="s">
            <Breadcrumb label="Health & Wellness" />
          </Breadcrumbs>
        }
        title="Mom & Dad"
      />
    </View>
  ),
};

// A title and a second line that do not fit, and a card with a title only.
export const LongTitle: Story = {
  render: (args) => (
    <View className="gap-3 p-4">
      <CardCell
        {...args}
        subtitle="New info shared by Andrew and three other members 2 hours ago."
        title="Carpathian MTB Event: the long ride through the mountains"
      />
      <CardCell {...args} subtitle={undefined} />
    </View>
  ),
};
