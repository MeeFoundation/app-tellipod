import type { Meta, StoryObj } from "@storybook/react-native";
import { type FC, type ReactNode, useState } from "react";
import { Text, View } from "react-native";

import { Icon } from "../Icon/Icon";
import { Tab, Tabs, type TabsLayout, type TabsSize } from "./Tabs";

const meta = {
  args: { children: null, layout: "content", size: "m" },
  argTypes: {
    layout: { control: "select", options: ["content", "equal"] },
    size: { control: "select", options: ["m", "l"] },
  },
  component: Tabs,
  title: "UI/Tabs",
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const SIZES: readonly TabsSize[] = ["m", "l"];
const LABELS: readonly string[] = ["Posts", "Media", "About"];
const MANY_LABELS: readonly string[] = [
  "Posts",
  "Media",
  "About",
  "Replies",
  "Highlights",
  "Articles",
  "Likes",
];

type BarProps = {
  readonly initial: string;
  readonly labels?: readonly string[];
  readonly size?: TabsSize | undefined;
  readonly layout?: TabsLayout | undefined;
  readonly icons?: boolean;
};

// A bar that holds its own selection, so a story can be tapped. The screen owns it in the app.
const Bar: FC<BarProps> = ({
  initial,
  labels = LABELS,
  size = "m",
  layout = "content",
  icons = false,
}) => {
  const [active, setActive] = useState(initial);
  return (
    <Tabs layout={layout} size={size}>
      {labels.map((label) => (
        <Tab
          active={label === active}
          key={label}
          label={label}
          leadingIcon={icons ? <Icon name="search" /> : undefined}
          onPress={() => setActive(label)}
          trailingIcon={icons ? <Icon name="info-circle" /> : undefined}
        />
      ))}
    </Tabs>
  );
};

const Column: FC<{ readonly children: ReactNode }> = ({ children }) => (
  <View className="gap-6 p-4">{children}</View>
);

// Sizes M and L, with and without icons. Tap a tab to select it.
export const Sizes: Story = {
  render: () => (
    <Column>
      {SIZES.map((size) => (
        <View className="gap-3" key={size}>
          <Bar initial="Posts" size={size} />
          <Bar icons initial="Posts" size={size} />
        </View>
      ))}
    </Column>
  ),
};

// Content width, where each tab is as wide as its content and a long bar scrolls, and equal width.
export const Layouts: Story = {
  render: () => (
    <Column>
      {SIZES.map((size) => (
        <View className="gap-3" key={size}>
          <Bar initial="Posts" layout="content" size={size} />
          <Bar
            initial="Posts"
            labels={MANY_LABELS}
            layout="content"
            size={size}
          />
          <Bar initial="Posts" layout="equal" size={size} />
        </View>
      ))}
    </Column>
  ),
};

// The Active tab, and the Default tabs. Press and hold a Default tab to see the Hover look.
export const States: Story = {
  render: () => (
    <Column>
      <Text className="text-text-default-subtle text-sm">
        One tab Active, the others Default. Press and hold one for Hover, or
        move focus to it for Focus.
      </Text>
      <Bar initial="Posts" />
      <Bar initial="About" />
    </Column>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <View className="p-4">
      <Bar icons initial="Posts" layout={args.layout} size={args.size} />
    </View>
  ),
};
