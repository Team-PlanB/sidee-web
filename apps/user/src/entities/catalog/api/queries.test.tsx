import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useProjectFieldCatalog } from "./queries";
import * as api from "./catalogApi";

jest.mock("./catalogApi");

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

describe("useProjectFieldCatalog", () => {
  it("getProjectFieldCatalog 결과를 반환한다", async () => {
    const items = [{ code: "COMMUNITY" as const, label: "커뮤니티" }];
    mockApi.getProjectFieldCatalog.mockResolvedValue(items);

    const { result } = renderHook(() => useProjectFieldCatalog(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(items);
  });
});
