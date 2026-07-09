import { getBanners } from "./bannerApi";
import { httpClient } from "@/shared/api";

jest.mock("@/shared/api", () => ({
  httpClient: { get: jest.fn().mockResolvedValue([]) },
}));

const get = httpClient.get as jest.Mock;

describe("bannerApi", () => {
  beforeEach(() => get.mockClear());

  it("getBanners → GET /banners (signal 전달)", async () => {
    const signal = new AbortController().signal;
    await getBanners(signal);
    expect(get).toHaveBeenCalledWith("/banners", { signal });
  });
});
