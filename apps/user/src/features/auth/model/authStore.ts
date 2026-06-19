"use client";

import { create } from "zustand";
import type { User } from "@/entities/user";

/**
 * 인증 세션 상태.
 * access token 은 메모리에만 보관(15분, 새로고침 시 refresh 쿠키로 복구).
 * refresh 토큰은 httpOnly 쿠키라 JS 에서 접근하지 않는다.
 */
interface AuthState {
  accessToken: string | null;
  user: User | null;
  /** refresh 로 부트스트랩을 시도하기 전이면 false */
  isInitialized: boolean;
  setSession: (accessToken: string, user: User) => void;
  setAccessToken: (accessToken: string) => void;
  clear: () => void;
  markInitialized: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isInitialized: false,
  setSession: (accessToken, user) =>
    set({ accessToken, user, isInitialized: true }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clear: () => set({ accessToken: null, user: null, isInitialized: true }),
  markInitialized: () => set({ isInitialized: true }),
}));

/** 컴포넌트 밖(httpClient 브리지 등)에서 현재 토큰 읽기 */
export const getStoredAccessToken = (): string | null =>
  useAuthStore.getState().accessToken;
