interface IPost {
  id: string;
  title: string;
  category: string[];
  publishedAt: Date;
  updatedAt: Date;
}

export type { IPost };
