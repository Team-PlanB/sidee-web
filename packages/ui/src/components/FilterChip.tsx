"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type FilterChipSize = "xsmall" | "small" | "medium" | "large";

/**
 * FilterChip — 선택 토글 칩. Figma 속성과 1:1 (Size, State=Default|Selected|Disabled).
 *
 *   Default  : 투명 · border gray-200 · text gray-800
 *   Selected : bg blue-100 · border blue-600 · text blue-600
 *   Disabled : 투명 · border gray-200 · text gray-400 (+ native disabled)
 *
 * 양쪽 아이콘 슬롯(leadingIcon/trailingIcon)은 옵션. 아이콘 크기는 size 를 따른다.
 */
const filterChipVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 rounded-full border font-medium",
    "transition-colors disabled:cursor-not-allowed [&_svg]:shrink-0",
  ],
  {
    variants: {
      size: {
        xsmall: "h-6 px-2 py-1 text-caption-1 [&_svg]:size-3",
        small: "h-8 px-[9px] py-1.5 text-label-1 [&_svg]:size-4",
        medium: "h-9 px-3 py-[7px] text-body-2 [&_svg]:size-[18px]",
        large: "h-10 px-3.5 py-[9px] text-body-2 [&_svg]:size-5",
      },
      state: {
        default: "border-gray-200 text-gray-800",
        selected: "bg-blue-100 border-blue-600 text-blue-600",
        disabled: "border-gray-200 text-gray-400",
      },
    },
    defaultVariants: {
      size: "medium",
      state: "default",
    },
  },
);

export type FilterChipVariantProps = VariantProps<typeof filterChipVariants>;

export type FilterChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: FilterChipSize;
  /** 선택 상태 (Selected) */
  selected?: boolean;
  /** 좌측 아이콘 슬롯 */
  leadingIcon?: ReactNode;
  /** 우측 아이콘 슬롯 */
  trailingIcon?: ReactNode;
};

export function FilterChip({
  size = "medium",
  selected = false,
  leadingIcon,
  trailingIcon,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: FilterChipProps) {
  const state = disabled ? "disabled" : selected ? "selected" : "default";

  return (
    <button
      type={type}
      data-slot="filter-chip"
      data-state={state}
      aria-pressed={selected}
      disabled={disabled}
      className={cn(filterChipVariants({ size, state }), className)}
      // Wanted Sans 스타일 세트(ss10)
      style={{ fontFeatureSettings: "'ss10'" }}
      {...props}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  );
}
