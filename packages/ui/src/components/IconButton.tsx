"use client";

import type { ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import {
  buttonVariants,
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
    /** 자식 요소로 렌더링 (예: 링크 아이콘 버튼) */
    asChild?: boolean;
    /** 아이콘만 있는 버튼이므로 접근성 이름 필수 */
    "aria-label": string;
  };

export function IconButton({
  type = "solid",
  variant = "primary",
  size = "m",
  htmlType = "button",
  asChild = false,
  className,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="icon-button"
      className={cn(
        buttonVariants({ type, variant, size, iconOnly: true }),
        className,
      )}
      {...(asChild ? {} : { type: htmlType })}
      {...props}
    />
  );
}
