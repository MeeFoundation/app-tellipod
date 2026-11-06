import type { Meta, StoryObj } from "@storybook/react-native";
import type { FC, ReactNode } from "react";
import { Text, View } from "react-native";

import { Icon } from "../Icon/Icon";
import {
  Breadcrumb,
  Breadcrumbs,
  type BreadcrumbsSize,
  type BreadcrumbsVariant,
} from "./Breadcrumbs";

const meta = {
  args: { children: null, size: "m", variant: "simple" },
  argTypes: {
    size: { control: "select", options: ["s", "m", "l"] },
    variant: { control: "select", options: ["simple", "outlined"] },
  },
  component: Breadcrumbs,
  title: "UI/Breadcrumbs",
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

const SIZES: readonly BreadcrumbsSize[] = ["s", "m", "l"];
const VARIANTS: readonly BreadcrumbsVariant[] = ["simple", "outlined"];
const PARENTS: readonly string[] = ["Health", "Medical records"];
const LONG_PARENTS: readonly string[] = [
  "Health",
  "Medical records",
  "Lab results",
  "2026",
  "October",
];

type TrailProps = {
  readonly size?: BreadcrumbsSize | undefined;
  readonly variant?: BreadcrumbsVariant | undefined;
  readonly parents?: readonly string[];
  readonly current?: string;
  readonly disabled?: string;
};

// A trail that starts with a house, as in the design. The parents are links, and the last item is
// the current place.
const Trail: FC<TrailProps> = ({
  size = "m",
  variant = "simple",
  parents = PARENTS,
  current = "Lab results",
  disabled,
}) => (
  <Breadcrumbs size={size} variant={variant}>
    <Breadcrumb
      label="Home"
      leadingIcon={<Icon name="house" />}
      onPress={() => undefined}
    />
    {parents.map((label) => (
      <Breadcrumb
        disabled={label === disabled}
        key={label}
        label={label}
        onPress={() => undefined}
      />
    ))}
    <Breadcrumb label={current} />
  </Breadcrumbs>
);

const Column: FC<{ readonly children: ReactNode }> = ({ children }) => (
  <View className="gap-6 p-4">{children}</View>
);

// Sizes S, M and L, in both styles.
export const Sizes: Story = {
  render: () => (
    <Column>
      {VARIANTS.map((variant) => (
        <View className="gap-4" key={variant}>
          {SIZES.map((size) => (
            <Trail key={size} size={size} variant={variant} />
          ))}
        </View>
      ))}
    </Column>
  ),
};

// A link, a disabled link and the current place. Press and hold a link to see the Hover look, or
// move focus to it for Focus.
export const States: Story = {
  render: () => (
    <Column>
      <Text className="text-text-default-subtle text-sm">
        Press and hold a link for Hover, or move focus to it for Focus. Health
        is disabled in the second line.
      </Text>
      {SIZES.map((size) => (
        <View className="gap-3" key={size}>
          <Trail size={size} />
          <Trail disabled="Health" size={size} />
        </View>
      ))}
    </Column>
  ),
};

// A trail wider than the screen scrolls sideways and starts at its end.
export const LongTrail: Story = {
  render: () => (
    <Column>
      {VARIANTS.map((variant) => (
        <Trail
          current="Blood panel"
          key={variant}
          parents={LONG_PARENTS}
          variant={variant}
        />
      ))}
      <Trail current="Blood panel" parents={LONG_PARENTS} size="l" />
    </Column>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <View className="p-4">
      <Trail size={args.size} variant={args.variant} />
    </View>
  ),
};
