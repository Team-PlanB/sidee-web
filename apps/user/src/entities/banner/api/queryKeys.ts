/** banner 슬라이스 query key. 모양: `[domain, operation, ...params]`. */
export const bannerKeys = {
  all: ["banners"] as const,
  list: () => [...bannerKeys.all, "list"] as const,
};
