import type { FC } from "react";

import type { ButtonBaseProps, ButtonType } from "./ButtonBase";
import { FilledButton } from "./FilledButton";
import { LinkButton } from "./LinkButton";
import { OutlinedButton } from "./OutlinedButton";

export type { ButtonSize, ButtonType } from "./ButtonBase";

export type ButtonVariant = "filled" | "outlined" | "link";

const VARIANTS = {
  filled: FilledButton,
  link: LinkButton,
  outlined: OutlinedButton,
} as const;

export type ButtonProps = ButtonBaseProps & {
  readonly variant?: ButtonVariant;
  readonly type?: ButtonType;
};

export const Button: FC<ButtonProps> = ({ variant = "filled", ...rest }) => {
  const Variant = VARIANTS[variant];

  return <Variant {...rest} />;
};
