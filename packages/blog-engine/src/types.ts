export interface Env {
  TAGA3S_DEV_BUCKET: R2Bucket;
}

export interface OutGenerate {
  ogpUrls: string[];
}

export interface BlogOutItem {
  id: string;
  title: string;
  category: string[];
  description: string;
  publishedAt: string;
}

export type Undefinable<T> = T | undefined;
