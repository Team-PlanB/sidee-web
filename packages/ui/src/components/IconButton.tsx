"use client";

import type { ButtonHTMLAttributes } from "react";
import {
  buttonBase,
  iconButtonSize,
  resolveButtonColor,
  type ButtonColorProps,
  type ButtonHtmlType,
  type ButtonSize,
} from "./buttonStyles";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "aria-label"
> &
  ButtonColorProps & {
    size?: ButtonSize;
    /** 네이티브 button type (디자인 시스템 type과 구분) */
    htmlType?: ButtonHtmlType;
    /** 아이콘만 있는 버튼이므로 접근성 이름 필수 */
    "aria-label": string;
  };

export function IconButton({
  type = "solid",
  variant = "primary",
  size = "m",
  htmlType = "button",
  className,
  ...props
}: IconButtonProps) {
  const classes = [
    buttonBase,
    resolveButtonColor(type, variant),
    iconButtonSize[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={htmlType} className={classes} {...props} />;
}
