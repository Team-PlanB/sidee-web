"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SVGProps,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type SearchFieldSize = "l" | "m";

/**
 * SearchField — Figma 컴포넌트 속성과 1:1 (Size=L|M, Active=OFF|ON).
 *
 * 보더는 두 상태 모두 gray-200 으로 동일하다. Active=ON 에서 바뀌는 것:
 *  - gap 4px → 8px
 *  - 검색 아이콘 gray-400 → gray-800
 *  - 우측 아이콘 슬롯(trailing, 예: 지우기) 표시
 *  - 입력 텍스트 gray-800 (placeholder 는 항상 gray-400 — input 이 자동 처리)
 *
 * `active` 는 보통 "입력값 있음/포커스" 를 호출부에서 매핑한다
 * (예: `active={query.length > 0}`).
 */
const searchFieldVariants = cva(
  [
    "box-border flex w-full flex-row items-center bg-white",
    "rounded-full border border-gray-200 transition-colors",
  ],
  {
    variants: {
      size: {
        l: "h-12 px-4 py-3",
        m: "h-10 px-3 py-2",
      },
      active: {
        true: "gap-2",
        false: "gap-1",
      },
    },
    defaultVariants: {
      size: "l",
      active: false,
    },
  },
);

export type SearchFieldVariantProps = VariantProps<typeof searchFieldVariants>;

export type SearchFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  size?: SearchFieldSize;
  /** Active=ON 비주얼 (gap 확장 · 아이콘 강조 · trailing 표시). 기본 false */
  active?: boolean;
  /** 우측 아이콘 슬롯 (예: 지우기 버튼). active 일 때 표시. */
  trailing?: ReactNode;
};

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      size = "l",
      active = false,
      trailing,
      className,
      placeholder = "검색어를 입력해주세요",
      ...props
    },
    ref,
  ) {
    return (
      <div
        data-slot="search-field"
        data-active={active}
        className={cn(searchFieldVariants({ size, active }), className)}
        // Wanted Sans 스타일 세트(ss10) — 자식 input 에 상속
        style={{ fontFeatureSettings: "'ss10'" }}
      >
        <SearchIcon
          className={cn(
            "size-5 shrink-0",
            active ? "text-gray-800" : "text-gray-400",
          )}
          aria-hidden
        />
        <input
          ref={ref}
          type="search"
          placeholder={placeholder}
          className={cn(
            "min-w-0 flex-1 bg-transparent outline-none",
            "text-body-1 text-gray-800 placeholder:text-gray-400",
          )}
          {...props}
        />
        {active && trailing != null && (
          <span className="grid size-6 shrink-0 place-items-center text-gray-800">
            {trailing}
          </span>
        )}
      </div>
    );
  },
);

/** 검색 돋보기 아이콘 (20px, currentColor) */
function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m14 14 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
