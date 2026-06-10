"use client";

import type { ButtonHTMLAttributes } from "react";
import {
  buttonBase,
  buttonColor,
  iconButtonSize,
  type ButtonHtmlType,
  type ButtonSize,
  type ButtonStyleType,
  type ButtonVariant,
} from "./buttonStyles";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "aria-label"
> & {
  /** 디자인 시스템 type (네이티브 type은 htmlType 사용) */
  type?: ButtonStyleType;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
    buttonColor[type][variant],
    iconButtonSize[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={htmlType} className={classes} {...props} />;
}
