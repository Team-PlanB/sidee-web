"use client";

import { useState, type SVGProps } from "react";
import { AppLogo, Button, Tag } from "@sidee/ui";
import { ProjectCard } from "@/widgets/project-list";
import { mockProjectDetail, type ProjectDetailVM } from "../model/mock";

/**
 * ProjectDetailView — 프로젝트 상세 화면 (Figma: 프로젝트 상세).
 *
 * 제목/더보기 · 작성자·통계 · 본문 · 팀 모집 인원 · 참고 링크 · 메타 카드 ·
 * 사용 언어 · 지원 버튼 · 작성자 프로필 카드 · 함께 추천하는 프로젝트.
 *
 * 데이터는 현재 목업(props.detail). 백엔드 연동 시 useProject(id) → VM 매핑으로 교체한다.
 */
export type ProjectDetailViewProps = {
  detail?: ProjectDetailVM;
};

export default function ProjectDetailView({
  detail = mockProjectDetail,
}: ProjectDetailViewProps) {
  const [liked, setLiked] = useState(detail.liked);
  const likeCount = detail.likeCount + (liked && !detail.liked ? 1 : 0);

  return (
    <main className="mx-auto flex w-full max-w-[960px] flex-col gap-8 px-5 py-10">
      {/* 제목 + 더보기 */}
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-title-3 font-bold text-gray-800">{detail.title}</h1>
        {/* TODO(디자인시스템): 드롭다운(…) 메뉴 컴포넌트 부재 — 아이콘 버튼만 배치 */}
        <button
          type="button"
          aria-label="더보기"
          className="flex size-6 shrink-0 cursor-pointer items-center justify-center text-gray-800"
        >
          <DotsIcon className="size-6" aria-hidden />
        </button>
      </header>

      {/* 작성자 + 통계 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar url={detail.author.avatarUrl} className="size-8" />
          <span className="text-label-1 font-medium text-gray-800">
            {detail.author.nickname}
          </span>
        </div>

        <div className="flex items-center gap-3 text-label-2 font-medium text-gray-400">
          <span className="flex items-center gap-1">
            <EyeIcon className="size-4" aria-hidden />
            {detail.viewCount}
          </span>
          <button
            type="button"
            data-testid="project-like"
            aria-label={liked ? "관심 해제" : "관심"}
            aria-pressed={liked}
            onClick={() => setLiked((v) => !v)}
            className="flex cursor-pointer items-center gap-1 text-gray-400"
          >
            <HeartIcon
              className={`size-4 ${liked ? "text-blue-600" : ""}`}
              filled={liked}
              aria-hidden
            />
            {likeCount}
          </button>
        </div>
      </div>

      <hr className="border-t border-gray-200" />

      {/* 본문 + 메타 카드 */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-8">
          <p className="whitespace-pre-line text-body-1 text-gray-800">
            {detail.description}
          </p>

          {/* 팀 모집 인원 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-headline font-semibold text-gray-800">
              팀 모집 인원
            </h2>
            <ul className="flex flex-col gap-4">
              {detail.recruitments.map((r) => (
                <li key={r.role} className="flex flex-col gap-2">
                  <span className="text-label-1 font-semibold text-gray-800">
                    {r.role} {r.count}명
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {r.subPositions.map((sp) => (
                      <Tag key={sp} type="outlined" variant="neutral" size="m">
                        {sp}
                      </Tag>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 참고 링크 */}
          <section className="flex flex-col gap-3">
            <h2 className="text-label-1 font-semibold text-gray-800">참고 링크</h2>
            <ul className="flex flex-col gap-2">
              {detail.referenceLinks.map((l) => (
                <li key={l.url}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-label-1 font-semibold text-blue-600 underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* 메타 카드 */}
        <aside className="w-full shrink-0 rounded-3xl border border-gray-200 p-5 lg:w-[360px]">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
            <MetaItem label="프로젝트 분야" value={detail.meta.field} />
            <MetaItem label="출시 플랫폼" value={detail.meta.platforms} />
            <MetaItem label="진행 방식" value={detail.meta.workMode} />
            <MetaItem label="진행 기간" value={detail.meta.duration} />
            <MetaItem label="모집 유형" value={detail.meta.recruitTypes} />
            <MetaItem label="지원 방법" value={detail.meta.applyMethod} />
          </dl>
        </aside>
      </div>

      {/* 사용 언어 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-headline font-semibold text-gray-800">사용 언어</h2>
        <ul className="flex flex-wrap gap-4">
          {detail.techStack.map((tech) => (
            <li key={tech.name} className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-6 rounded-full"
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-label-1 text-gray-800">{tech.name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 지원 버튼 */}
      <Button asChild type="solid" variant="primary" size="l" className="w-full">
        <a href={detail.applyLink} target="_blank" rel="noreferrer">
          지원하기
        </a>
      </Button>

      {/* 작성자 프로필 카드 */}
      <section className="flex flex-col gap-4 rounded-3xl border border-gray-200 p-6">
        <div className="flex items-center gap-3">
          <Avatar url={detail.authorProfile.avatarUrl} className="size-12" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-body-1 font-semibold text-gray-800">
                {detail.authorProfile.nickname}
              </span>
              {/* TODO(디자인시스템): 사용자 등급 전용 뱃지 컴포넌트 부재 — Tag 로 대체 */}
              <Tag type="solid" variant="accent" size="s">
                {detail.authorProfile.grade}
              </Tag>
            </div>
          </div>
        </div>

        <p className="text-body-2 text-gray-700">{detail.authorProfile.bio}</p>

        <div className="flex flex-col gap-2">
          <h3 className="text-label-1 font-semibold text-gray-800">보유 기술</h3>
          <div className="flex flex-wrap gap-2">
            {detail.authorProfile.skills.map((skill) => (
              <Tag key={skill} type="outlined" variant="neutral" size="m">
                {skill}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      {/* 함께 추천하는 프로젝트 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-headline font-semibold text-gray-800">
          함께 추천하는 프로젝트
        </h2>
        <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {detail.related.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

/** 우측 메타 카드의 라벨(gray-400) + 값(gray-800) 셀 */
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-label-1 font-semibold text-gray-400">{label}</dt>
      <dd className="text-label-1 text-gray-800">{value}</dd>
    </div>
  );
}

/**
 * Avatar — 프로필 이미지. url 이 없으면 기본 로고(AppLogo)로 대체한다.
 * TODO(디자인시스템): @sidee/ui 에 Avatar 컴포넌트가 없어 로컬로 둠. 공용화 필요.
 */
function Avatar({ url, className }: { url?: string; className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 ${className ?? ""}`}
    >
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="size-full object-cover" />
      ) : (
        <AppLogo className="size-full" aria-hidden />
      )}
    </span>
  );
}

/* ── 아이콘 ─────────────────────────────────────────────────────── */

function DotsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
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
