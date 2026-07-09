/** `GET /notifications` 쿼리 파라미터 */
export interface NotificationListParams {
  /** 안읽음만 조회 */
  unreadOnly?: boolean;
  /** 페이지 (1-base) */
  page?: number;
  /** 페이지 크기 */
  size?: number;
}
