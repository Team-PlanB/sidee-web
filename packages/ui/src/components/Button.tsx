"use client";

import type { ButtonHTMLAttributes } from "react";
import {
  buttonBase,
  resolveButtonColor,
  textButtonSize,
  type ButtonColorProps,
  type ButtonHtmlType,
  type ButtonSize,
} from "./buttonStyles";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> &
  ButtonColorProps & {
    size?: ButtonSize;
    /** 네이티브 button type (디자인 시스템 type과 구분) */
    htmlType?: ButtonHtmlType;
  };

export function Button({
  type = "solid",
  variant = "primary",
  size = "m",
  htmlType = "button",
  className,
  ...props
}: ButtonProps) {
  const classes = [
    buttonBase,
    resolveButtonColor(type, variant),
    textButtonSize[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={htmlType} className={classes} {...props} />;
}
