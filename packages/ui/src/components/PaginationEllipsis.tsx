import type { HTMLAttributes, SVGProps } from "react";
import { cn } from "../lib/cn";

/**
 * PaginationEllipsis — 생략(…) 표시 (Figma: Pagination_elipsis / dots-horizontal).
 *
 * 페이지 절단 구간을 나타내는 **비인터랙티브** 인디케이터. 화살표/셀과 동일한
 * 30×30 박스를 차지하며 dots-horizontal 아이콘(gray-800)만 보인다.
 */
export type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>;

export function PaginationEllipsis({
  className,
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn(
        "inline-flex size-[30px] items-center justify-center rounded-[2px] text-gray-800",
        className,
      )}
      {...props}
    >
      <DotsHorizontalIcon className="size-4" aria-hidden />
      <span className="sr-only">생략된 페이지</span>
    </span>
  );
}

function DotsHorizontalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <circle cx="3" cy="8" r="1.2" />
      <circle cx="8" cy="8" r="1.2" />
      <circle cx="13" cy="8" r="1.2" />
    </svg>
  );
}
