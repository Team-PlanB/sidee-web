"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { Me } from "../model/types";
import {
  createProfileImageUploadUrl,
  getMe,
  updateProfile,
} from "./userApi";
import { userKeys } from "./queryKeys";
import type {
  ProfileImageUploadUrlRequest,
  ProfileImageUploadUrlResponse,
  UpdateProfileRequest,
} from "./dto";

/** 내 계정 + 프로필 조회 (마이페이지/계정설정 진입 시) */
export function useMe(): UseQueryResult<Me> {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: ({ signal }) => getMe(signal),
  });
}

/** 프로필 수정 — 성공 시 me 캐시를 응답으로 갱신 */
export function useUpdateProfile(): UseMutationResult<
  Me,
  Error,
  UpdateProfileRequest
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (me) => {
      queryClient.setQueryData(userKeys.me(), me);
    },
  });
}

/** 프로필 이미지 presigned 업로드 URL 발급 */
export function useCreateProfileImageUploadUrl(): UseMutationResult<
  ProfileImageUploadUrlResponse,
  Error,
  ProfileImageUploadUrlRequest
> {
  return useMutation({ mutationFn: createProfileImageUploadUrl });
}
