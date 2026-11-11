import type { Meta, StoryObj } from "@storybook/react-native";
import { type FC, useState } from "react";
import { View } from "react-native";

import { Button } from "../Button/Button";
import { CellInfo } from "../CellInfo/CellInfo";
import { Divider } from "../Divider/Divider";
import { Card } from "./Card";

const meta = {
  args: { icon: "person-vcard", title: "Contact info" },
  component: Card,
  title: "UI/Card",
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => undefined;

const ContactInfo: FC<{ readonly defaultExpanded: boolean }> = ({
  defaultExpanded,
}) => (
  <Card
    defaultExpanded={defaultExpanded}
    footer={
      <Button
        label="Add contact info"
        size="l"
        type="tertiary"
        variant="outlined"
      />
    }
    icon="person-vcard"
    title="Contact info"
  >
    <CellInfo label="First name" onEdit={noop} value="Sofia" />
    <CellInfo label="Last name" onEdit={noop} value="Walker" />
    <CellInfo label="Date of birth" onEdit={noop} value="April 8, 2018" />
  </Card>
);

// Both states of the expandable mode. Tap a header to toggle it.
export const Expandable: Story = {
  render: () => (
    <View className="gap-3 p-4">
      <ContactInfo defaultExpanded />
      <ContactInfo defaultExpanded={false} />
    </View>
  ),
};

// The navigable mode: no body, a right chevron and a press handler.
export const Navigable: Story = {
  render: () => (
    <View className="gap-3 p-4">
      <Card
        icon="paperclip"
        mode="navigable"
        onPress={noop}
        title="Attachments"
      />
      <Card icon="diagram-3" mode="navigable" onPress={noop} title="Subpods" />
      <Card icon="people" mode="navigable" onPress={noop} title="Members" />
    </View>
  ),
};

const Controlled: FC = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Card
      expanded={expanded}
      icon="person-vcard"
      onExpandedChange={setExpanded}
      title="Contact info (screen owns the state)"
    >
      <CellInfo label="First name" onEdit={noop} value="Sofia" />
    </Card>
  );
};

// The Info tab of a pod (Figma node 820:14161): an expandable form card and three navigable cards.
export const InfoTab: Story = {
  render: () => (
    <View className="gap-3 p-4">
      <ContactInfo defaultExpanded />
      <Divider />
      <Card
        icon="paperclip"
        mode="navigable"
        onPress={noop}
        title="Attachments"
      />
      <Card icon="diagram-3" mode="navigable" onPress={noop} title="Subpods" />
      <Card icon="people" mode="navigable" onPress={noop} title="Members" />
      <Controlled />
    </View>
  ),
};
