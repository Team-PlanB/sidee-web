"use client";

import {
  setAccessTokenProvider,
  setRefreshHandler,
  setUnauthorizedHandler,
} from "@/shared/api";
import { refresh } from "../api/authApi";
import { getStoredAccessToken, useAuthStore } from "./authStore";

let installed = false;

/**
 * httpClient ↔ auth store 연결.
 * - Bearer 토큰 공급: store 의 accessToken
 * - 401 시 refresh: `POST /auth/refresh` 후 새 토큰을 store 에 반영
 * - refresh 실패 시: 세션 clear
 *
 * 앱 진입(클라이언트 Provider)에서 한 번 호출한다. 중복 호출은 무시.
 */
export function installAuthBridge(): void {
  if (installed) return;
  installed = true;

  setAccessTokenProvider(getStoredAccessToken);

  setRefreshHandler(async () => {
    try {
      const { accessToken, user } = await refresh();
      useAuthStore.getState().setSession(accessToken, user);
      return accessToken;
    } catch {
      useAuthStore.getState().clear();
      return null;
    }
  });

  setUnauthorizedHandler(() => {
    useAuthStore.getState().clear();
  });
}
