export type {
  Notification,
  NotificationListResult,
  UnreadCount,
} from "./model/types";
export type { NotificationListParams } from "./api/dto";
export {
  getNotifications,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "./api/notificationApi";
export { notificationKeys } from "./api/queryKeys";
export {
  formatRelativeTime,
  isWithin30Days,
  isTitleTruncated,
  truncateTitle,
  NOTIFICATION_RETENTION_DAYS,
  NOTIFICATION_TITLE_MAX,
} from "./lib/format";
export {
  useNotifications,
  useUnreadCount,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "./api/queries";
