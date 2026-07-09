import { httpClient } from "@/shared/api";
import type { Banner } from "../model/types";

/** GET /banners — 활성 배너 리스트 (Public — 메인 페이지 노출) */
export function getBanners(signal?: AbortSignal): Promise<Banner[]> {
  return httpClient.get<Banner[]>("/banners", { signal });
}
