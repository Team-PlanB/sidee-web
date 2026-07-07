"use client";

import type { ButtonHTMLAttributes, SVGProps } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";

export type PaginationArrowDirection = "first" | "prev" | "next" | "last";

/**
 * PaginationArrow — 페이지 이동 화살표 버튼 (Figma: Pagination_elipsis / caret).
 *
 * PaginationItem 과 동일한 30×30 박스·상호작용 상태를 공유하되 내용은 caret
 * 아이콘이다. 아이콘 색은 텍스트 색(currentColor)을 따른다.
 *
 *   first : Caretdouble_left   prev : Caret_left
 *   next  : Caret_right        last : Caretdouble_right
 *
 *   Default  : icon gray-800   Disabled : icon gray-400 (+ native disabled)
 *   Hover    : bg gray-100     Pressed  : bg gray-200
 *   Focused  : bg white · border 2px blue-600
 */
const paginationArrowVariants = cva([
  "inline-flex size-[30px] items-center justify-center rounded-[2px]",
  "border-2 border-transparent text-gray-800 transition-colors [&_svg]:shrink-0",
  "hover:bg-gray-100 active:bg-gray-200",
  "focus-visible:border-blue-600 focus-visible:bg-white focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:text-gray-400",
  "disabled:hover:bg-transparent disabled:active:bg-transparent",
]);

const ICONS: Record<
  PaginationArrowDirection,
  (props: SVGProps<SVGSVGElement>) => React.JSX.Element
> = {
  first: CaretDoubleLeftIcon,
  prev: CaretLeftIcon,
  next: CaretRightIcon,
  last: CaretDoubleRightIcon,
};

const LABELS: Record<PaginationArrowDirection, string> = {
  first: "처음 페이지",
  prev: "이전 페이지",
  next: "다음 페이지",
  last: "마지막 페이지",
};

export type PaginationArrowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: PaginationArrowDirection;
};

export function PaginationArrow({
  direction,
  type = "button",
  className,
  "aria-label": ariaLabel,
  ...props
}: PaginationArrowProps) {
  const Icon = ICONS[direction];

  return (
    <button
      type={type}
      data-slot="pagination-arrow"
      data-direction={direction}
      aria-label={ariaLabel ?? LABELS[direction]}
      className={cn(paginationArrowVariants(), className)}
      {...props}
    >
      <Icon className="size-[18px]" aria-hidden />
    </button>
  );
}

/* ── 아이콘 (18×18, viewBox 24) — stroke=currentColor ─────────────── */

function CaretLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 7 9.5 12l5 5" />
    </svg>
  );
}

function CaretRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9.5 7 14.5 12l-5 5" />
    </svg>
  );
}

function CaretDoubleLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 7 12 12l5 5M11 7 6 12l5 5" />
    </svg>
  );
}

function CaretDoubleRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 7 12 12l-5 5M13 7 18 12l-5 5" />
    </svg>
  );
}
