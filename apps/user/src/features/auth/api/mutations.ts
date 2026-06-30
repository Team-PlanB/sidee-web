"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from "@tanstack/react-query";
import { useAuthStore } from "../model/authStore";
import type { RefreshResponse } from "../model/types";
import { deleteAccount, devLogin, logout, refresh } from "./authApi";
import type { DevLoginRequest } from "./dto";

/** 세션 종료 공통 처리: 토큰 clear + 모든 쿼리 캐시 제거 */
function useEndSession(): () => void {
  const queryClient = useQueryClient();
  const clear = useAuthStore((s) => s.clear);
  return () => {
    clear();
    queryClient.clear();
  };
}

/** 수동 토큰 재발급 (자동 401 처리와 별개로 명시 호출이 필요할 때) */
export function useRefresh(): UseMutationResult<RefreshResponse, Error, void> {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: refresh,
    onSuccess: ({ accessToken, user }) => setSession(accessToken, user),
  });
}

/** 로그아웃 — 성공/실패와 무관하게 클라이언트 세션 종료 */
export function useLogout(): UseMutationResult<void, Error, void> {
  const endSession = useEndSession();
  return useMutation({
    mutationFn: logout,
    onSettled: endSession,
  });
}

/** 계정 탈퇴 — 성공 시 세션 종료 */
export function useDeleteAccount(): UseMutationResult<void, Error, void> {
  const endSession = useEndSession();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: endSession,
  });
}

/** 🔧 DEV ONLY — dev 로그인 */
export function useDevLogin(): UseMutationResult<
  RefreshResponse,
  Error,
  DevLoginRequest
> {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: devLogin,
    onSuccess: ({ accessToken, user }) => setSession(accessToken, user),
  });
}
