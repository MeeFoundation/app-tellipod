import type { FC } from "react";
import {
  Image,
  type ImageSourcePropType,
  Text,
  View,
  type ViewProps,
} from "react-native";

import { cn } from "../cn";
import { Icon, type IconName } from "../Icon/Icon";

export type AvatarSize = "xxs" | "xs" | "s" | "m" | "l" | "xl";

type SizeLook = {
  // Width and height of the Avatar.
  readonly box: string;
  // Font size and line height of the initials.
  readonly text: string;
  // How many characters of the initials show.
  readonly characters: number;
  // Size in px of the icon.
  readonly iconSize: number;
};

// Figma Avatar, Size XXS to XL. Classes are written out in full so Tailwind finds them.
const SIZES: Readonly<Record<AvatarSize, SizeLook>> = {
  l: { box: "size-12", characters: 2, iconSize: 24, text: "text-lg" },
  m: { box: "size-10", characters: 2, iconSize: 20, text: "text-base" },
  s: { box: "size-8", characters: 2, iconSize: 18, text: "text-sm" },
  xl: { box: "size-16", characters: 2, iconSize: 32, text: "text-xl" },
  xs: { box: "size-6", characters: 1, iconSize: 16, text: "text-xs" },
  xxs: { box: "size-4", characters: 1, iconSize: 12, text: "text-xs" },
};

type AvatarCommonProps = {
  readonly size?: AvatarSize;
  // A fully rounded Avatar when true (the default), a square with 8 px corners when false.
  readonly circle?: boolean;
  // Without a label, the Avatar is decorative and hidden from assistive technology.
  readonly accessibilityLabel?: string;
  readonly testID?: string;
};

type AvatarInitialsProps = AvatarCommonProps & {
  readonly content?: "initials";
  // One character shows at `xxs` and `xs`, and two from `s` up.
  readonly initials: string;
};

type AvatarImageProps = AvatarCommonProps & {
  readonly content: "image";
  readonly source: ImageSourcePropType;
};

type AvatarIconProps = AvatarCommonProps & {
  readonly content: "icon";
  readonly icon?: IconName;
};

export type AvatarProps =
  | AvatarInitialsProps
  | AvatarImageProps
  | AvatarIconProps;

const GRAPHEME = new Intl.Segmenter(undefined, { granularity: "grapheme" });

const initialsText = (initials: string | undefined, count: number): string =>
  Array.from(GRAPHEME.segment((initials ?? "").trim()), (s) => s.segment)
    .slice(0, count)
    .join("")
    .toUpperCase();

const labelProps = (accessibilityLabel: string | undefined): ViewProps =>
  accessibilityLabel === undefined
    ? {
        accessibilityElementsHidden: true,
        accessible: false,
        importantForAccessibility: "no-hide-descendants",
      }
    : {
        accessibilityLabel,
        accessibilityRole: "image",
        accessible: true,
        importantForAccessibility: "yes",
      };

// Figma Avatar: initials, an image or an icon in a circle or a rounded square. It does not draw
// the design's top badge or bottom status dot, because no screen uses them yet.
export const Avatar: FC<AvatarProps> = (props) => {
  const { size = "m", circle = true, accessibilityLabel } = props;
  const look = SIZES[size];

  return (
    <View
      {...labelProps(accessibilityLabel)}
      className={cn(
        "items-center justify-center overflow-hidden",
        look.box,
        circle ? "rounded-full" : "rounded-lg",
        "bg-surface-brand-light",
      )}
      testID={props.testID ?? "avatar"}
    >
      {props.content === "image" ? (
        <Image
          className="size-full"
          resizeMode="cover"
          source={props.source}
          testID={`${props.testID ?? "avatar"}-image`}
        />
      ) : props.content === "icon" ? (
        <Icon
          className="text-surface-brand-main"
          name={props.icon ?? "person"}
          size={look.iconSize}
        />
      ) : (
        <Text
          className={cn(
            "font-public-sans-bold text-surface-brand-main",
            look.text,
          )}
        >
          {initialsText(props.initials, look.characters)}
        </Text>
      )}
    </View>
  );
};
