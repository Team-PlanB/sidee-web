import type { SVGProps } from "react";
import { AppLogo, Tag } from "@sidee/ui";
import type { Project } from "@/entities/project";

/**
 * ProjectListRow — 전체 프로젝트 리스트형의 한 행(카드).
 * (Figma: Frame 2085667918 — border gray-200 · rounded-16 · p-16)
 *
 * 상단: 제목(438) · 포지션 태그(284) · 게시일+상대시간(283) · 마감일+관심(283)
 * 하단: 기술스택 색상 원 · 작성자 아바타+닉네임 · 조회수
 */
export type ProjectListRowProps = {
  project: Project;
  onToggleLike?: (id: string) => void;
};

export default function ProjectListRow({
  project,
  onToggleLike,
}: ProjectListRowProps) {
  const {
    id,
    title,
    positions,
    techStack,
    postedAt,
    postedAgo,
    deadline,
    author,
    liked = false,
    viewCount,
  } = project;

  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4">
      {/* 상단: 제목 · 포지션 · 게시일 · 마감일 */}
      <div className="flex items-start gap-6">
        <h3 className="line-clamp-2 w-[438px] text-body-1 font-semibold text-gray-800">
          {title}
        </h3>

        <div className="flex w-[284px] flex-wrap content-start gap-1">
          {positions.map((position) => (
            <Tag key={position} type="outlined" variant="neutral" size="xs">
              {position}
            </Tag>
          ))}
        </div>

        <div className="flex w-[283px] items-start gap-3">
          <span className="text-body-1 text-gray-800">{postedAt}</span>
          <span className="text-body-1 text-gray-500">{postedAgo}</span>
        </div>

        <div className="flex flex-1 items-start gap-2">
          <span className="text-body-1 text-gray-800">{deadline}</span>
          <button
            type="button"
            aria-label={liked ? "관심 해제" : "관심"}
            aria-pressed={liked}
            onClick={() => onToggleLike?.(id)}
            className="ml-auto text-blue-800"
          >
            <HeartIcon className="size-6" filled={liked} aria-hidden />
          </button>
        </div>
      </div>

      {/* 하단: 기술스택 · 작성자 · 조회수 */}
      <div className="flex items-center justify-between gap-4">
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

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <span className="flex size-6 items-center justify-center overflow-hidden rounded-full">
              <AppLogo className="size-full" aria-hidden />
            </span>
            <span className="text-caption-1 font-medium text-gray-500">
              {author.nickname}
            </span>
          </div>

          {viewCount != null && (
            <div className="flex items-center gap-1 text-gray-500">
              <EyeIcon className="size-4" aria-hidden />
              <span className="text-caption-1 font-medium">{viewCount}</span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

/* ── 아이콘 (에셋: assets/svg/heart · eye) ─────────────────────────── */

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
