export interface Bindings {
  TAGA3S_DEV_BUCKET: R2Bucket;
}

export interface Variables {
  isPreview: boolean;
}

export interface ContextSet {
  Bindings: Bindings;
  Variables: Variables;
}
