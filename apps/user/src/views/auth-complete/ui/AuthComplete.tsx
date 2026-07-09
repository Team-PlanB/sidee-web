"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useRefresh } from "@/features/auth";

/**
 * OAuth 콜백 착지 화면.
 *
 * 백엔드는 소셜 로그인 성공 후 `FE_URL/auth/complete` 로 302 시킨다.
 * 이 화면에서 refresh 쿠키로 `POST /auth/refresh` 를 1회 호출해
 * access token 을 메모리에 부트스트랩한 뒤 홈으로 이동한다.
 */
export default function AuthComplete() {
  const router = useRouter();
  const { mutate } = useRefresh();
  const bootstrapped = useRef(false);

  useEffect(() => {
    // StrictMode 이중 마운트에도 refresh 는 한 번만 호출한다.
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    mutate(undefined, {
      // 성공/실패 모두 홈으로 보낸다(실패 시 미로그인 상태로 남는다).
      // TODO(온보딩): 온보딩 미완료 사용자는 온보딩 라우트 구현 후 그쪽으로 분기.
      onSuccess: () => router.replace("/"),
      onError: () => router.replace("/"),
    });
  }, [mutate, router]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <span
        data-testid="auth-complete-spinner"
        className="size-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600"
        aria-hidden
      />
      <p className="text-body-2 text-gray-800">로그인 중이에요…</p>
    </main>
  );
}
