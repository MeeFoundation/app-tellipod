import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Icon, type IconName } from "../Icon/Icon";
import { Toast, type ToastType } from "./Toast";

const meta = {
  args: { title: "Just a notification" },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "secondary", "success", "danger"],
    },
  },
  component: Toast,
  title: "UI/Toast",
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => undefined;

const ICONS: Readonly<Record<ToastType, IconName>> = {
  danger: "exclamation-octagon",
  primary: "info-circle",
  secondary: "info-circle",
  success: "check-circle",
};

const TYPES: readonly ToastType[] = [
  "secondary",
  "primary",
  "success",
  "danger",
];

// Each type with an icon, a title, a description and a close button.
export const Types: Story = {
  render: () => (
    <View className="gap-4 p-4">
      {TYPES.map((type) => (
        <Toast
          description="Try to refresh your page."
          icon={<Icon name={ICONS[type]} />}
          key={type}
          onClose={noop}
          title={`Type ${type}`}
          type={type}
        />
      ))}
    </View>
  ),
};

// Title only, a right link, a close button, and a description with links below.
export const Slots: Story = {
  render: () => (
    <View className="gap-4 p-4">
      <Toast onClose={noop} title="Just a notification" />
      <Toast
        action={{ label: "View", onPress: noop }}
        title="Your order is ready!"
      />
      <Toast
        action={{ label: "Refresh", onPress: noop }}
        description="Try to refresh your page."
        icon={<Icon name="exclamation-octagon" />}
        title="Server error!"
        type="danger"
      />
      <Toast
        actions={[
          { label: "Action 1", onPress: noop },
          { label: "Action 2", onPress: noop },
        ]}
        description="Description"
        icon={<Icon name="info-circle" />}
        onClose={noop}
        title="Item removed"
      />
      <Toast
        icon={<Icon name="check-circle" />}
        onClose={noop}
        title="All suggested contact info added"
        type="success"
      />
    </View>
  ),
};

// A title and a description that wrap onto several lines.
export const LongText: Story = {
  render: () => (
    <View className="gap-4 p-4">
      <Toast
        description="This description is long enough to wrap onto a second and a third line inside the toast, and it is never cut."
        icon={<Icon name="info-circle" />}
        onClose={noop}
        title="A title that is much longer than one line of the toast can hold at once"
        type="primary"
      />
    </View>
  ),
};
