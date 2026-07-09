import {
  formatRelativeTime,
  isTitleTruncated,
  isWithin30Days,
  truncateTitle,
} from "./format";

const NOW = Date.UTC(2026, 6, 9, 12, 0, 0); // 고정 기준시각
const iso = (ms: number) => new Date(NOW - ms).toISOString();
const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

describe("formatRelativeTime", () => {
  it.each([
    [30_000, "방금 전"],
    [1 * MIN, "1분 전"],
    [59 * MIN, "59분 전"],
    [1 * HOUR, "1시간 전"],
    [23 * HOUR, "23시간 전"],
    [1 * DAY, "어제"],
    [2 * DAY, "2일 전"],
    [10 * DAY, "10일 전"],
  ])("%dms 전 → %s", (ago, expected) => {
    expect(formatRelativeTime(iso(ago), NOW)).toBe(expected);
  });
});

describe("isWithin30Days", () => {
  it("30일 이내면 true", () => {
    expect(isWithin30Days(iso(29 * DAY), NOW)).toBe(true);
  });
  it("30일 초과면 false", () => {
    expect(isWithin30Days(iso(31 * DAY), NOW)).toBe(false);
  });
});

describe("truncateTitle / isTitleTruncated", () => {
  it("15자 이하는 그대로 둔다", () => {
    expect(isTitleTruncated("알림 제목")).toBe(false);
    expect(truncateTitle("알림 제목")).toBe("알림 제목");
  });
  it("15자 초과는 15자 + 말줄임", () => {
    const long = "알림 제목은 몇자까지로 해야할까요오오ㅇㅇㅇ";
    expect(isTitleTruncated(long)).toBe(true);
    expect(truncateTitle(long)).toBe(`${long.slice(0, 15)}…`);
    expect(truncateTitle(long)).toHaveLength(16); // 15자 + …
  });
});
