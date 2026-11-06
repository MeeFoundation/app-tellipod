import type { FC } from "react";

import { GLYPHS, type IconName } from "./glyphs";
import { resolveIconLook, useIconDefaults } from "./IconDefaults";

export type { IconName } from "./glyphs";

export type IconProps = {
  readonly name: IconName;
  // Size in px. Inside a Badge it defaults to the size of the Badge's label.
  readonly size?: number;
  // A `text-*` color class. Inside a Badge it defaults to the Badge's text color.
  readonly className?: string;
  // Without a label, the icon is decorative and hidden from assistive technology.
  readonly accessibilityLabel?: string;
};

export const Icon: FC<IconProps> = ({
  name,
  size,
  className,
  accessibilityLabel,
}) => {
  const look = resolveIconLook(useIconDefaults(), { className, size });
  const Glyph = GLYPHS[name];
  const labelProps =
    accessibilityLabel === undefined
      ? ({
          accessibilityElementsHidden: true,
          accessible: false,
          importantForAccessibility: "no-hide-descendants",
        } as const)
      : ({
          accessibilityLabel,
          accessibilityRole: "image",
          accessible: true,
          importantForAccessibility: "yes",
        } as const);

  return (
    <Glyph
      {...labelProps}
      className={look.className}
      height={look.size}
      testID={`icon-${name}`}
      viewBox="0 0 16 16"
      width={look.size}
    />
  );
};
