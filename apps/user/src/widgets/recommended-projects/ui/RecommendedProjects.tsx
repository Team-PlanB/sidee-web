"use client";

import { useRef, useState } from "react";
import { PaginationArrow } from "@sidee/ui";
import { mockRecommended, type RecommendedProject } from "@/entities/project";
import RecommendationCard from "./RecommendationCard";

/**
 * RecommendedProjects — "OOO님 맞춤 추천 🔔" 캐러셀 섹션
 * (Figma: Frame 2085667911).
 *
 * 헤더(제목 · 전체보기 텍스트버튼 · 이전/다음 화살표) + 가로 스크롤 카드 목록.
 * 화살표는 캐러셀을 카드 폭만큼 스크롤한다.
 */
export type RecommendedProjectsProps = {
  userName?: string;
  projects?: RecommendedProject[];
  onViewAll?: () => void;
};

// 카드 300 + gap 16
const SCROLL_STEP = 316;

export default function RecommendedProjects({
  userName = "000",
  projects = mockRecommended,
  onViewAll,
}: RecommendedProjectsProps) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const scrollByStep = (dir: -1 | 1) =>
    scrollerRef.current?.scrollBy?.({
      left: dir * SCROLL_STEP,
      behavior: "smooth",
    });

  const toggleLike = (id: string) =>
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section aria-label="맞춤 추천" className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <h2 className="text-title-3 font-bold text-gray-800">
          {userName}님 맞춤 추천 🔔
        </h2>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onViewAll}
            className="text-label-1 font-bold text-gray-600"
          >
            전체보기
          </button>

          <div className="flex items-center rounded-full border border-gray-200">
            <PaginationArrow direction="prev" onClick={() => scrollByStep(-1)} />
            <PaginationArrow direction="next" onClick={() => scrollByStep(1)} />
          </div>
        </div>
      </header>

      <ul
        ref={scrollerRef}
        aria-label="추천 프로젝트 목록"
        className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <li key={project.id}>
            <RecommendationCard
              project={{ ...project, liked: likes[project.id] ?? project.liked }}
              onToggleLike={toggleLike}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
