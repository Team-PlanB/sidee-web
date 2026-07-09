"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Banner } from "../model/types";
import { getBanners } from "./bannerApi";
import { bannerKeys } from "./queryKeys";

// 배너는 자주 바뀌지 않으므로 조금 길게 캐시한다.
const BANNER_STALE_TIME = 5 * 60 * 1000; // 5m

/** 메인 페이지 배너 리스트 */
export function useBanners(): UseQueryResult<Banner[]> {
  return useQuery({
    queryKey: bannerKeys.list(),
    queryFn: ({ signal }) => getBanners(signal),
    staleTime: BANNER_STALE_TIME,
  });
}
