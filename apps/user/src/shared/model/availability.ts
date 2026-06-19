import type { CollaborationMode } from "./enums";

/** 요일 키 (백엔드 availability 객체의 키) */
export const WEEKDAYS = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
] as const;
export type Weekday = (typeof WEEKDAYS)[number];

/**
 * 요일별 활동 가능 시간 슬롯.
 * 값은 0–23 시(hour) 배열. 예: `{ mon: [9, 10, 11], sat: [14, 15] }`
 */
export type WeeklyAvailability = Partial<Record<Weekday, number[]>>;

/**
 * 프로필의 활동 시간대 — 협업 모드별 주간 시간표.
 * 슬롯당 1개 모드만 가능(mutual exclusive). 온보딩 입력값은 ONLINE 으로 저장된다.
 * 예: `{ ONLINE: { mon: [9, 10] }, OFFLINE: { sat: [14] } }`
 */
export type ProfileAvailability = Partial<
  Record<CollaborationMode, WeeklyAvailability>
>;
