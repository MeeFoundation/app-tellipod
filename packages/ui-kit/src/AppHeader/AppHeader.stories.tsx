import type { Meta, StoryObj } from "@storybook/react-native";
import { type FC, type ReactNode, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

import { Avatar } from "../Avatar/Avatar";
import { Breadcrumb, Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { Tab, Tabs } from "../Tabs/Tabs";
import { AppHeader } from "./AppHeader";
import { HeaderIconButton } from "./HeaderIconButton";
import { SearchEntry } from "./SearchEntry";

const meta = {
  argTypes: {
    titleAlign: { control: "select", options: ["start", "center"] },
    titleSize: { control: "select", options: ["base", "xl"] },
  },
  component: AppHeader,
  title: "UI/AppHeader",
} satisfies Meta<typeof AppHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => undefined;

// The status bar area of the Figma frames is 64 px, so a story pins the inset to it and the headers
// match the design's 142 px and 206 px.
const INSETS = { bottom: 0, left: 0, right: 0, top: 64 } as const;

const OnDevice: FC<{ readonly children: ReactNode }> = ({ children }) => (
  <SafeAreaInsetsContext.Provider value={INSETS}>
    <View className="bg-surface-gray-soft gap-6 pb-6">{children}</View>
  </SafeAreaInsetsContext.Provider>
);

const BackButton = () => (
  <HeaderIconButton
    accessibilityLabel="Back"
    icon="chevron-left"
    onPress={noop}
  />
);

const Kebab = () => (
  <HeaderIconButton
    accessibilityLabel="More actions"
    icon="three-dots-vertical"
    onPress={noop}
  />
);

const ShieldLine = () => (
  <View className="flex-row items-center gap-1">
    <Icon className="text-text-default-subtle" name="shield-lock" size={14} />
    <Text className="font-public-sans-regular text-text-default-subtle text-xs">
      Device-to-device sharing, pod members only.
    </Text>
  </View>
);

const Trail = () => (
  <Breadcrumbs size="s">
    <Breadcrumb label="People" onPress={noop} />
    <Breadcrumb label="Immediate Family" />
  </Breadcrumbs>
);

// The four layouts of the design, one above the other: Home with a search entry, Pod with a kebab,
// Pod with tabs, and Filter with a centered title.
export const Layouts: Story = {
  render: () => (
    <OnDevice>
      <AppHeader
        media={<Avatar initials="B" size="l" />}
        subtitle={<ShieldLine />}
        title="Welcome, Bogdan"
        titleSize="xl"
      >
        <SearchEntry onPress={noop} placeholder="Search, or ask Telli..." />
      </AppHeader>
      <AppHeader
        leading={<BackButton />}
        media={<Avatar initials="B" size="l" />}
        subtitle="About Sofia"
        title="Bogdan (You)"
        trailing={<Kebab />}
      />
      <AppHeader
        leading={<BackButton />}
        media={<Avatar initials="S" size="l" />}
        subtitle={<Trail />}
        title="About Sofia"
        trailing={<Kebab />}
      >
        <Tabs layout="equal">
          <Tab active label="Notes" />
          <Tab label="Chat" onPress={noop} />
          <Tab label="Info" onPress={noop} />
        </Tabs>
      </AppHeader>
      <AppHeader
        leading={<BackButton />}
        title="Filter by category"
        titleAlign="center"
      >
        <SearchEntry onPress={noop} placeholder="Find a category..." />
      </AppHeader>
    </OnDevice>
  ),
};

// A title that does not fit stays on one line and ends with an ellipsis.
export const LongTitle: Story = {
  render: () => (
    <OnDevice>
      <AppHeader
        leading={<BackButton />}
        media={<Avatar initials="S" size="l" />}
        subtitle="People > Immediate Family"
        title="A very long pod name that does not fit on a single line of the header"
        trailing={<Kebab />}
      />
    </OnDevice>
  ),
};

const Toggle: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <OnDevice>
      <AppHeader
        leading={<BackButton />}
        media={<Avatar initials="S" size="l" />}
        title="About Sofia"
        trailing={<Kebab />}
      >
        {open ? (
          <SearchEntry onPress={noop} placeholder="Find a note..." />
        ) : null}
      </AppHeader>
      <View className="items-start px-4">
        <Button
          label={open ? "Remove the bottom slot" : "Add the bottom slot"}
          onPress={() => setOpen((current) => !current)}
        />
      </View>
    </OnDevice>
  );
};

// The bottom slot comes and goes, and the header's height eases (or changes at once when the system
// asks to reduce motion).
export const HeightChange: Story = {
  render: () => <Toggle />,
};
