import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ProjectDetail } from "../model/types";
import { projectKeys } from "./queryKeys";
import {
  useCreateProject,
  useLikeProject,
  useProjects,
} from "./queries";
import * as api from "./projectApi";

jest.mock("./projectApi");

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

describe("useProjects", () => {
  it("getProjects 결과를 반환한다", async () => {
    const result = { items: [], total: 0, page: 1, size: 20 };
    mockApi.getProjects.mockResolvedValue(result);
    const { wrapper } = setup();

    const { result: hook } = renderHook(() => useProjects({ page: 1 }), {
      wrapper,
    });

    await waitFor(() => expect(hook.current.isSuccess).toBe(true));
    expect(hook.current.data).toEqual(result);
    expect(mockApi.getProjects).toHaveBeenCalledWith(
      { page: 1 },
      expect.anything(),
    );
  });
});

describe("useLikeProject", () => {
  it("성공 시 상세 캐시의 likeCount/likedByMe 를 갱신하고 리스트를 무효화한다", async () => {
    mockApi.likeProject.mockResolvedValue({ likeCount: 2, likedByMe: true });
    const { queryClient, wrapper } = setup();
    // 상세 캐시를 미리 채워둔다 (좋아요 전 상태).
    queryClient.setQueryData(projectKeys.detail("p1"), {
      id: "p1",
      likeCount: 1,
      likedByMe: false,
    } as unknown as ProjectDetail);
    const invalidate = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useLikeProject(), { wrapper });
    result.current.mutate("p1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const detail = queryClient.getQueryData<ProjectDetail>(
      projectKeys.detail("p1"),
    );
    expect(detail?.likeCount).toBe(2);
    expect(detail?.likedByMe).toBe(true);
    expect(invalidate).toHaveBeenCalledWith({ queryKey: projectKeys.lists() });
  });
});

describe("useCreateProject", () => {
  it("성공 시 리스트 캐시를 무효화한다", async () => {
    mockApi.createProject.mockResolvedValue({
      id: "new",
    } as unknown as ProjectDetail);
    const { queryClient, wrapper } = setup();
    const invalidate = jest.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useCreateProject(), { wrapper });
    result.current.mutate({} as never);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(invalidate).toHaveBeenCalledWith({ queryKey: projectKeys.lists() });
  });
});
