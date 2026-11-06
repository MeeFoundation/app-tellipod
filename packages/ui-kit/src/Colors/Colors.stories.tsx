// A swatch paints a token value chosen at runtime, which no static class can express, so its
// fill uses an inline `style`. This exception is limited to this showcase; components use classes.
import type { Meta, StoryObj } from "@storybook/react-native";
import type { FC } from "react";
import { Text as RNText, ScrollView, View } from "react-native";

import { colors } from "../../tailwind/tokens/colors";
import {
  type ColorEntry,
  groupEntries,
  isTranslucent,
  STORY_GROUPS,
} from "./flattenColors";

const meta = {
  title: "Foundations/Colors",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const SWATCH_WIDTH = 96;
const SWATCH_HEIGHT = 64;
const CHECK = 8;
const COLUMNS = Array.from({ length: SWATCH_WIDTH / CHECK }, (_, i) => i);
const ROWS = Array.from({ length: SWATCH_HEIGHT / CHECK }, (_, i) => i);

// A light and dark checkerboard covering the whole swatch, so both white and dark translucent
// colors stay visible. Built from explicit rows of fixed-size cells.
const Checkerboard: FC = () => (
  <View className="absolute top-0 left-0" pointerEvents="none">
    {ROWS.map((row) => (
      <View className="flex-row" key={row}>
        {COLUMNS.map((col) => (
          <View
            key={col}
            style={{
              backgroundColor:
                (row + col) % 2 === 0 ? colors.gray[300] : colors.gray[600],
              flexShrink: 0,
              height: CHECK,
              width: CHECK,
            }}
          />
        ))}
      </View>
    ))}
  </View>
);

// A swatch shows its own checkerboard when its color is translucent, in any group.
const Swatch: FC<{ readonly entry: ColorEntry }> = ({
  entry: [name, value],
}) => (
  <View className="gap-1" style={{ width: SWATCH_WIDTH }}>
    <View
      className="border-stroke-gray-light overflow-hidden rounded-lg border"
      style={{ height: SWATCH_HEIGHT }}
    >
      {isTranslucent(value) ? <Checkerboard /> : null}
      <View style={{ backgroundColor: value, flex: 1 }} />
    </View>
    <RNText className="text-text-default-body text-xs" selectable>
      {name}
    </RNText>
  </View>
);

const Section: FC<{ readonly group: keyof typeof colors }> = ({ group }) => (
  <View className="gap-2">
    <RNText className="text-text-default-title text-base font-semibold">
      {group}
    </RNText>
    <View className="flex-row flex-wrap gap-3">
      {groupEntries(group).map((entry) => (
        <Swatch entry={entry} key={entry[0]} />
      ))}
    </View>
  </View>
);

const groupsStory = (groups: readonly (keyof typeof colors)[]): Story => ({
  render: () => (
    <ScrollView contentContainerClassName="gap-6 p-4">
      {groups.map((group) => (
        <Section group={group} key={group} />
      ))}
    </ScrollView>
  ),
});

// The five color ramps and the base colors.
export const Palette = groupsStory(STORY_GROUPS.Palette);
export const Surface = groupsStory(STORY_GROUPS.Surface);
export const Text = groupsStory(STORY_GROUPS.Text);
export const Stroke = groupsStory(STORY_GROUPS.Stroke);
// Focus rings and alpha colors.
export const Overlays = groupsStory(STORY_GROUPS.Overlays);
