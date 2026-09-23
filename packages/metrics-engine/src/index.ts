import { WorkerEntrypoint } from "cloudflare:workers";
import { Undefinable } from "./types";
import { createWeeklyReport, reportQuery, WeeklyReport } from "./report";

interface Env {
  TAGA3S_DEV_ACCOUNT_ZONE_READ_TOKEN: SecretsStoreSecret;
  ZONE_ID: SecretsStoreSecret;
}

const API_BASE_URL = "https://api.cloudflare.com/client/v4/graphql";

export class ReporterEntrypoint extends WorkerEntrypoint<Env> {
  async create(span: { start: string; end: string }): Promise<Undefinable<WeeklyReport>> {
    try {
      const apiToken = await this.env.TAGA3S_DEV_ACCOUNT_ZONE_READ_TOKEN.get();
      const zoneId = await this.env.ZONE_ID.get();

      const res = await fetch(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          query: reportQuery,
          variables: {
            zoneTag: zoneId,
            filter: {
              datetime_geq: span.start,
              datetime_lt: span.end,
              clientRequestHTTPHost: "taga3s.dev",
              // ref: https://developers.cloudflare.com/logs/reference/clientrequestsource/
              // requestSource: "eyeball",
            },
          },
        }),
      });

      const rawData = await res.json();

      return createWeeklyReport(rawData);
    } catch (error) {
      console.error("Something went wrong while creating weekly report", error);
    }
  }
}

export default class extends WorkerEntrypoint<Env> {
  async fetch() {
    return new Response(JSON.stringify({ health: "ok" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// FIXME
export type { WeeklyReport };
