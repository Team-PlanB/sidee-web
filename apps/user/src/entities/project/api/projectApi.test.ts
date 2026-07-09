import {
  closeProject,
  createProject,
  deleteProject,
  getProject,
  getProjects,
  getRecommendedProjects,
  getRelatedProjects,
  likeProject,
  unlikeProject,
  updateProject,
} from "./projectApi";
import type { CreateProjectRequest } from "./dto";
import { httpClient } from "@/shared/api";

jest.mock("@/shared/api", () => ({
  httpClient: {
    get: jest.fn().mockResolvedValue(undefined),
    post: jest.fn().mockResolvedValue(undefined),
    patch: jest.fn().mockResolvedValue(undefined),
    delete: jest.fn().mockResolvedValue(undefined),
  },
}));

const get = httpClient.get as jest.Mock;
const post = httpClient.post as jest.Mock;
const patch = httpClient.patch as jest.Mock;
const del = httpClient.delete as jest.Mock;

beforeEach(() => {
  get.mockClear();
  post.mockClear();
  patch.mockClear();
  del.mockClear();
});

describe("projectApi", () => {
  it("getProjects → GET /projects (필터 파라미터를 query 로 전달)", async () => {
    const signal = new AbortController().signal;
    await getProjects({ q: "ai", position: "BACKEND", page: 2 }, signal);
    expect(get).toHaveBeenCalledWith("/projects", {
      query: { q: "ai", position: "BACKEND", page: 2 },
      signal,
    });
  });

  it("getProjects → 파라미터 없이 호출하면 query 는 undefined", async () => {
    await getProjects();
    expect(get).toHaveBeenCalledWith("/projects", {
      query: undefined,
      signal: undefined,
    });
  });

  it("getRecommendedProjects → GET /projects/recommended", async () => {
    await getRecommendedProjects();
    expect(get).toHaveBeenCalledWith("/projects/recommended", {
      signal: undefined,
    });
  });

  it("getProject → GET /projects/:id (id 를 경로에 넣는다)", async () => {
    await getProject("abc");
    expect(get).toHaveBeenCalledWith("/projects/abc", { signal: undefined });
  });

  it("getRelatedProjects → GET /projects/:id/related", async () => {
    await getRelatedProjects("abc");
    expect(get).toHaveBeenCalledWith("/projects/abc/related", {
      signal: undefined,
    });
  });

  it("createProject → POST /projects (body 전달)", async () => {
    const body = { title: "t" } as CreateProjectRequest;
    await createProject(body);
    expect(post).toHaveBeenCalledWith("/projects", body);
  });

  it("updateProject → PATCH /projects/:id (body 전달)", async () => {
    await updateProject("abc", { title: "new" });
    expect(patch).toHaveBeenCalledWith("/projects/abc", { title: "new" });
  });

  it("deleteProject → DELETE /projects/:id", async () => {
    await deleteProject("abc");
    expect(del).toHaveBeenCalledWith("/projects/abc");
  });

  it("closeProject → PATCH /projects/:id/close", async () => {
    await closeProject("abc");
    expect(patch).toHaveBeenCalledWith("/projects/abc/close");
  });

  it("likeProject → POST /projects/:id/like", async () => {
    await likeProject("abc");
    expect(post).toHaveBeenCalledWith("/projects/abc/like");
  });

  it("unlikeProject → DELETE /projects/:id/like", async () => {
    await unlikeProject("abc");
    expect(del).toHaveBeenCalledWith("/projects/abc/like");
  });
});
