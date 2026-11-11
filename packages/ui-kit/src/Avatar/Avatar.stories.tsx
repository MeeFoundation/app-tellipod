import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Avatar, type AvatarSize } from "./Avatar";

const meta = {
  args: { initials: "JD" },
  argTypes: {
    circle: { control: "boolean" },
    size: { control: "select", options: ["xxs", "xs", "s", "m", "l", "xl"] },
  },
  component: Avatar,
  title: "UI/Avatar",
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

const SIZES: readonly AvatarSize[] = ["xxs", "xs", "s", "m", "l", "xl"];

// A solid-color stand-in for a pod photo, so the story needs no network or asset.
const SAMPLE_PHOTO = {
  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
};

const Row = ({ children }: { readonly children: React.ReactNode }) => (
  <View className="flex-row flex-wrap items-center gap-3">{children}</View>
);

// Initials, an image and an icon at size m.
export const Contents: Story = {
  args: { content: "icon" },
  render: () => (
    <View className="items-start gap-3 p-4">
      <Row>
        <Avatar initials="M" />
        <Avatar content="image" source={SAMPLE_PHOTO} />
        <Avatar content="icon" />
        <Avatar content="icon" icon="people" />
      </Row>
    </View>
  ),
};

// Every size, for each content, as circles.
export const Sizes: Story = {
  args: { content: "icon" },
  render: () => (
    <View className="items-start gap-3 p-4">
      <Row>
        {SIZES.map((size) => (
          <Avatar initials="JD" key={size} size={size} />
        ))}
      </Row>
      <Row>
        {SIZES.map((size) => (
          <Avatar
            content="image"
            key={size}
            size={size}
            source={SAMPLE_PHOTO}
          />
        ))}
      </Row>
      <Row>
        {SIZES.map((size) => (
          <Avatar content="icon" key={size} size={size} />
        ))}
      </Row>
    </View>
  ),
};

// The rounded square of each content, next to the circle.
export const Shapes: Story = {
  args: { content: "icon" },
  render: () => (
    <View className="items-start gap-3 p-4">
      <Row>
        <Avatar initials="JD" size="xl" />
        <Avatar circle={false} initials="JD" size="xl" />
      </Row>
      <Row>
        <Avatar content="image" size="xl" source={SAMPLE_PHOTO} />
        <Avatar
          circle={false}
          content="image"
          size="xl"
          source={SAMPLE_PHOTO}
        />
      </Row>
      <Row>
        <Avatar content="icon" size="xl" />
        <Avatar circle={false} content="icon" size="xl" />
      </Row>
    </View>
  ),
};
