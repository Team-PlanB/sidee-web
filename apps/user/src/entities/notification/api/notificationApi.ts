import { httpClient, type QueryParams } from "@/shared/api";
import type {
  NotificationListResult,
  UnreadCount,
} from "../model/types";
import type { NotificationListParams } from "./dto";

/** GET /notifications — 내 알림 리스트 (unread 우선, 페이징) */
export function getNotifications(
  params?: NotificationListParams,
  signal?: AbortSignal,
): Promise<NotificationListResult> {
  return httpClient.get<NotificationListResult>("/notifications", {
    query: params as QueryParams | undefined,
    signal,
  });
}

/** GET /notifications/unread-count — 읽지 않은 알림 수 (뱃지용) */
export function getUnreadCount(signal?: AbortSignal): Promise<UnreadCount> {
  return httpClient.get<UnreadCount>("/notifications/unread-count", { signal });
}

/** PATCH /notifications/read-all — 모든 알림 읽음 처리 (204) */
export function markAllNotificationsRead(): Promise<void> {
  return httpClient.patch<void>("/notifications/read-all");
}

/** PATCH /notifications/{id}/read — 개별 알림 읽음 처리 (204) */
export function markNotificationRead(id: string): Promise<void> {
  return httpClient.patch<void>(`/notifications/${id}/read`);
}
