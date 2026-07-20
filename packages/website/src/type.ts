export interface Bindings {
  TAGA3S_DEV_BUCKET: R2Bucket;
  WORKERS_ENV: string;
  POLICY_AUD: string;
  TEAM_DOMAIN: string;
}

export interface Variables {
  isPreview: boolean;
}

export interface ContextSet {
  Bindings: Bindings;
  Variables: Variables;
}
