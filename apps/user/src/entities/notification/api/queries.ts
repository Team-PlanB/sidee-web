"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import type {
  NotificationListResult,
  UnreadCount,
} from "../model/types";
import {
  getNotifications,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "./notificationApi";
import { notificationKeys } from "./queryKeys";
import type { NotificationListParams } from "./dto";

/** 알림 리스트 (unread 우선, 페이징) */
export function useNotifications(
  params?: NotificationListParams,
): UseQueryResult<NotificationListResult> {
  return useQuery({
    queryKey: notificationKeys.list(params),
    queryFn: ({ signal }) => getNotifications(params, signal),
  });
}

/** 읽지 않은 알림 수 (헤더 뱃지) */
export function useUnreadCount(): UseQueryResult<UnreadCount> {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: ({ signal }) => getUnreadCount(signal),
  });
}

/** 리스트/안읽음 수 캐시를 무효화한다 (읽음 처리 후). */
function invalidateNotifications(
  queryClient: ReturnType<typeof useQueryClient>,
): void {
  queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
  queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
}

/** 개별 알림 읽음 처리 */
export function useMarkNotificationRead(): UseMutationResult<
  void,
  Error,
  string
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markNotificationRead,
    onSuccess: () => invalidateNotifications(queryClient),
  });
}

/** 모든 알림 읽음 처리 */
export function useMarkAllNotificationsRead(): UseMutationResult<
  void,
  Error,
  void
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => invalidateNotifications(queryClient),
  });
}
