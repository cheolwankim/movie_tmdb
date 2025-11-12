import { useInfiniteQuery } from "@tanstack/react-query";
import { tmdb } from "../lib/tmdb";
import type { Movie, Paginated, MovieQuery } from "../types/tmdb";

type FetchParams = MovieQuery & { pageParam?: number };

async function fetchMovies(params: FetchParams): Promise<Paginated<Movie>> {
  const { q, genre, sortBy, year, minRating, pageParam = 1 } = params;

  const base = q ? "/search/movie" : "/discover/movie";
  const res = await tmdb.get<Paginated<Movie>>(base, {
    params: {
      page: pageParam,
      query: q || undefined,
      with_genres: genre || undefined,
      sort_by: sortBy || undefined,
      primary_release_year: year || undefined,
      "vote_average.gte": minRating ?? undefined,
      include_adult: false,
    },
  });
  return res.data;
}

export function useInfiniteMovies(query: MovieQuery) {
  return useInfiniteQuery({
    queryKey: ["movies", query],
    queryFn: ({ pageParam }) => fetchMovies({ ...query, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      const next = last.page + 1;
      return next <= last.total_pages ? next : undefined;
    },
  });
}
