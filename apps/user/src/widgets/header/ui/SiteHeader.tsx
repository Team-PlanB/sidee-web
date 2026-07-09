"use client";

import { useState } from "react";
import { LoginModal, ProfileMenu, useAuthStore } from "@/features/auth";
import { NotificationPanel, mockNotifications } from "@/features/notification";
import Header from "./Header";

type OpenMenu = "notification" | "profile" | null;

/**
 * SiteHeader — Header 위젯을 인증 세션에 연결하는 컨테이너.
 *
 * accessToken 유무로 로그인 상태를 판정해 Header 에 전달한다.
 * - 미로그인: 로그인/회원가입 클릭 → 로그인 모달
 * - 로그인: 알림(종) → 알림 패널, 프로필(아바타) → 프로필 메뉴 (드롭다운은 한 번에 하나)
 * 로그아웃 시 세션이 비워지면 accessToken 이 null 이 되어 미로그인 헤더로 되돌아간다.
 */
export default function SiteHeader() {
  const isLoggedIn = useAuthStore((s) => s.accessToken != null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [menu, setMenu] = useState<OpenMenu>(null);
  // 알림 상대시간 기준 시각 — 렌더 순수성 유지를 위해 여는 시점(이벤트)에 캡처한다.
  const [notificationNow, setNotificationNow] = useState(0);

  const toggle = (target: Exclude<OpenMenu, null>) =>
    setMenu((cur) => (cur === target ? null : target));
  const close = () => setMenu(null);

  const openNotification = () => {
    setNotificationNow(Date.now());
    toggle("notification");
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onAuthClick={() => setLoginOpen(true)}
        onNotificationClick={openNotification}
        onProfileClick={() => toggle("profile")}
      />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {menu && (
        <>
          {/* 바깥 클릭 시 닫힘 (딤 없이 투명) */}
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={close}
            className="fixed inset-0 z-40 cursor-default"
          />
          {/* 헤더(60px) 아래, 콘텐츠 우측 정렬로 드롭다운 배치 */}
          <div className="pointer-events-none fixed inset-x-0 top-15 z-50 flex justify-center">
            <div className="flex w-full max-w-[1440px] justify-end px-5">
              <div className="pointer-events-auto">
                {menu === "notification" && (
                  <NotificationPanel
                    notifications={mockNotifications(notificationNow)}
                    now={notificationNow}
                    onClose={close}
                  />
                )}
                {menu === "profile" && <ProfileMenu onClose={close} />}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
