import type { FC } from "react";

import { colors } from "../../tailwind/tokens/colors";
import {
  ButtonBase,
  type ButtonBaseProps,
  type ButtonLook,
  type ButtonType,
  type GradientLayer,
} from "./ButtonBase";

// Figma Filled Primary Default: a gradient from brand-700 to brand-500, left to right.
const BRAND_GRADIENT: GradientLayer = {
  colors: [colors.brand[700], colors.brand[500]],
  end: { x: 1, y: 0.5 },
  start: { x: 0, y: 0.5 },
};

// Figma Filled Primary and Danger Default: a white sheen fading from the top, 15% to 0%.
const SHEEN: GradientLayer = {
  colors: [colors.alpha.always.white[15], colors.alpha.always.white[0]],
  end: { x: 0, y: 1 },
  start: { x: 0, y: 0 },
};

const LOOKS: Readonly<Record<ButtonType, ButtonLook>> = {
  danger: {
    edge: "border border-stroke-error-solid group-active:border-surface-error-solid_hover group-focus:border-stroke-error-solid_hover",
    fill: "bg-surface-error-solid group-active:bg-surface-error-solid_hover group-focus:bg-surface-error-solid",
    gradients: [SHEEN],
    highlight: true,
    label: "text-text-error-on-solid-background",
    ring: "focus:shadow-outline-error disabled:opacity-60",
  },
  primary: {
    edge: "border border-stroke-brand-solid group-active:border-surface-brand-solid_hover group-focus:border-stroke-brand-solid_hover",
    fill: "bg-surface-brand-solid group-active:bg-surface-brand-solid_hover group-focus:bg-surface-brand-solid",
    gradients: [BRAND_GRADIENT, SHEEN],
    highlight: true,
    label: "text-text-brand-on-solid-background",
    ring: "focus:shadow-outline-brand disabled:opacity-60",
  },
  secondary: {
    edge: "border border-stroke-brand-accent group-active:border-stroke-brand-accent group-focus:border-stroke-brand-strong",
    fill: "bg-surface-brand-soft group-active:bg-surface-brand-light group-focus:bg-surface-brand-soft",
    gradients: [],
    label: "text-text-brand-solid group-active:text-text-brand-solid_hover",
    ring: "focus:shadow-outline-brand disabled:opacity-60",
  },
  tertiary: {
    edge: "border border-stroke-gray-accent group-active:border-stroke-gray-accent group-focus:border-stroke-gray-strong",
    fill: "bg-surface-gray-soft group-active:bg-surface-gray-light group-focus:bg-surface-gray-soft",
    gradients: [],
    label: "text-text-gray-solid group-active:text-text-gray-solid_hover",
    ring: "focus:shadow-outline-gray disabled:opacity-60",
  },
};

export type FilledButtonProps = ButtonBaseProps & {
  readonly type?: ButtonType;
};

export const FilledButton: FC<FilledButtonProps> = ({
  type = "primary",
  ...rest
}) => <ButtonBase {...rest} look={LOOKS[type]} />;
