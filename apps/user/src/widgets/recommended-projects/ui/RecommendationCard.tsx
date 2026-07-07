import type { SVGProps } from "react";
import { cn } from "@/shared/lib/utils";
import type { RecommendedProject } from "@/entities/project";

/**
 * RecommendationCard — 맞춤 추천 캐러셀 카드 (Figma: 300×160, rounded-16).
 *
 *   featured : bg blue-600 · 텍스트 blue-50 계열
 *   일반      : bg white · border gray-200 · 텍스트 gray-800/500
 *
 * 상단 마감 태그(흰 배경·연한 빨강 보더·error 텍스트) + 관심 하트,
 * 중앙 이름/분야, 하단 우측 조회수·좋아요 통계.
 */
export type RecommendationCardProps = {
  project: RecommendedProject;
  onToggleLike?: (id: string) => void;
};

export default function RecommendationCard({
  project,
  onToggleLike,
}: RecommendationCardProps) {
  const { id, name, field, dday, views, likes, liked = false, featured } =
    project;

  return (
    <article
      className={cn(
        "relative flex h-40 w-[300px] shrink-0 flex-col justify-between rounded-2xl p-4",
        featured ? "bg-blue-600" : "border border-gray-200 bg-white",
      )}
    >
      {/* 상단: 마감 태그 + 관심 */}
      <div className="flex items-start justify-between">
        {/* 마감 태그 — 연한 빨강 보더(#FFACAC, 토큰 없음) */}
        <span className="inline-flex h-5 items-center gap-1 rounded-full border border-[#FFACAC] bg-white px-2 text-caption-2 font-medium text-error">
          <span aria-hidden>🚨</span>
          {dday}
        </span>

        <button
          type="button"
          aria-label={liked ? "관심 해제" : "관심"}
          aria-pressed={liked}
          onClick={() => onToggleLike?.(id)}
          className={featured ? "text-blue-50" : "text-gray-400"}
        >
          <HeartIcon className="size-6" filled={liked} aria-hidden />
        </button>
      </div>

      {/* 중앙: 이름 / 분야 */}
      <div className="flex flex-col gap-1">
        <h3
          className={cn(
            "line-clamp-1 text-body-1 font-semibold",
            featured ? "text-blue-50" : "text-gray-800",
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "line-clamp-1 text-label-2 font-medium",
            featured ? "text-blue-200" : "text-gray-500",
          )}
        >
          {field}
        </p>
      </div>

      {/* 하단 우측: 조회수 · 좋아요 */}
      <div
        className={cn(
          "flex items-center justify-end gap-1 text-caption-1 font-medium",
          featured ? "text-blue-50" : "text-gray-500",
        )}
      >
        <EyeIcon className="size-4" aria-hidden />
        <span>{views}</span>
        <HeartIcon className="ml-1 size-4" aria-hidden />
        <span>{likes}</span>
      </div>
    </article>
  );
}

/* ── 아이콘 ─────────────────────────────────────────────────────── */

function HeartIcon({
  filled,
  ...props
}: SVGProps<SVGSVGElement> & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 20.25c-.3 0-.6-.11-.83-.32C6.36 15.6 3.75 13.17 3.75 9.9 3.75 7.5 5.6 5.7 7.88 5.7c1.3 0 2.53.61 3.32 1.62l.8 1.02.8-1.02A4.15 4.15 0 0 1 16.12 5.7c2.28 0 4.13 1.8 4.13 4.2 0 3.27-2.61 5.7-7.42 10.03-.23.21-.53.32-.83.32Z" />
    </svg>
  );
}

function EyeIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M2.25 12S5.25 5.25 12 5.25 21.75 12 21.75 12 18.75 18.75 12 18.75 2.25 12 2.25 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
