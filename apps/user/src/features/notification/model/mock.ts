import type { Notification } from "@/entities/notification";

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const iso = (ms: number) => new Date(ms).toISOString();

/**
 * 퍼블리싱용 목업 — now 기준 상대 시각으로 생성한다.
 * 마지막 항목은 40일 전이라 30일 정책에 따라 패널에서 숨겨진다.
 * 백엔드 연동 시 `useNotifications()` 결과로 교체한다.
 */
export function mockNotifications(now: number = Date.now()): Notification[] {
  return [
    {
      id: "1",
      title: "알림 제목",
      body: "000님의 글에 좋아요를 눌렀습니다.",
      readAt: null,
      createdAt: iso(now - 1 * MIN),
    },
    {
      id: "2",
      title: "알림 제목은 몇자까지로 해야할까요오오ㅇㅇㅇ",
      body: "000님의 글에 좋아요를 눌렀습니다. 000님의 글에 좋아요를 눌렀습니다.",
      readAt: iso(now - 30 * MIN),
      createdAt: iso(now - 1 * HOUR),
    },
    {
      id: "3",
      title: "알림 제목",
      body: "000님이 회원님의 프로젝트에 지원했습니다.",
      readAt: iso(now - 25 * HOUR),
      createdAt: iso(now - 1 * DAY),
    },
    {
      id: "4",
      title: "알림 제목",
      body: "000님의 글에 좋아요를 눌렀습니다.",
      readAt: iso(now - 3 * DAY),
      createdAt: iso(now - 2 * DAY),
    },
    {
      id: "5",
      title: "오래된 알림",
      body: "30일이 지나 목록에서 사라지는 알림입니다.",
      readAt: iso(now - 41 * DAY),
      createdAt: iso(now - 40 * DAY),
    },
  ];
}
