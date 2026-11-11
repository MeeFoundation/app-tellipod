import type { FC, ReactNode } from "react";
import { View } from "react-native";

import { cn } from "../cn";

type CardSurfaceProps = {
  readonly children: ReactNode;
  // Classes for the inner view that holds the content, such as its padding and layout.
  readonly className?: string;
  // Fills the surface with `surface/gray/soft`, for a card that is being pressed.
  readonly pressed?: boolean;
  readonly testID?: string;
};

// The surface of Card-Cell and Card-Category: the design's Box shadow/1st Level on a 16 px rounded
// surface, with a 1 px `stroke/gray/light` border added so the edge shows on a white screen, as the
// existing Card does. The design's shadow alone is only 5 % dark. It is drawn in two views because
// `overflow: hidden` would clip the shadow: the outer view holds the shadow and the inner one clips
// the content to the rounded corners.
// Internal to the kit, so it is not exported from `index.ts`.
export const CardSurface: FC<CardSurfaceProps> = ({
  children,
  className,
  pressed = false,
  testID = "card-surface",
}) => (
  <View
    className={cn(
      "shadow-level-1 border-stroke-gray-light w-full rounded-2xl border",
      pressed ? "bg-surface-gray-soft" : "bg-surface-default-main",
    )}
    testID={testID}
  >
    <View
      className={cn("overflow-hidden rounded-2xl", className)}
      testID={`${testID}-clip`}
    >
      {children}
    </View>
  </View>
);
