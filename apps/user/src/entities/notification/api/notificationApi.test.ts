import {
  getNotifications,
  getUnreadCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "./notificationApi";
import { httpClient } from "@/shared/api";

jest.mock("@/shared/api", () => ({
  httpClient: {
    get: jest.fn().mockResolvedValue(undefined),
    patch: jest.fn().mockResolvedValue(undefined),
  },
}));

const get = httpClient.get as jest.Mock;
const patch = httpClient.patch as jest.Mock;

beforeEach(() => {
  get.mockClear();
  patch.mockClear();
});

describe("notificationApi", () => {
  it("getNotifications → GET /notifications (파라미터를 query 로 전달)", async () => {
    const signal = new AbortController().signal;
    await getNotifications({ unreadOnly: true, page: 1 }, signal);
    expect(get).toHaveBeenCalledWith("/notifications", {
      query: { unreadOnly: true, page: 1 },
      signal,
    });
  });

  it("getUnreadCount → GET /notifications/unread-count", async () => {
    await getUnreadCount();
    expect(get).toHaveBeenCalledWith("/notifications/unread-count", {
      signal: undefined,
    });
  });

  it("markAllNotificationsRead → PATCH /notifications/read-all", async () => {
    await markAllNotificationsRead();
    expect(patch).toHaveBeenCalledWith("/notifications/read-all");
  });

  it("markNotificationRead → PATCH /notifications/:id/read", async () => {
    await markNotificationRead("n1");
    expect(patch).toHaveBeenCalledWith("/notifications/n1/read");
  });
});
