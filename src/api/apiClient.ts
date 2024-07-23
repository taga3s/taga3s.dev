import { Context } from "hono";
import { env } from "hono/adapter";
import { createClient } from "microcms-js-sdk";

const getApiClient = (c: Context) => {
  const { MICRO_CMS_SERVICE_DOMAIN, MICRO_CMS_API_KEY } = env<{
    MICRO_CMS_SERVICE_DOMAIN: string;
    MICRO_CMS_API_KEY: string;
  }>(c);
  const apiClient = createClient({
    serviceDomain: MICRO_CMS_SERVICE_DOMAIN,
    apiKey: MICRO_CMS_API_KEY,
  });

  return apiClient;
};

export { getApiClient };
