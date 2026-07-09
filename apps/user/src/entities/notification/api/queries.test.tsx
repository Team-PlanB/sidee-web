import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { notificationKeys } from "./queryKeys";
import { useMarkAllNotificationsRead, useUnreadCount } from "./queries";
import * as api from "./notificationApi";

jest.mock("./notificationApi");

const mockApi = api as jest.Mocked<typeof api>;

function setup() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { queryClient, wrapper };
}

beforeEach(() => jest.clearAllMocks());

describe("useUnreadCount", () => {
  it("getUnreadCount 결과를 반환한다", async () => {
    mockApi.getUnreadCount.mockResolvedValue({ count: 3 });
    const { wrapper } = setup();

    const { result } = renderHook(() => useUnreadCount(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ count: 3 });
  });
});

describe("useMarkAllNotificationsRead", () => {
  it("성공 시 리스트와 안읽음 수 캐시를 무효화한다", async () => {
    mockApi.markAllNotificationsRead.mockResolvedValue(undefined);
    const { queryClient, wrapper } = setup();
    const invalidate = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useMarkAllNotificationsRead(), {
      wrapper,
    });
    result.current.mutate();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: notificationKeys.lists(),
    });
    expect(invalidate).toHaveBeenCalledWith({
      queryKey: notificationKeys.unreadCount(),
    });
  });
});
