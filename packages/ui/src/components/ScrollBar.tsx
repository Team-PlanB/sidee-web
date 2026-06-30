import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type ScrollBarSize = "default" | "large";

/**
 * ScrollBar — 세로 스크롤바 인디케이터. Figma 속성과 대응 (size=Default|Large).
 *
 * 트랙(히트) 영역은 두 사이즈 모두 12px(w-3) + 상하 4px(py-1) 패딩.
 * thumb 는 gray-300 / rounded-full, 폭만 사이즈별로 다름(Default 6px / Large 10px).
 * thumb 의 높이·위치는 스크롤 비율을 반영하므로 percent 로 제어한다
 * (`thumbSize` = 트랙 대비 thumb 높이 %, `thumbOffset` = 위에서부터 % 위치).
 */
const thumbVariants = cva("absolute left-1/2 -translate-x-1/2 rounded-full bg-gray-300", {
  variants: {
    size: {
      default: "w-1.5",
      large: "w-2.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type ScrollBarVariantProps = VariantProps<typeof thumbVariants>;

export type ScrollBarProps = HTMLAttributes<HTMLDivElement> & {
  size?: ScrollBarSize;
  /** 트랙 대비 thumb 높이 (0–100%). 기본 100 (꽉 참) */
  thumbSize?: number;
  /** 위에서부터 thumb 위치 (0–100%). 기본 0 */
  thumbOffset?: number;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export function ScrollBar({
  size = "default",
  thumbSize = 100,
  thumbOffset = 0,
  className,
  ...props
}: ScrollBarProps) {
  const height = clamp(thumbSize, 0, 100);
  const offset = clamp(thumbOffset, 0, 100 - height);

  return (
    <div
      data-slot="scroll-bar"
      className={cn("flex h-full w-3 flex-col py-1", className)}
      {...props}
    >
      <div className="relative flex-1">
        <div
          data-slot="scroll-thumb"
          className={thumbVariants({ size })}
          style={{ height: `${height}%`, top: `${offset}%` }}
        />
      </div>
    </div>
  );
}
