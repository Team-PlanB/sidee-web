import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useBanners } from "./queries";
import * as api from "./bannerApi";

jest.mock("./bannerApi");

const mockApi = api as jest.Mocked<typeof api>;

function wrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

beforeEach(() => jest.clearAllMocks());

describe("useBanners", () => {
  it("getBanners 결과를 반환한다", async () => {
    const banners = [
      { id: "b1", imageUrl: "https://x/1.png", linkUrl: null, title: "배너" },
    ];
    mockApi.getBanners.mockResolvedValue(banners);

    const { result } = renderHook(() => useBanners(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(banners);
  });
});
