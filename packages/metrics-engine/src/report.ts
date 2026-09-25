import * as v from "valibot";
import { Undefinable } from "./types";
import { toPercentage } from "./utils";

export const reportQuery = `
query RequestsAndDataTransferByHostname($zoneTag: string, $filter: ZoneHttpRequestsAdaptiveGroupsFilter_InputObject!) {
  viewer {
    zones(filter: {zoneTag: $zoneTag}) {
      httpRequestsAdaptiveGroups(limit: 100, filter: $filter) {
        count
        dimensions {
          date
          edgeResponseStatus
        }
      }
      cacheGroups: httpRequestsAdaptiveGroups(limit: 100, filter: $filter) {
        count
        dimensions {
          cacheStatus
        }
      }
    }
  }
}
`;

export const ReportQueryReponseSchema = v.object({
  data: v.object({
    viewer: v.object({
      zones: v.array(
        v.object({
          cacheGroups: v.array(
            v.object({
              count: v.number(),
              dimensions: v.object({
                cacheStatus: v.picklist(["none", "bypass", "hit", "expired", "stale", "miss", "revalidated"]),
              }),
            }),
          ),
          httpRequestsAdaptiveGroups: v.array(
            v.object({ count: v.number(), dimensions: v.object({ date: v.string(), edgeResponseStatus: v.number() }) }),
          ),
        }),
      ),
    }),
  }),
});

export type ReportQueryReponse = v.InferOutput<typeof ReportQueryReponseSchema>;

export interface WeeklyReport {
  httpStatusRatio: {
    status2xx: number;
    status3xx: number;
    status4xx: number;
    status5xx: number;
  };
  cacheRatio: {
    none: number;
    bypass: number;
    hit: number;
    stale: number;
    expired: number;
    miss: number;
    revalidated: number;
  };
}

export const createWeeklyReport = (rawData: unknown): Undefinable<WeeklyReport> => {
  const parsed = v.safeParse(ReportQueryReponseSchema, rawData);
  if (!parsed.success) {
    console.log(`Invalid data detected, ${JSON.stringify(rawData)}`);
    return undefined;
  }

  const aggregatedHttpRequests = aggregateHttpRequests(parsed.output);
  const aggregatedCacheGroups = aggregateCacheGroups(parsed.output);

  return {
    httpStatusRatio: {
      status2xx: toPercentage(aggregatedHttpRequests.status2xxCount / aggregatedHttpRequests.totalCount),
      status3xx: toPercentage(aggregatedHttpRequests.status3xxCount / aggregatedHttpRequests.totalCount),
      status4xx: toPercentage(aggregatedHttpRequests.status4xxCount / aggregatedHttpRequests.totalCount),
      status5xx: toPercentage(aggregatedHttpRequests.status5xxCount / aggregatedHttpRequests.totalCount),
    },
    cacheRatio: {
      none: toPercentage(aggregatedCacheGroups.none / aggregatedCacheGroups.totalCount),
      bypass: toPercentage(aggregatedCacheGroups.bypass / aggregatedCacheGroups.totalCount),
      hit: toPercentage(aggregatedCacheGroups.hit / aggregatedCacheGroups.totalCount),
      expired: toPercentage(aggregatedCacheGroups.expired / aggregatedCacheGroups.totalCount),
      stale: toPercentage(aggregatedCacheGroups.stale / aggregatedCacheGroups.totalCount),
      miss: toPercentage(aggregatedCacheGroups.miss / aggregatedCacheGroups.totalCount),
      revalidated: toPercentage(aggregatedCacheGroups.revalidated / aggregatedCacheGroups.totalCount),
    },
  };
};

export const aggregateHttpRequests = (
  queriedData: ReportQueryReponse,
): {
  totalCount: number;
  status2xxCount: number;
  status3xxCount: number;
  status4xxCount: number;
  status5xxCount: number;
} => {
  const httpRequests = queriedData.data.viewer.zones[0].httpRequestsAdaptiveGroups;
  const aggregated = {
    totalCount: 0,
    status2xxCount: 0,
    status3xxCount: 0,
    status4xxCount: 0,
    status5xxCount: 0,
  };

  for (const req of httpRequests) {
    aggregated.totalCount += req.count;
    const quotient = Math.trunc(req.dimensions.edgeResponseStatus / 100);
    if (quotient === 2) aggregated.status2xxCount += req.count;
    if (quotient === 3) aggregated.status3xxCount += req.count;
    if (quotient === 4) aggregated.status4xxCount += req.count;
    if (quotient === 5) aggregated.status5xxCount += req.count;
  }

  return aggregated;
};

export const aggregateCacheGroups = (
  queriedData: ReportQueryReponse,
): {
  totalCount: number;
  none: number;
  bypass: number;
  hit: number;
  stale: number;
  expired: number;
  miss: number;
  revalidated: number;
} => {
  const cacheGroups = queriedData.data.viewer.zones[0].cacheGroups;
  const aggregated = {
    totalCount: 0,
    none: 0,
    bypass: 0,
    hit: 0,
    stale: 0,
    expired: 0,
    miss: 0,
    revalidated: 0,
  };

  for (const group of cacheGroups) {
    aggregated.totalCount += group.count;
    aggregated[group.dimensions.cacheStatus] += group.count;
  }

  return aggregated;
};
