import {
  QueryClient,
  QueryCache,
  MutationCache,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { handleApiError } from "./handleApiError";

function makeQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({ onError: handleApiError }),
    mutationCache: new MutationCache({ onError: handleApiError }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
      dehydrate: {
        // Server Component 에서 prefetch 한 in-flight query 도 dehydrate 한다.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/** 서버는 매 요청마다 새 client, 브라우저는 싱글턴을 재사용한다. */
export function getQueryClient(): QueryClient {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
