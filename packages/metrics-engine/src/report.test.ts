import * as v from "valibot";
import { aggregateCacheGroups, aggregateHttpRequests, ReportQueryReponse, ReportQueryReponseSchema } from "./report";

const MOCK_DATA = {
  data: {
    viewer: {
      zones: [
        {
          cacheGroups: [
            { count: 7596, dimensions: { cacheStatus: "none" } },
            { count: 353, dimensions: { cacheStatus: "hit" } },
            { count: 1572, dimensions: { cacheStatus: "stale" } },
            { count: 1483, dimensions: { cacheStatus: "expired" } },
            { count: 7413, dimensions: { cacheStatus: "miss" } },
            { count: 104, dimensions: { cacheStatus: "revalidated" } },
          ],
          httpRequestsAdaptiveGroups: [
            { count: 445, dimensions: { date: "2026-09-14", edgeResponseStatus: 504 } },
            { count: 813, dimensions: { date: "2026-09-20", edgeResponseStatus: 404 } },
            { count: 12, dimensions: { date: "2026-09-21", edgeResponseStatus: 301 } },
            { count: 114, dimensions: { date: "2026-09-17", edgeResponseStatus: 403 } },
            { count: 1010, dimensions: { date: "2026-09-18", edgeResponseStatus: 504 } },
            { count: 60, dimensions: { date: "2026-09-16", edgeResponseStatus: 200 } },
            { count: 91, dimensions: { date: "2026-09-20", edgeResponseStatus: 304 } },
            { count: 4, dimensions: { date: "2026-09-14", edgeResponseStatus: 403 } },
            { count: 39, dimensions: { date: "2026-09-19", edgeResponseStatus: 200 } },
            { count: 807, dimensions: { date: "2026-09-17", edgeResponseStatus: 504 } },
            { count: 59, dimensions: { date: "2026-09-18", edgeResponseStatus: 403 } },
            { count: 66, dimensions: { date: "2026-09-15", edgeResponseStatus: 200 } },
            { count: 1023, dimensions: { date: "2026-09-20", edgeResponseStatus: 204 } },
            { count: 29, dimensions: { date: "2026-09-20", edgeResponseStatus: 403 } },
            { count: 83, dimensions: { date: "2026-09-16", edgeResponseStatus: 301 } },
            { count: 20, dimensions: { date: "2026-09-14", edgeResponseStatus: 304 } },
            { count: 990, dimensions: { date: "2026-09-18", edgeResponseStatus: 204 } },
            { count: 915, dimensions: { date: "2026-09-17", edgeResponseStatus: 404 } },
            { count: 519, dimensions: { date: "2026-09-14", edgeResponseStatus: 204 } },
            { count: 68, dimensions: { date: "2026-09-21", edgeResponseStatus: 200 } },
            { count: 437, dimensions: { date: "2026-09-14", edgeResponseStatus: 404 } },
            { count: 901, dimensions: { date: "2026-09-20", edgeResponseStatus: 504 } },
            { count: 24, dimensions: { date: "2026-09-15", edgeResponseStatus: 301 } },
            { count: 870, dimensions: { date: "2026-09-17", edgeResponseStatus: 204 } },
            { count: 995, dimensions: { date: "2026-09-18", edgeResponseStatus: 404 } },
            { count: 55, dimensions: { date: "2026-09-19", edgeResponseStatus: 301 } },
            { count: 75, dimensions: { date: "2026-09-14", edgeResponseStatus: 200 } },
            { count: 855, dimensions: { date: "2026-09-21", edgeResponseStatus: 204 } },
            { count: 2, dimensions: { date: "2026-09-19", edgeResponseStatus: 403 } },
            { count: 81, dimensions: { date: "2026-09-18", edgeResponseStatus: 200 } },
            { count: 423, dimensions: { date: "2026-09-16", edgeResponseStatus: 504 } },
            { count: 226, dimensions: { date: "2026-09-15", edgeResponseStatus: 403 } },
            { count: 380, dimensions: { date: "2026-09-19", edgeResponseStatus: 504 } },
            { count: 111, dimensions: { date: "2026-09-17", edgeResponseStatus: 200 } },
            { count: 75, dimensions: { date: "2026-09-20", edgeResponseStatus: 301 } },
            { count: 14, dimensions: { date: "2026-09-16", edgeResponseStatus: 403 } },
            { count: 483, dimensions: { date: "2026-09-15", edgeResponseStatus: 504 } },
            { count: 806, dimensions: { date: "2026-09-21", edgeResponseStatus: 404 } },
            { count: 144, dimensions: { date: "2026-09-18", edgeResponseStatus: 301 } },
            { count: 386, dimensions: { date: "2026-09-16", edgeResponseStatus: 204 } },
            { count: 380, dimensions: { date: "2026-09-19", edgeResponseStatus: 404 } },
            { count: 159, dimensions: { date: "2026-09-14", edgeResponseStatus: 301 } },
            { count: 1, dimensions: { date: "2026-09-20", edgeResponseStatus: 400 } },
            { count: 634, dimensions: { date: "2026-09-15", edgeResponseStatus: 404 } },
            { count: 798, dimensions: { date: "2026-09-21", edgeResponseStatus: 504 } },
            { count: 474, dimensions: { date: "2026-09-15", edgeResponseStatus: 204 } },
            { count: 694, dimensions: { date: "2026-09-20", edgeResponseStatus: 200 } },
            { count: 365, dimensions: { date: "2026-09-19", edgeResponseStatus: 204 } },
            { count: 367, dimensions: { date: "2026-09-16", edgeResponseStatus: 404 } },
            { count: 29, dimensions: { date: "2026-09-21", edgeResponseStatus: 403 } },
            { count: 110, dimensions: { date: "2026-09-17", edgeResponseStatus: 301 } },
          ],
        },
      ],
    },
  },
  errors: null,
};

describe("v.safeParse", () => {
  it("parses successfully", () => {
    const parsed = v.safeParse(ReportQueryReponseSchema, MOCK_DATA);
    expect(parsed.success).toBe(true);
  });
});

describe("aggregate funcs", () => {
  it("aggregateHttpRequests: should return expected value", () => {
    const result = aggregateHttpRequests(MOCK_DATA as ReportQueryReponse);
    expect(result.totalCount).toBe(18521);
    expect(result.status2xxCount).toBe(6676);
    expect(result.status3xxCount).toBe(773);
    expect(result.status4xxCount).toBe(5825);
    expect(result.status5xxCount).toBe(5247);
  });

  it("aggregateCacheGroups: should return expected value", () => {
    const result = aggregateCacheGroups(MOCK_DATA as ReportQueryReponse);
    expect(result.totalCount).toBe(18521);
    expect(result.hit).toBe(353);
    expect(result.miss).toBe(7413);
    expect(result.revalidated).toBe(104);
    expect(result.stale).toBe(1572);
    expect(result.expired).toBe(1483);
    expect(result.none).toBe(7596);
  });
});
