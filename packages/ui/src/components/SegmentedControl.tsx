"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * SegmentedControl — 하나만 선택되는 아이콘/텍스트 세그먼트 토글
 * (Figma: Segemented Controls). 뷰 전환(카드/리스트) 등에 쓴다.
 *
 *   컨테이너 : border gray-200 · rounded-full · h-32
 *   세그먼트  : 40×32 버튼 안 34×24 asset(rounded-12, px-8, gap-4, 아이콘 18px)
 *   active   : asset bg blue-100 · 아이콘/텍스트 blue-600
 *   inactive : 투명 · gray-400
 *
 * 단일 선택이라 radiogroup/radio 시맨틱을 쓴다. 라벨이 없으면 `ariaLabel` 필수.
 */
export type SegmentedControlItem<T extends string = string> = {
  value: T;
  icon?: ReactNode;
  /** 표시 라벨 (Label 1/Bold). 생략 시 아이콘만. */
  label?: string;
  /** 접근성 라벨 (label 없을 때 필수) */
  ariaLabel?: string;
};

export type SegmentedControlProps<T extends string = string> = {
  items: SegmentedControlItem<T>[];
  value: T;
  onChange?: (value: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string = string>({
  items,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "inline-flex h-8 items-center rounded-full border border-gray-200",
        className,
      )}
    >
      {items.map((item, i) => {
        const active = item.value === value;
        const isLeading = i === 0;

        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={item.ariaLabel ?? item.label}
            data-state={active ? "active" : "inactive"}
            onClick={() => onChange?.(item.value)}
            className={cn(
              "flex h-8 w-10 items-center justify-center py-1",
              isLeading ? "pl-1.5" : "pr-1.5",
            )}
          >
            <span
              className={cn(
                "flex h-6 items-center justify-center gap-1 rounded-[12px] px-2 [&_svg]:size-[18px] [&_svg]:shrink-0",
                active ? "bg-blue-100 text-blue-600" : "text-gray-400",
              )}
            >
              {item.icon}
              {item.label && (
                <span className="text-label-1 font-semibold">{item.label}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
