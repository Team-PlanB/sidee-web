import { httpClient, type QueryParams } from "@/shared/api";
import type {
  LikeResult,
  ProjectCard,
  ProjectDetail,
  ProjectListResult,
} from "../model/types";
import type {
  CreateProjectRequest,
  ProjectListParams,
  UpdateProjectRequest,
} from "./dto";

/** GET /projects — 프로젝트 리스트 (페이징/필터/검색) */
export function getProjects(
  params?: ProjectListParams,
  signal?: AbortSignal,
): Promise<ProjectListResult> {
  return httpClient.get<ProjectListResult>("/projects", {
    query: params as QueryParams | undefined,
    signal,
  });
}

/** GET /projects/recommended — 맞춤 추천 (사용자 skills overlap → recency) */
export function getRecommendedProjects(
  signal?: AbortSignal,
): Promise<ProjectCard[]> {
  return httpClient.get<ProjectCard[]>("/projects/recommended", { signal });
}

/** GET /projects/{id} — 프로젝트 상세 (조회 시 viewCount +1) */
export function getProject(
  id: string,
  signal?: AbortSignal,
): Promise<ProjectDetail> {
  return httpClient.get<ProjectDetail>(`/projects/${id}`, { signal });
}

/** GET /projects/{id}/related — 연관 프로젝트 (같은 분야 + 기술 스택 overlap) */
export function getRelatedProjects(
  id: string,
  signal?: AbortSignal,
): Promise<ProjectCard[]> {
  return httpClient.get<ProjectCard[]>(`/projects/${id}/related`, { signal });
}

/** POST /projects — 프로젝트 작성 (DRAFT 임시저장 / PUBLISHED 등록) */
export function createProject(
  body: CreateProjectRequest,
): Promise<ProjectDetail> {
  return httpClient.post<ProjectDetail>("/projects", body);
}

/** PATCH /projects/{id} — 프로젝트 수정 (소유자 only) */
export function updateProject(
  id: string,
  body: UpdateProjectRequest,
): Promise<ProjectDetail> {
  return httpClient.patch<ProjectDetail>(`/projects/${id}`, body);
}

/** DELETE /projects/{id} — 프로젝트 soft delete (소유자 only, 204) */
export function deleteProject(id: string): Promise<void> {
  return httpClient.delete<void>(`/projects/${id}`);
}

/** PATCH /projects/{id}/close — 모집 마감 (소유자 only, 204) */
export function closeProject(id: string): Promise<void> {
  return httpClient.patch<void>(`/projects/${id}/close`);
}

/** POST /projects/{id}/like — 좋아요 추가 (idempotent) */
export function likeProject(id: string): Promise<LikeResult> {
  return httpClient.post<LikeResult>(`/projects/${id}/like`);
}

/** DELETE /projects/{id}/like — 좋아요 취소 */
export function unlikeProject(id: string): Promise<LikeResult> {
  return httpClient.delete<LikeResult>(`/projects/${id}/like`);
}
