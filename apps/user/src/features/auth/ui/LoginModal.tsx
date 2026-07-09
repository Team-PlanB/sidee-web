"use client";

import { useEffect, type SVGProps } from "react";
import { Logo } from "@sidee/ui";
import type { SocialProvider } from "@/shared/model";
import { getOAuthStartUrl } from "../api/authApi";

export interface LoginModalProps {
  /** 열림 여부 */
  open: boolean;
  /** 닫기 요청 (X / 딤 클릭 / Esc) */
  onClose: () => void;
}

/**
 * 로그인/회원가입 모달 (Figma: DIM + 카드 + 카카오/구글 소셜 로그인).
 *
 * - 소셜 버튼 클릭 시 서버 OAuth 시작 URL 로 전체 페이지 이동한다.
 * - 딤 배경 클릭·X 버튼·Esc 로 닫는다. 열려 있는 동안 body 스크롤을 잠근다.
 */
export default function LoginModal({ open, onClose }: LoginModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const startOAuth = (provider: SocialProvider) => {
    window.location.href = getOAuthStartUrl(provider);
  };

  return (
    <div
      data-testid="login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="flex w-full max-w-[500px] flex-col items-center gap-8 rounded-3xl bg-white pb-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-end p-5">
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex size-6 cursor-pointer items-center justify-center text-gray-800"
          >
            <CloseIcon className="size-6" aria-hidden />
          </button>
        </div>

        <Logo className="h-12 w-auto" />

        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            id="login-modal-title"
            className="text-[28px] font-bold leading-[1.358] tracking-[-0.0236em] text-gray-800"
          >
            Sidee에 오신 것을 환영합니다!
          </h2>
          <p className="max-w-[244px] text-base leading-[1.5] tracking-[0.0057em] text-gray-800">
            당신의 아이디어가 멈추지 않도록, 사이디에서 팀원과 함께 시작해 보세요.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 px-10">
          <button
            type="button"
            onClick={() => startOAuth("kakao")}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[99px] bg-[#FEE500] text-sm font-medium tracking-[0.0145em] text-black"
          >
            <KakaoIcon className="size-[18px]" aria-hidden />
            카카오 로그인
          </button>

          <button
            type="button"
            onClick={() => startOAuth("google")}
            className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[40px] border border-[#747775] bg-white text-sm font-medium tracking-[0.0145em] text-black"
          >
            <GoogleIcon className="size-[18px]" aria-hidden />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function KakaoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M9 1.5C4.86 1.5 1.5 4.13 1.5 7.38c0 2.11 1.42 3.96 3.55 5-.16.57-.57 2.08-.65 2.4-.1.4.15.4.31.29.13-.08 1.98-1.34 2.78-1.89.47.07.96.1 1.46.1 4.14 0 7.5-2.63 7.5-5.9S13.14 1.5 9 1.5Z"
        fill="#000"
        fillOpacity="0.9"
      />
    </svg>
  );
}

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62Z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  );
}
