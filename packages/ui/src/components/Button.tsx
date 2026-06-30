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

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> &
  ButtonColorProps & {
    size?: ButtonSize;
    /** 네이티브 button type (디자인 시스템 type과 구분) */
    htmlType?: ButtonHtmlType;
    /** 자식 요소로 렌더링 (예: 링크 버튼 — `<Button asChild><a/></Button>`) */
    asChild?: boolean;
  };

export function Button({
  type = "solid",
  variant = "primary",
  size = "m",
  htmlType = "button",
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ type, variant, size }), className)}
      {...(asChild ? {} : { type: htmlType })}
      {...props}
    />
  );
}
