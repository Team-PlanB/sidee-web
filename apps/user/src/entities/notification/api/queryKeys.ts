import type { NotificationListParams } from "./dto";

/** notification 슬라이스 query key. 모양: `[domain, operation, ...params]`. */
export const notificationKeys = {
  all: ["notifications"] as const,
  lists: () => [...notificationKeys.all, "list"] as const,
  list: (params?: NotificationListParams) =>
    [...notificationKeys.lists(), params ?? {}] as const,
  unreadCount: () => [...notificationKeys.all, "unread-count"] as const,
};
