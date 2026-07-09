/**
 * 알림 — `NotificationResponseDto` (`GET /notifications`).
 */
export interface Notification {
  id: string;
  title: string;
  body: string;
  /** 읽은 시각 (ISO 8601). null 이면 안읽음 */
  readAt: string | null;
  /** 생성 시각 (ISO 8601) */
  createdAt: string;
}

/** 페이징 알림 리스트 — `ListNotificationsResponseDto` */
export interface NotificationListResult {
  items: Notification[];
  total: number;
  page: number;
  size: number;
}

/** 읽지 않은 알림 수 — `UnreadCountResponseDto` (뱃지용) */
export interface UnreadCount {
  count: number;
}
