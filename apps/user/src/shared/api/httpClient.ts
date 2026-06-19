import { env } from "@/shared/config";
import { ApiError } from "./ApiError";
import {
  getAccessToken,
  getRefreshHandler,
  notifyUnauthorized,
} from "./authBridge";

/**
 * 백엔드 단일 진입점 fetch 래퍼.
 * - baseURL 은 env 의 `NEXT_PUBLIC_API_BASE_URL`.
 * - refresh 토큰은 httpOnly 쿠키이므로 항상 `credentials: "include"`.
 * - access token 은 authBridge 에 등록된 provider 에서 읽어 Bearer 로 붙인다.
 * - 401 이면 authBridge 의 refresh 핸들러로 토큰을 한 번 재발급 후 1회 재시도.
 * - 2xx 가 아니면 `ApiError` throw → TanStack Query 전역 핸들러로 모인다.
 */

const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export interface RequestOptions {
  query?: QueryParams;
  body?: unknown;
  signal?: AbortSignal;
  headers?: Record<string, string>;
  /** true 면 401 자동 refresh/재시도를 건너뛴다 (refresh/logout 자체 호출에 사용) */
  skipAuthRefresh?: boolean;
}

function buildUrl(path: string, query?: QueryParams): string {
  const url = new URL(`${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value == null) continue;
      const values = Array.isArray(value) ? value : [value];
      for (const v of values) {
        if (v == null) continue;
        url.searchParams.append(key, String(v));
      }
    }
  }
  return url.toString();
}

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204) return null;
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    return text.length ? text : null;
  }
  return res.json();
}

// refresh 단일 비행(single-flight): 동시 401 들이 refresh 를 중복 호출하지 않도록 공유한다.
let refreshInFlight: Promise<string | null> | null = null;

function runRefresh(): Promise<string | null> {
  const handler = getRefreshHandler();
  if (!handler) return Promise.resolve(null);
  refreshInFlight ??= handler().finally(() => {
    refreshInFlight = null;
  });
  return refreshInFlight;
}

async function send(
  method: string,
  path: string,
  options: RequestOptions,
): Promise<Response> {
  const headers: Record<string, string> = { ...options.headers };
  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let serializedBody: BodyInit | undefined;
  if (options.body !== undefined && options.body !== null) {
    headers["Content-Type"] ??= "application/json";
    serializedBody = JSON.stringify(options.body);
  }

  return fetch(buildUrl(path, options.query), {
    method,
    headers,
    body: serializedBody,
    credentials: "include",
    signal: options.signal,
  });
}

async function request<T>(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  let res = await send(method, path, options);

  // 401 → refresh 후 1회 재시도. refresh/logout 자체 호출은 무한 루프 방지로 skip.
  if (res.status === 401 && !options.skipAuthRefresh) {
    const newToken = await runRefresh();
    if (newToken) {
      res = await send(method, path, options);
    } else {
      notifyUnauthorized();
    }
  }

  const body = await parseBody(res);

  if (!res.ok) {
    throw new ApiError(res.status, body, `${method} ${path} 요청에 실패했습니다.`);
  }

  return body as T;
}

export const httpClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, options),
};

/** baseURL — OAuth 시작 등 브라우저 redirect 용 절대경로가 필요할 때 사용 */
export const apiBaseUrl = BASE_URL;
