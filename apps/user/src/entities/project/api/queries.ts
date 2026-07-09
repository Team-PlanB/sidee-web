"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type {
  LikeResult,
  ProjectCard,
  ProjectDetail,
  ProjectListResult,
} from "../model/types";
import {
  closeProject,
  createProject,
  deleteProject,
  getProject,
  getProjects,
  getRecommendedProjects,
  getRelatedProjects,
  likeProject,
  unlikeProject,
  updateProject,
} from "./projectApi";
import { projectKeys } from "./queryKeys";
import type {
  CreateProjectRequest,
  ProjectListParams,
  UpdateProjectRequest,
} from "./dto";

// ── 조회 ─────────────────────────────────────────────────

/** 프로젝트 리스트 (필터/페이징). 필터별로 캐시가 분리된다. */
export function useProjects(
  params?: ProjectListParams,
): UseQueryResult<ProjectListResult> {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: ({ signal }) => getProjects(params, signal),
  });
}

/** 맞춤 추천 프로젝트 */
export function useRecommendedProjects(): UseQueryResult<ProjectCard[]> {
  return useQuery({
    queryKey: projectKeys.recommended(),
    queryFn: ({ signal }) => getRecommendedProjects(signal),
  });
}

/** 프로젝트 상세. id 가 없으면 요청하지 않는다. */
export function useProject(id: string): UseQueryResult<ProjectDetail> {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: ({ signal }) => getProject(id, signal),
    enabled: id.length > 0,
  });
}

/** 연관 프로젝트. id 가 없으면 요청하지 않는다. */
export function useRelatedProjects(id: string): UseQueryResult<ProjectCard[]> {
  return useQuery({
    queryKey: projectKeys.related(id),
    queryFn: ({ signal }) => getRelatedProjects(id, signal),
    enabled: id.length > 0,
  });
}

// ── 변경 ─────────────────────────────────────────────────

/** 프로젝트 작성 — 성공 시 리스트/추천 캐시 무효화 */
export function useCreateProject(): UseMutationResult<
  ProjectDetail,
  Error,
  CreateProjectRequest
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.recommended() });
    },
  });
}

/** 프로젝트 수정 — 성공 시 상세 캐시 갱신 + 리스트 무효화 */
export function useUpdateProject(): UseMutationResult<
  ProjectDetail,
  Error,
  { id: string; body: UpdateProjectRequest }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }) => updateProject(id, body),
    onSuccess: (project, { id }) => {
      queryClient.setQueryData(projectKeys.detail(id), project);
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

/** 프로젝트 삭제 — 성공 시 상세 캐시 제거 + 리스트/추천 무효화 */
export function useDeleteProject(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: projectKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.recommended() });
    },
  });
}

/** 모집 마감 — 성공 시 상세/리스트 무효화 */
export function useCloseProject(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: closeProject,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

/** 좋아요 토글 응답을 상세 캐시에 반영하고 관련 리스트를 무효화한다. */
function applyLikeResult(
  queryClient: ReturnType<typeof useQueryClient>,
  id: string,
  result: LikeResult,
): void {
  queryClient.setQueryData<ProjectDetail>(projectKeys.detail(id), (old) =>
    old
      ? { ...old, likeCount: result.likeCount, likedByMe: result.likedByMe }
      : old,
  );
  queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
  queryClient.invalidateQueries({ queryKey: projectKeys.recommended() });
  queryClient.invalidateQueries({ queryKey: projectKeys.related(id) });
}

/** 좋아요 추가 */
export function useLikeProject(): UseMutationResult<LikeResult, Error, string> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: likeProject,
    onSuccess: (result, id) => applyLikeResult(queryClient, id, result),
  });
}

/** 좋아요 취소 */
export function useUnlikeProject(): UseMutationResult<
  LikeResult,
  Error,
  string
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unlikeProject,
    onSuccess: (result, id) => applyLikeResult(queryClient, id, result),
  });
}
