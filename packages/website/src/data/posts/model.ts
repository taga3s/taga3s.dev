export interface IRawPost {
  id: string;
  title: string;
  rawHtml: string;
  category: string[];
  publishedAt: string;
  updatedAt?: string;
}

export interface IPost {
  id: string;
  title: string;
  rawHtml: string;
  category: string[];
  publishedAt: Date;
  updatedAt: Date;
}
