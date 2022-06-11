export interface GetContentListResponse {
  contents: Content[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface GetCategoryListResponse {
  contents: Category[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface GetContentDetailResponse {
  content: Content;
}

export interface Content {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  eyecatch: Eyecatch;
  category: Category;
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
}

export interface Eyecatch {
  url: string;
  height: number;
  width: number;
}
