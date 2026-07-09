"use client";

import { useState } from "react";
import { LoginModal, useAuthStore } from "@/features/auth";
import Header from "./Header";

/**
 * SiteHeader — Header 위젯을 인증 세션에 연결하는 컨테이너.
 *
 * accessToken 유무로 로그인 상태를 판정해 Header 에 전달한다.
 * 미로그인 상태에서 로그인/회원가입 클릭 시 로그인 모달을 연다.
 * (알림 데이터 연동 / 라우팅 핸들러는 해당 기능 구현 시 연결 예정)
 */
export default function SiteHeader() {
  const isLoggedIn = useAuthStore((s) => s.accessToken != null);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onAuthClick={() => setLoginOpen(true)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
