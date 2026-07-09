"use client";

import type { SVGProps } from "react";
import { Tooltip } from "@sidee/ui";
import {
  formatRelativeTime,
  isTitleTruncated,
  isWithin30Days,
  truncateTitle,
  type Notification,
} from "@/entities/notification";

export interface NotificationPanelProps {
  notifications: Notification[];
  /** 상대 시간/노출 정책 기준 시각 (ms). 렌더 순수성 유지를 위해 호출부에서 주입한다. */
  now: number;
  onClose: () => void;
}

/**
 * 알림 드롭다운 패널 (Figma: 알림).
 *
 * - 30일이 지난 알림은 노출하지 않는다.
 * - 안읽음(readAt=null) 항목은 Blue/50 배경으로 강조한다.
 * - 제목이 15자를 넘으면 말줄임하고, hover 시 툴팁으로 전체 제목을 보여준다.
 */
export default function NotificationPanel({
  notifications,
  now,
  onClose,
}: NotificationPanelProps) {
  const visible = notifications.filter((n) => isWithin30Days(n.createdAt, now));

  return (
    <div
      role="dialog"
      aria-label="알림"
      className="flex max-h-[448px] w-[330px] flex-col overflow-hidden rounded-2xl bg-white pb-3 shadow-[2px_4px_8px_rgba(0,0,0,0.12)]"
    >
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-body-1 font-semibold text-gray-800">알림</span>
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="flex size-6 cursor-pointer items-center justify-center text-gray-800"
        >
          <CloseIcon className="size-6" aria-hidden />
        </button>
      </div>

      {visible.length === 0 ? (
        <p className="px-6 py-10 text-center text-body-2 text-gray-500">
          새로운 알림이 없어요
        </p>
      ) : (
        <ul className="flex flex-col overflow-y-auto">
          {visible.map((n) => (
            <NotificationItem key={n.id} notification={n} now={now} />
          ))}
        </ul>
      )}
    </div>
  );
}

function NotificationItem({
  notification,
  now,
}: {
  notification: Notification;
  now: number;
}) {
  const unread = notification.readAt == null;
  const truncated = isTitleTruncated(notification.title);

  return (
    <li
      className={`flex flex-col gap-1 px-6 py-3 ${unread ? "bg-blue-50" : "bg-white"}`}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="group relative">
          <span className="text-label-1 font-semibold text-gray-800">
            {truncateTitle(notification.title)}
          </span>
          {truncated && (
            <Tooltip
              message={notification.title}
              className="absolute left-0 top-full z-10 mt-1 hidden whitespace-nowrap group-hover:flex"
            />
          )}
        </span>
        <time className="shrink-0 text-caption-1 font-medium text-gray-500">
          {formatRelativeTime(notification.createdAt, now)}
        </time>
      </div>
      <p className="line-clamp-3 text-caption-1 text-gray-800">
        {notification.body}
      </p>
    </li>
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
