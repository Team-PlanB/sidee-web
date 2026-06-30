import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

/**
 * Tooltip 버블 — Figma 컴포넌트 속성과 1:1.
 *
 *   Figma:  Description=False (제목만) | Description=True (제목 + 설명)
 *
 * 설명(description) 제공 여부로 레이아웃이 갈린다(가로 1줄 vs 세로 2줄).
 * 이 컴포넌트는 버블 비주얼만 담당한다 — hover/포커스 트리거·위치 지정은
 * 호출부에서 합성하거나 Radix Tooltip 으로 감싼다.
 */
export const tooltipVariants = cva(
  "inline-flex w-fit rounded-[4px] bg-gray-800 px-2 py-1",
  {
    variants: {
      hasDescription: {
        false: "flex-row items-center",
        true: "flex-col items-start gap-1",
      },
    },
    defaultVariants: {
      hasDescription: false,
    },
  },
);

export type TooltipVariantProps = VariantProps<typeof tooltipVariants>;

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  /** 제목 메시지 (항상 표시) */
  message: ReactNode;
  /** 설명 메시지 (있으면 두 번째 줄로 표시, Description=True) */
  description?: ReactNode;
};

export function Tooltip({
  message,
  description,
  className,
  style,
  ...props
}: TooltipProps) {
  return (
    <div
      role="tooltip"
      data-slot="tooltip"
      className={cn(
        tooltipVariants({ hasDescription: description != null }),
        className,
      )}
      // Wanted Sans 스타일 세트(ss10) — Figma `font-feature-settings: 'ss10'`
      style={{ fontFeatureSettings: "'ss10'", ...style }}
      {...props}
    >
      <span className="text-caption-2 font-medium text-white">{message}</span>
      {description != null && (
        <span className="text-caption-2 font-medium text-gray-300">
          {description}
        </span>
      )}
    </div>
  );
}
