"use client";

import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/**
 * PaginationItem — 페이지 번호 셀 (Figma: Pagination_cell).
 *
 * 30×30 고정 박스. 논리 상태(default/selected/disabled)는 prop 으로,
 * 상호작용 상태(hover/pressed/focused)는 pseudo-class 로 표현한다.
 *
 *   Default  : text gray-800 · Body 2/Regular
 *   Hover    : bg gray-100
 *   Pressed  : bg gray-200 (:active)
 *   Focused  : bg white · border 2px blue-600 · Body 2/Bold (:focus-visible)
 *   Selected : bg blue-100 · text blue-600 · Body 2/Bold (+ aria-current=page)
 *   Disabled : text gray-400 (+ native disabled)
 *
 * focus 시 2px border 로 인한 레이아웃 시프트를 막기 위해 항상 투명 2px
 * border 를 깔아 30×30 을 유지한다.
 */
const paginationItemVariants = cva(
  [
    "inline-flex size-[30px] items-center justify-center rounded-[2px]",
    "border-2 border-transparent px-[7px] py-px text-body-2",
    "transition-colors disabled:cursor-not-allowed",
    "focus-visible:border-blue-600 focus-visible:bg-white focus-visible:font-semibold focus-visible:outline-none",
  ],
  {
    variants: {
      state: {
        default:
          "font-normal text-gray-800 hover:bg-gray-100 active:bg-gray-200",
        selected: "bg-blue-100 font-semibold text-blue-600",
        disabled: "font-normal text-gray-400",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export type PaginationItemVariantProps = VariantProps<
  typeof paginationItemVariants
>;

export type PaginationItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 현재 페이지 (Selected). disabled 보다 우선순위가 낮다. */
  selected?: boolean;
};

export function PaginationItem({
  selected = false,
  disabled,
  type = "button",
  className,
  children,
  ...props
}: PaginationItemProps) {
  const state = disabled ? "disabled" : selected ? "selected" : "default";

  return (
    <button
      type={type}
      data-slot="pagination-item"
      data-state={state}
      aria-current={state === "selected" ? "page" : undefined}
      disabled={disabled}
      className={cn(paginationItemVariants({ state }), className)}
      // Wanted Sans 스타일 세트(ss10)
      style={{ fontFeatureSettings: "'ss10'" }}
      {...props}
    >
      {children}
    </button>
  );
}
