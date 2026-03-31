export interface News {
  id: string;
  title: string;
  summary: string;
  source: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface NewsGroupedResponse {
  [date: string]: News[];
}

export interface PaginatedNews {
  current_page: number;
  data: News[];

  first_page_url: string;
  last_page: number;
  last_page_url: string;

  from: number | null;
  to: number | null;
  total: number;
  per_page: number;

  next_page_url: string | null;
  prev_page_url: string | null;

  path: string;

  links: {
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
  };
}