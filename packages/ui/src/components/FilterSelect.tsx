"use client";

import type { ButtonHTMLAttributes, SVGProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type FilterSelectSize = "xsmall" | "small" | "medium" | "large";
export type FilterSelectState = "default" | "focused" | "disabled";

/**
 * FilterSelect — 필터 칩(드롭다운 트리거). Figma 속성과 1:1.
 *
 *   Size  = XSmall | Small | Medium | Large   → 치수·폰트·caret 크기
 *   State = Default | Focused | Disabled       → 색 (State 는 사이즈와 무관)
 *   Active = false | true                       → caret ▼/▲ (드롭다운 열림)
 *
 * caret 은 currentColor 라 텍스트색(State)을 따라간다. 칩 배경은 항상 rounded-full.
 */
const filterSelectVariants = cva(
  [
    "inline-flex items-center justify-center gap-0.5 rounded-full border font-medium",
    "transition-colors disabled:cursor-not-allowed [&_svg]:shrink-0",
  ],
  {
    variants: {
      size: {
        xsmall: "h-6 py-1 pr-1.5 pl-2 text-caption-1 [&_svg]:size-3",
        small: "h-8 py-1.5 pr-2 pl-2.5 text-label-1 [&_svg]:size-4",
        medium: "h-9 py-[7px] pr-2.5 pl-3 text-body-2 [&_svg]:size-4",
        large: "h-10 py-[9px] pr-3 pl-3.5 text-body-2 [&_svg]:size-4",
      },
      state: {
        // bg 미지정(투명) — Figma Default/Disabled 는 fill 없음
        default: "border-gray-200 text-gray-800",
        focused: "bg-blue-100 border-blue-600 text-blue-600",
        disabled: "border-gray-200 text-gray-400",
      },
    },
    defaultVariants: {
      size: "medium",
      state: "default",
    },
  },
);

export type FilterSelectVariantProps = VariantProps<typeof filterSelectVariants>;

export type FilterSelectProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: FilterSelectSize;
  state?: FilterSelectState;
  /** 드롭다운 열림 상태 — caret ▲ + aria-expanded */
  active?: boolean;
};

export function FilterSelect({
  size = "medium",
  state = "default",
  active = false,
  type = "button",
  disabled,
  className,
  children,
  ...props
}: FilterSelectProps) {
  return (
    <button
      type={type}
      data-slot="filter-select"
      data-active={active}
      aria-expanded={active}
      disabled={disabled ?? state === "disabled"}
      className={cn(filterSelectVariants({ size, state }), className)}
      // Wanted Sans 스타일 세트(ss10)
      style={{ fontFeatureSettings: "'ss10'" }}
      {...props}
    >
      <span>{children}</span>
      <CaretDownIcon
        className={cn("transition-transform", active && "rotate-180")}
        aria-hidden
      />
    </button>
  );
}

/** Small Caret Down (16px viewBox, currentColor). active 시 180° 회전해 ▲ */
function CaretDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
