import type { SVGProps } from "react";
import Link from "next/link";
import { AppLogo, Tag } from "@sidee/ui";
import type { Project } from "@/entities/project";

/**
 * ProjectCard — 전체 프로젝트 카드형의 한 카드
 * (Figma: Frame 2085667920 — 300×208 · border gray-200 · rounded-16 · p-[12/16]).
 *
 * 상단(마감 태그 + 관심 하트) / 제목 / 포지션 태그 + 기술스택 원 /
 * 하단(작성자 아바타+닉네임 · 조회수·좋아요 통계 gray-400).
 */
export type ProjectCardProps = {
  project: Project;
  onToggleLike?: (id: string) => void;
};

export default function ProjectCard({
  project,
  onToggleLike,
}: ProjectCardProps) {
  const {
    id,
    title,
    positions,
    techStack,
    deadline,
    dday,
    author,
    liked = false,
    viewCount,
    likeCount,
  } = project;

  return (
    <article className="relative flex h-[208px] flex-col justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3">
      {/* 카드 전체를 덮는 상세 이동 링크. 하트 버튼만 위(z-10)로 올려 예외 처리한다. */}
      <Link
        href={`/projects/${id}`}
        aria-label={`${title} 상세 보기`}
        className="absolute inset-0 rounded-2xl"
      />
      <div className="flex flex-col gap-4">
        {/* 마감 태그 + 관심 */}
        <div className="flex items-center justify-between">
          <Tag type="outlined" variant="neutral" size="xs">
            {dday ?? `마감 ${deadline}`}
          </Tag>
          <button
            type="button"
            aria-label={liked ? "관심 해제" : "관심"}
            aria-pressed={liked}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleLike?.(id);
            }}
            className="relative z-10 cursor-pointer text-gray-800"
          >
            <HeartIcon className="size-6" filled={liked} aria-hidden />
          </button>
        </div>

        {/* 제목 + 포지션 + 기술스택 */}
        <div className="flex flex-col gap-4">
          <h3 className="line-clamp-1 text-body-1 font-semibold text-gray-800">
            {title}
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1">
              {positions.map((position) => (
                <Tag key={position} type="outlined" variant="neutral" size="xs">
                  {position}
                </Tag>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  aria-label={tech.name}
                  title={tech.name}
                  className="size-5 rounded-full"
                  style={{ backgroundColor: tech.color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 작성자 + 통계 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="flex size-6 items-center justify-center overflow-hidden rounded-full">
            <AppLogo className="size-full" aria-hidden />
          </span>
          <span className="text-caption-1 font-medium text-gray-500">
            {author.nickname}
          </span>
        </div>

        <div className="flex items-center gap-1 text-caption-1 font-medium text-gray-400">
          <EyeIcon className="size-4" aria-hidden />
          <span>{viewCount}</span>
          <HeartIcon className="ml-1 size-4" aria-hidden />
          <span>{likeCount}</span>
        </div>
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
