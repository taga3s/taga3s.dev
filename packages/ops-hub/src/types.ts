export interface Env {
  DISCORD_WEBHOOK_URL: SecretsStoreSecret;
}

export interface CfDevelopmentCreated {
  type: "cf.workers.script.deployment.created";
  source: { id: string; type: "workers.script" };
  metadata: {
    accountId: string;
    eventSubscriptionId: string;
    eventSchemaVersion: number;
    eventTimestamp: string;
  };
  payload: {
    workerName: string;
    id: string;
    strategy: string;
    versions: {
      versionId: string;
      percentage: number;
    }[];
    annotations: {
      "workers/triggered_by": "deployment";
    };
    authorEmail: string;
    createdOn: string;
  };
}

export interface Message {
  type: "deployment.created";
  body: string;
  date: string;
}
