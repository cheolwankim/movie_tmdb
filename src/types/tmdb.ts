export type Paginated<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type MovieQuery = {
  q?: string; // 검색어
  genre?: number | null;
  sortBy?: "popularity.desc" | "vote_average.desc" | "release_date.desc";
  year?: number | null; // 개봉연도
  minRating?: number; // 0~10
};
