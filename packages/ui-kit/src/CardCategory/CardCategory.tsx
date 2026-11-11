import type { FC } from "react";
import { Pressable, Text, View } from "react-native";

import { CardSurface } from "../CardSurface/CardSurface";
import { Icon, type IconName } from "../Icon/Icon";

const ICON_PX = 24;

export type CardCategoryProps = {
  readonly icon: IconName;
  readonly title: string;
  // The line under the title, such as "2 pods". The screen words it; the card does not count.
  readonly line: string;
  // Makes the tile a button that shows it is pressed. Without it the tile is plain.
  readonly onPress?: () => void;
  readonly testID?: string;
};

type TileProps = Pick<CardCategoryProps, "icon" | "title" | "line"> & {
  readonly pressed: boolean;
  readonly testID: string;
};

const Tile: FC<TileProps> = ({ icon, title, line, pressed, testID }) => (
  <CardSurface
    className="gap-2 p-3"
    pressed={pressed}
    testID={`${testID}-surface`}
  >
    <View
      accessibilityElementsHidden
      className="bg-surface-gray-light size-12 items-center justify-center self-start rounded-full"
      importantForAccessibility="no-hide-descendants"
    >
      <Icon className="text-text-brand-solid" name={icon} size={ICON_PX} />
    </View>
    <View className="px-1 pb-1">
      <Text className="font-public-sans-medium text-text-default-title text-base">
        {title}
      </Text>
      <Text className="font-public-sans-regular text-text-default-subtle text-sm">
        {line}
      </Text>
    </View>
  </CardSurface>
);

// Figma `Card-Category`: a tile with an icon in a circle, a title and a line. It fills the width
// its parent gives it, so a screen places it in a grid. Given `onPress` it is a button whose
// surface turns `surface/gray/soft` while pressed; that look is not in the design.
export const CardCategory: FC<CardCategoryProps> = ({
  icon,
  title,
  line,
  onPress,
  testID = "card-category",
}) =>
  onPress === undefined ? (
    <View
      accessibilityLabel={`${title}, ${line}`}
      accessibilityRole="text"
      accessible
      className="w-full"
      testID={testID}
    >
      <Tile
        icon={icon}
        line={line}
        pressed={false}
        testID={testID}
        title={title}
      />
    </View>
  ) : (
    <Pressable
      accessibilityLabel={`${title}, ${line}`}
      accessibilityRole="button"
      className="w-full"
      onPress={onPress}
      testID={testID}
    >
      {({ pressed }) => (
        <Tile
          icon={icon}
          line={line}
          pressed={pressed}
          testID={testID}
          title={title}
        />
      )}
    </Pressable>
  );
