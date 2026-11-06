import type { Meta, StoryObj } from "@storybook/react-native";
import { type FC, useState } from "react";
import { View } from "react-native";

import { Icon } from "../Icon/Icon";
import {
  TextField,
  type TextFieldProps,
  type TextFieldSize,
  type TextFieldVariant,
} from "./TextField";

const meta = {
  args: { label: "Label", onChangeText: () => undefined, value: "" },
  argTypes: {
    counter: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
    helperText: { control: "text" },
    maxLength: { control: "number" },
    placeholder: { control: "text" },
    required: { control: "boolean" },
    size: { control: "select", options: ["s", "m", "l"] },
    variant: {
      control: "select",
      options: ["label-above", "label-on-edge", "label-inside"],
    },
  },
  component: TextField,
  title: "UI/TextField",
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

const VARIANTS: readonly TextFieldVariant[] = [
  "label-above",
  "label-on-edge",
  "label-inside",
];
const SIZES: readonly TextFieldSize[] = ["s", "m", "l"];

// A field that holds its own text, so a story can be typed into.
const Field: FC<Omit<TextFieldProps, "onChangeText">> = ({
  value: initial,
  ...props
}) => {
  const [value, setValue] = useState(initial);

  return <TextField {...props} onChangeText={setValue} value={value} />;
};

const Column = ({ children }: { readonly children: React.ReactNode }) => (
  <View className="gap-6 p-4">{children}</View>
);

// The three label styles, empty and filled.
export const Styles: Story = {
  render: () => (
    <Column>
      {VARIANTS.map((variant) => (
        <View className="gap-3" key={variant}>
          <Field label="Password" required value="" variant={variant} />
          <Field
            label="Password"
            required
            value="my3etter#Password@"
            variant={variant}
          />
        </View>
      ))}
    </Column>
  ),
};

// Sizes S, M and L, in the label-above and label-inside styles.
export const Sizes: Story = {
  render: () => (
    <Column>
      {SIZES.map((size) => (
        <View className="gap-3" key={size}>
          <Field label="Email" size={size} value="paula@mee.org" />
          <Field label="Email" size={size} value="" variant="label-inside" />
        </View>
      ))}
    </Column>
  ),
};

// Placeholder, filled, error and disabled. Tap a field to see the focus look.
export const States: Story = {
  render: () => (
    <Column>
      <Field label="Email" placeholder="paula@mee.org" value="" />
      <Field label="Email" value="paula@mee.org" />
      <Field error="Enter a valid email" label="Email" value="paula" />
      <Field disabled label="Email" value="" />
      <Field disabled label="Email" value="paula@mee.org" />
    </Column>
  ),
};

// Leading icon, trailing element, helper text, required marker and counter.
export const Content: Story = {
  render: () => (
    <Column>
      <Field
        label="Search"
        leadingIcon={<Icon name="search" />}
        value="coffee"
      />
      <Field
        helperText="Use your work address"
        label="Email"
        required
        value=""
      />
      <Field
        counter
        helperText="Shown on your pod"
        label="Name"
        maxLength={20}
        value="Paula's Credit Card"
      />
      <Field
        label="Search"
        leadingIcon={<Icon name="search" />}
        trailingElement={<Icon name="info-circle" />}
        value=""
      />
    </Column>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <Column>
      <Field {...args} />
    </Column>
  ),
};
