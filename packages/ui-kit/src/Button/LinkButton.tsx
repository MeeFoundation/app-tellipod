import type { FC } from "react";

import {
  ButtonBase,
  type ButtonBaseProps,
  type ButtonLook,
  type ButtonType,
} from "./ButtonBase";

const LOOKS: Readonly<Record<ButtonType, ButtonLook>> = {
  danger: {
    edge: "border border-transparent group-focus:border-stroke-error-solid_hover",
    fill: "bg-transparent group-focus:bg-outline-white",
    gradients: [],
    label: "text-text-error-solid group-active:text-text-error-solid_hover",
    ring: "focus:shadow-outline-error disabled:opacity-60",
  },
  primary: {
    edge: "border border-transparent group-focus:border-stroke-brand-solid_hover",
    fill: "bg-transparent group-focus:bg-outline-white",
    gradients: [],
    label: "text-text-brand-solid group-active:text-text-brand-solid_hover",
    ring: "focus:shadow-outline-brand disabled:opacity-60",
  },
  secondary: {
    edge: "border border-transparent group-focus:border-stroke-brand-strong",
    fill: "bg-transparent group-focus:bg-outline-white",
    gradients: [],
    label: "text-text-brand-solid group-active:text-text-brand-solid_hover",
    ring: "focus:shadow-outline-brand disabled:opacity-60",
  },
  tertiary: {
    edge: "border border-transparent group-focus:border-stroke-gray-strong",
    fill: "bg-transparent group-focus:bg-outline-white",
    gradients: [],
    label: "text-text-gray-solid group-active:text-text-gray-solid_hover",
    ring: "focus:shadow-outline-gray disabled:opacity-60",
  },
};

export type LinkButtonProps = ButtonBaseProps & { readonly type?: ButtonType };

export const LinkButton: FC<LinkButtonProps> = ({
  type = "primary",
  ...rest
}) => <ButtonBase {...rest} compact look={LOOKS[type]} />;
