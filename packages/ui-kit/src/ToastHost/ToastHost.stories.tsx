import type { Meta, StoryObj } from "@storybook/react-native";
import { View } from "react-native";

import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { ToastHost } from "./ToastHost";
import { toast } from "./toastStore";

const meta = {
  component: ToastHost,
  title: "UI/ToastHost",
} satisfies Meta<typeof ToastHost>;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => undefined;

// One button for each type of toast. The host sits above the story, at the bottom edge of the
// screen, so the placement and the movement can be tried.
export const Types: Story = {
  render: () => (
    <View className="flex-1">
      <View className="items-start gap-3 p-4">
        <Button
          label="Secondary"
          onPress={() => {
            toast.show({ title: "Just a notification" });
          }}
          type="secondary"
        />
        <Button
          label="Primary, closable"
          onPress={() => {
            toast.show({
              closable: true,
              description: "Description",
              icon: <Icon name="info-circle" />,
              title: "Title",
              type: "primary",
            });
          }}
        />
        <Button
          label="Success"
          onPress={() => {
            toast.show({
              closable: true,
              icon: <Icon name="check-circle" />,
              title: "All suggested contact info added",
              type: "success",
            });
          }}
        />
        <Button
          label="Danger, with a link"
          onPress={() => {
            toast.show({
              action: { label: "Refresh", onPress: noop },
              description: "Try to refresh your page.",
              icon: <Icon name="exclamation-octagon" />,
              title: "Server error!",
              type: "danger",
            });
          }}
          type="danger"
        />
      </View>
      <ToastHost />
    </View>
  ),
};
