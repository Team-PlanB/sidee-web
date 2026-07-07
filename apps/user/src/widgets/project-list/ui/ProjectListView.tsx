"use client";

import { useState, type SVGProps } from "react";
import {
  FilterChip,
  Pagination,
  SearchField,
  SegmentedControl,
  Select,
} from "@sidee/ui";
import { mockProjects, type Project } from "@/entities/project";
import ProjectCard from "./ProjectCard";
import ProjectListRow from "./ProjectListRow";

type ViewMode = "list" | "card";

/**
 * ProjectListView — "전체 프로젝트" 리스트형 섹션 (Figma: Frame 2085667927).
 *
 * 헤더(제목 + 카드/리스트 SegmentedControl) · 필터바(정렬 Select · 관심/조회 Chip ·
 * 검색) · 테이블(헤더행 + ProjectListRow 목록)으로 구성한다.
 *
 * 데이터는 props.projects (기본 목업). 카드뷰는 후속 — 현재는 토글만 동작.
 */
export type ProjectListViewProps = {
  projects?: Project[];
};

const COLS = {
  title: "w-[438px]",
  positions: "w-[284px]",
  posted: "w-[283px]",
  deadline: "flex-1",
};

export default function ProjectListView({
  projects = mockProjects,
}: ProjectListViewProps) {
  const [view, setView] = useState<ViewMode>("list");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [likes, setLikes] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) =>
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="flex w-full flex-col gap-4">
      {/* 헤더: 제목 + 뷰 토글 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-title-3 font-bold text-gray-800">전체 프로젝트</h2>

          <SegmentedControl<ViewMode>
            value={view}
            onChange={setView}
            items={[
              {
                value: "card",
                ariaLabel: "카드로 보기",
                icon: <GridIcon />,
              },
              {
                value: "list",
                ariaLabel: "리스트로 보기",
                icon: <ListIcon />,
              },
            ]}
          />
        </div>

        {/* 필터바: 정렬 Select · 관심/조회 Chip · 검색 */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Select value="분야" active={false} className="w-fit" />
            <Select value="정렬" active={false} className="w-fit" />
            <FilterChip size="small">관심</FilterChip>
            <FilterChip size="small">조회</FilterChip>
          </div>

          <div className="w-[320px]">
            <SearchField
              size="m"
              placeholder="검색어를 입력해주세요"
              value={query}
              active={query.length > 0}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {view === "card" ? (
        <div className="flex flex-col gap-8">
          <ul
            aria-label="프로젝트 목록"
            className="grid grid-cols-4 gap-5"
          >
            {projects.map((project) => (
              <li key={project.id}>
                <ProjectCard
                  project={{
                    ...project,
                    liked: likes[project.id] ?? project.liked,
                  }}
                  onToggleLike={toggleLike}
                />
              </li>
            ))}
          </ul>

          <Pagination
            type="long"
            page={page}
            count={17}
            onChange={setPage}
            className="self-center"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* 테이블 헤더 */}
          <div className="flex items-start gap-6 border-b border-gray-500 px-4 py-4 text-label-1 font-medium text-gray-500">
            <span className={COLS.title}>프로젝트 제목</span>
            <span className={COLS.positions}>모집 포지션</span>
            <span className={COLS.posted}>게시일</span>
            <span className={COLS.deadline}>마감일</span>
          </div>

          {/* 행 목록 */}
          <ul aria-label="프로젝트 목록" className="flex flex-col gap-5">
            {projects.map((project) => (
              <ProjectListRow
                key={project.id}
                project={{ ...project, liked: likes[project.id] ?? project.liked }}
                onToggleLike={toggleLike}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

/* ── 아이콘 (에셋: assets/svg/localmenu · Hamburger-fill) ──────────── */

function GridIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M9.508 12.646a1.85 1.85 0 0 1 1.847 1.856v4.641A1.855 1.855 0 0 1 9.508 21H4.847A1.855 1.855 0 0 1 3 19.144v-4.642a1.85 1.85 0 0 1 1.847-1.856h4.661Zm9.645-.075A1.85 1.85 0 0 1 21 14.428v4.641a1.855 1.855 0 0 1-1.847 1.857h-4.66a1.855 1.855 0 0 1-1.848-1.857v-4.641a1.85 1.85 0 0 1 1.847-1.857h4.661ZM9.508 3a1.85 1.85 0 0 1 1.847 1.856v4.642a1.855 1.855 0 0 1-1.847 1.856H4.847A1.855 1.855 0 0 1 3 9.498V4.856A1.85 1.85 0 0 1 4.847 3h4.661Zm9.645 0A1.85 1.85 0 0 1 21 4.856v4.642a1.855 1.855 0 0 1-1.847 1.856h-4.66a1.855 1.855 0 0 1-1.848-1.856V4.856A1.85 1.85 0 0 1 14.492 3h4.661Z" />
    </svg>
  );
}

function ListIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 17.25a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h16Zm0-6.25a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h16Zm0-6.25a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h16Z" />
    </svg>
  );
}
