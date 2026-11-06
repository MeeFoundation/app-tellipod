import type { FC } from "react";

import {
  ButtonBase,
  type ButtonBaseProps,
  type ButtonLook,
  type ButtonType,
} from "./ButtonBase";

const LOOKS: Readonly<Record<ButtonType, ButtonLook>> = {
  danger: {
    edge: "border border-stroke-error-accent group-active:border-stroke-error-solid_hover group-focus:border-stroke-error-solid_hover",
    fill: "bg-surface-error-elevated group-active:bg-surface-error-soft group-focus:bg-surface-error-elevated",
    gradients: [],
    label: "text-text-error-solid group-active:text-text-error-solid_hover",
    ring: "focus:shadow-outline-error disabled:opacity-60",
  },
  primary: {
    edge: "border border-stroke-brand-accent group-active:border-stroke-brand-solid_hover group-focus:border-stroke-brand-solid_hover",
    fill: "bg-surface-brand-elevated group-active:bg-surface-brand-soft group-focus:bg-surface-brand-elevated",
    gradients: [],
    label: "text-text-brand-solid group-active:text-text-brand-solid_hover",
    ring: "focus:shadow-outline-brand disabled:opacity-60",
  },
  secondary: {
    edge: "border border-stroke-brand-soft group-active:border-stroke-brand-accent group-focus:border-stroke-brand-strong",
    fill: "bg-surface-brand-elevated group-active:bg-surface-brand-soft group-focus:bg-surface-brand-elevated",
    gradients: [],
    label: "text-text-brand-solid group-active:text-text-brand-solid_hover",
    ring: "focus:shadow-outline-brand disabled:opacity-60",
  },
  tertiary: {
    edge: "border border-stroke-gray-light group-active:border-stroke-gray-accent group-focus:border-stroke-gray-strong",
    fill: "bg-surface-gray-elevated-l1 group-active:bg-surface-gray-light group-focus:bg-surface-gray-elevated-l1",
    gradients: [],
    label: "text-text-gray-solid group-active:text-text-gray-solid_hover",
    ring: "focus:shadow-outline-gray disabled:opacity-60",
  },
};

export type OutlinedButtonProps = ButtonBaseProps & {
  readonly type?: ButtonType;
};

export const OutlinedButton: FC<OutlinedButtonProps> = ({
  type = "primary",
  ...rest
}) => <ButtonBase {...rest} look={LOOKS[type]} />;
