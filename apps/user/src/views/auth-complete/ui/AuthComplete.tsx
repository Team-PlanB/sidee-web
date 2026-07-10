"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useRefresh } from "@/features/auth";
import { OnboardingModal } from "@/features/onboarding";

/**
 * OAuth 콜백 착지 화면.
 *
 * 백엔드는 소셜 로그인 성공 후 `FE_URL/auth/complete` 로 302 시킨다.
 * 이 화면에서 refresh 쿠키로 `POST /auth/refresh` 를 1회 호출해 세션을 부트스트랩한다.
 * - 온보딩 미완료(처음 가입) 사용자면 온보딩 모달을 이어서 띄운다.
 * - 그 외에는 홈으로 이동한다.
 */
export default function AuthComplete() {
  const router = useRouter();
  const { mutate } = useRefresh();
  const bootstrapped = useRef(false);
  const [onboarding, setOnboarding] = useState(false);

  const goHome = () => router.replace("/");

  useEffect(() => {
    // StrictMode 이중 마운트에도 refresh 는 한 번만 호출한다.
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    mutate(undefined, {
      onSuccess: (data) => {
        // 처음 가입한 사용자(온보딩 미완료)만 온보딩을 노출한다.
        if (data.user.onboardingCompletedAt == null) setOnboarding(true);
        else goHome();
      },
      // 실패 시 미로그인 상태로 홈으로 보낸다.
      onError: goHome,
    });
    // goHome/mutate 는 렌더마다 안정적일 필요는 없다 — 1회만 실행한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (onboarding) {
    return (
      <OnboardingModal open onClose={goHome} onCompleted={goHome} />
    );
  }

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
