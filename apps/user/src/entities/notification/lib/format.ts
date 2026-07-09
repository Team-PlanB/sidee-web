/**
 * 알림 표시용 순수 유틸.
 * - 상대 시간 포맷("1분 전" / "어제" / "2일 전")
 * - 노출 정책(30일 초과 알림은 숨김)
 * - 제목 길이 제한(15자 초과 시 말줄임)
 */

const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;

/** 알림 보관/노출 기간 (일). 초과분은 리스트에서 숨긴다. */
export const NOTIFICATION_RETENTION_DAYS = 30;

/** 제목 최대 노출 글자수. 초과 시 말줄임(…) + 툴팁으로 전체 노출. */
export const NOTIFICATION_TITLE_MAX = 15;

/** createdAt(ISO) 이 now 기준 30일 이내인지 여부 */
export function isWithin30Days(createdAt: string, now: number): boolean {
  const diff = now - new Date(createdAt).getTime();
  return diff >= 0 && diff <= NOTIFICATION_RETENTION_DAYS * DAY;
}

/** createdAt(ISO) → "방금 전" / "N분 전" / "N시간 전" / "어제" / "N일 전" */
export function formatRelativeTime(createdAt: string, now: number): string {
  const diff = now - new Date(createdAt).getTime();
  if (diff < MINUTE) return "방금 전";

  const minutes = Math.floor(diff / MINUTE);
  if (minutes < 60) return `${minutes}분 전`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "어제";
  return `${days}일 전`;
}

/** 제목이 최대 글자수를 초과하는지 */
export function isTitleTruncated(
  title: string,
  max = NOTIFICATION_TITLE_MAX,
): boolean {
  return title.length > max;
}

/** 초과 시 max 글자 + 말줄임(…), 아니면 원본 그대로 */
export function truncateTitle(
  title: string,
  max = NOTIFICATION_TITLE_MAX,
): string {
  return isTitleTruncated(title, max) ? `${title.slice(0, max)}…` : title;
}
