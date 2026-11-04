import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Icon } from "../Icon/Icon";
import {
  Badge,
  type BadgeSize,
  type BadgeType,
  type BadgeVariant,
} from "./Badge";

const meta = {
  args: { label: "Label" },
  argTypes: {
    dot: { control: "boolean" },
    shape: {
      control: "select",
      options: ["rounded", "pill", "circle", "dot"],
    },
    size: { control: "select", options: ["xxs", "xs", "s", "m"] },
    type: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning"],
    },
    variant: {
      control: "select",
      options: ["filled-solid", "filled-light", "outlined-light"],
    },
  },
  component: Badge,
  title: "UI/Badge",
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

const TYPES: readonly BadgeType[] = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
];
const VARIANTS: readonly BadgeVariant[] = [
  "filled-solid",
  "filled-light",
  "outlined-light",
];
const SIZES: readonly BadgeSize[] = ["xxs", "xs", "s", "m"];

// One row of badges, wrapping on narrow screens.
const Row = ({ children }: { readonly children: React.ReactNode }) => (
  <View className="flex-row flex-wrap items-center gap-3">{children}</View>
);

// One badge per type, in each style.
export const Types: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      {VARIANTS.map((variant) => (
        <Row key={variant}>
          {TYPES.map((type) => (
            <Badge key={type} label={type} type={type} variant={variant} />
          ))}
        </Row>
      ))}
    </View>
  ),
};

// One badge per style, for each type.
export const Styles: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      {TYPES.map((type) => (
        <Row key={type}>
          {VARIANTS.map((variant) => (
            <Badge
              key={variant}
              label={variant}
              type={type}
              variant={variant}
            />
          ))}
        </Row>
      ))}
    </View>
  ),
};

// One badge per size, with its name in the label.
export const Sizes: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      <Row>
        {SIZES.map((size) => (
          <Badge key={size} label={`Size ${size}`} size={size} />
        ))}
      </Row>
      <Row>
        {SIZES.map((size) => (
          <Badge
            key={size}
            label="9+"
            shape="circle"
            size={size}
            type="danger"
          />
        ))}
      </Row>
      <Row>
        {SIZES.map((size) => (
          <Badge key={size} shape="dot" size={size} type="success" />
        ))}
      </Row>
    </View>
  ),
};

// Rounded, pill, circle with a count, and dot.
export const Shapes: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      {VARIANTS.map((variant) => (
        <Row key={variant}>
          <Badge label="Rounded" shape="rounded" variant={variant} />
          <Badge label="Pill" shape="pill" variant={variant} />
          <Badge label="9+" shape="circle" variant={variant} />
          <Badge shape="dot" variant={variant} />
        </Row>
      ))}
    </View>
  ),
};

// The leading dot and the icon slots, in two types and sizes.
export const Content: Story = {
  render: () => (
    <View className="items-start gap-3 p-4">
      <Row>
        <Badge dot label="Live" />
        <Badge label="Active" leadingIcon={<Icon name="check-circle" />} />
        <Badge label="Info" trailingIcon={<Icon name="info-circle" />} />
        <Badge
          dot
          label="All"
          leadingIcon={<Icon name="check-circle" />}
          trailingIcon={<Icon name="info-circle" />}
        />
      </Row>
      <Row>
        <Badge
          dot
          label="Warning"
          leadingIcon={<Icon name="info-circle" />}
          size="xs"
          trailingIcon={<Icon name="info-circle" />}
          type="warning"
          variant="filled-light"
        />
        <Badge
          label="Done"
          leadingIcon={<Icon name="check-circle" />}
          shape="pill"
          size="s"
          type="success"
          variant="outlined-light"
        />
      </Row>
    </View>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <View className="items-start p-4">
      <Badge {...args} />
    </View>
  ),
};
