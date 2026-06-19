"use client";

import type { ReactNode } from "react";
import { installAuthBridge } from "../model/authBridge";

// 클라이언트 번들 로드 시 1회 설치 (installAuthBridge 자체가 idempotent).
// 자식의 첫 요청부터 토큰/refresh 가 동작하도록 렌더 이전에 등록한다.
installAuthBridge();

/** httpClient ↔ auth store 브리지를 보장하는 client 경계. app provider 안에 둔다. */
export function AuthProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
