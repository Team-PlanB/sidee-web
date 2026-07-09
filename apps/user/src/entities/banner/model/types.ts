/**
 * 메인 페이지 배너 — `BannerResponseDto` (`GET /banners`).
 * Public 엔드포인트(비로그인 노출).
 */
export interface Banner {
  id: string;
  imageUrl: string;
  /** 클릭 시 이동 URL. null 이면 링크 없음 */
  linkUrl: string | null;
  title: string;
}
