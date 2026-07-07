"use client";

import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { PaginationArrow } from "./PaginationArrow";
import { PaginationEllipsis } from "./PaginationEllipsis";
import { PaginationItem } from "./PaginationItem";

export type PaginationType = "long" | "default";

/**
 * Pagination — 페이지네이션 바 (Figma: Pagination_page).
 *
 *   type=long    : `« ‹ 1 … 8 9 10 … 17 › »` — 처음/마지막 이중 화살표 + … 절단
 *   type=default : `‹ 1 2 3 4 5 › ` — 이전/다음만, 전체 페이지 노출
 *   type=empty   : count=1 일 때 default 에서 화살표가 자동 disabled 되어 파생
 *
 * 컨트롤 간격은 4px(gap-1). 처음/이전, 다음/마지막 화살표 쌍은 -4px 겹침
 * (Figma 56px 그룹, `-space-x-1`).
 */
export type PaginationProps = Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> & {
  /** 현재 페이지 (1-based) */
  page: number;
  /** 전체 페이지 수 */
  count: number;
  /** 페이지 변경 콜백 */
  onChange?: (page: number) => void;
  /** 레이아웃 타입. 기본 default */
  type?: PaginationType;
  /** long: 현재 페이지 양옆에 노출할 형제 수. 기본 1 */
  siblingCount?: number;
  /** long: 양 끝에 항상 노출할 경계 페이지 수. 기본 1 */
  boundaryCount?: number;
};

export function Pagination({
  page,
  count,
  onChange,
  type = "default",
  siblingCount = 1,
  boundaryCount = 1,
  className,
  ...props
}: PaginationProps) {
  const total = Math.max(count, 1);
  const current = Math.min(Math.max(page, 1), total);
  const isFirst = current <= 1;
  const isLast = current >= total;

  const go = (target: number) => {
    if (target >= 1 && target <= total && target !== current) {
      onChange?.(target);
    }
  };

  const items =
    type === "long"
      ? getPaginationRange({
          page: current,
          count: total,
          siblingCount,
          boundaryCount,
        })
      : range(1, total);

  return (
    <nav
      aria-label="페이지네이션"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {type === "long" ? (
        <div className="flex items-center -space-x-1">
          <PaginationArrow
            direction="first"
            disabled={isFirst}
            onClick={() => go(1)}
          />
          <PaginationArrow
            direction="prev"
            disabled={isFirst}
            onClick={() => go(current - 1)}
          />
        </div>
      ) : (
        <PaginationArrow
          direction="prev"
          disabled={isFirst}
          onClick={() => go(current - 1)}
        />
      )}

      {items.map((item, i) =>
        item === "ellipsis" ? (
          <PaginationEllipsis key={`ellipsis-${i}`} />
        ) : (
          <PaginationItem
            key={item}
            selected={item === current}
            onClick={() => go(item)}
          >
            {item}
          </PaginationItem>
        ),
      )}

      {type === "long" ? (
        <div className="flex items-center -space-x-1">
          <PaginationArrow
            direction="next"
            disabled={isLast}
            onClick={() => go(current + 1)}
          />
          <PaginationArrow
            direction="last"
            disabled={isLast}
            onClick={() => go(total)}
          />
        </div>
      ) : (
        <PaginationArrow
          direction="next"
          disabled={isLast}
          onClick={() => go(current + 1)}
        />
      )}
    </nav>
  );
}

/* ── 페이지 범위 계산 (MUI usePagination 알고리즘) ─────────────────── */

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length: Math.max(length, 0) }, (_, i) => start + i);
}

type PaginationRangeItem = number | "ellipsis";

function getPaginationRange({
  page,
  count,
  siblingCount,
  boundaryCount,
}: {
  page: number;
  count: number;
  siblingCount: number;
  boundaryCount: number;
}): PaginationRangeItem[] {
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  );

  const siblingsStart = Math.max(
    Math.min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  return [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2
      ? (["ellipsis"] as const)
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < count - boundaryCount - 1
      ? (["ellipsis"] as const)
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),
    ...endPages,
  ];
}
