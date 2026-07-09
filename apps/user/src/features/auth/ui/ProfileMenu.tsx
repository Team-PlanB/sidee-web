"use client";

import type { ReactNode } from "react";
import { useLogout } from "../api/mutations";

export interface ProfileMenuProps {
  onClose: () => void;
}

/**
 * 프로필(아바타) 드롭다운 메뉴 (Figma: Menu/Menu).
 *
 * 마이페이지 / 대시보드 / 로그아웃 항목. 지금은 로그아웃만 활성화한다.
 * 로그아웃은 서버(`/auth/logout`)까지 호출하고 세션을 정리한다 — 성공/실패와
 * 무관하게 토큰이 비워져 헤더가 미로그인 상태로 되돌아간다(useLogout onSettled).
 */
export default function ProfileMenu({ onClose }: ProfileMenuProps) {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div
      role="menu"
      aria-label="프로필 메뉴"
      className="flex w-[170px] min-w-[140px] flex-col gap-1 rounded-2xl bg-white p-2 shadow-[2px_4px_8px_rgba(0,0,0,0.12)]"
    >
      {/* TODO(라우팅): 마이페이지/대시보드 화면 구현 후 활성화 */}
      <MenuItem disabled>마이페이지</MenuItem>
      <MenuItem disabled>대시보드</MenuItem>
      <hr className="border-t border-gray-200" />
      <MenuItem onClick={handleLogout} disabled={isPending}>
        로그아웃
      </MenuItem>
    </div>
  );
}

function MenuItem({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 items-center rounded-lg px-2 text-body-1 font-medium text-gray-800 enabled:cursor-pointer enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400"
    >
      {children}
    </button>
  );
}
