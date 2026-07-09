import {
  getApplicationMethodCatalog,
  getAvailabilityPresetCatalog,
  getDurationOptionCatalog,
  getProjectFieldCatalog,
  getProjectPlatformCatalog,
  getProjectPositionCatalog,
  getWorkModeCatalog,
} from "./catalogApi";
import { httpClient } from "@/shared/api";

jest.mock("@/shared/api", () => ({
  httpClient: { get: jest.fn().mockResolvedValue([]) },
}));

const get = httpClient.get as jest.Mock;

describe("catalogApi (프로젝트/프로필 카탈로그)", () => {
  beforeEach(() => get.mockClear());

  const cases: [string, (s?: AbortSignal) => Promise<unknown>, string][] = [
    ["availability-presets", getAvailabilityPresetCatalog, "/catalogs/availability-presets"],
    ["application-methods", getApplicationMethodCatalog, "/catalogs/application-methods"],
    ["duration-options", getDurationOptionCatalog, "/catalogs/duration-options"],
    ["project-fields", getProjectFieldCatalog, "/catalogs/project-fields"],
    ["project-platforms", getProjectPlatformCatalog, "/catalogs/project-platforms"],
    ["project-positions", getProjectPositionCatalog, "/catalogs/project-positions"],
    ["work-modes", getWorkModeCatalog, "/catalogs/work-modes"],
  ];

  it.each(cases)("%s → GET %s (signal 전달)", async (_name, fn, path) => {
    const signal = new AbortController().signal;
    await fn(signal);
    expect(get).toHaveBeenCalledWith(path, { signal });
  });
});
