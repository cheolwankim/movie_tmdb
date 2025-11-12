import { useCallback, useMemo, useState } from "react";
import type { Movie, MovieQuery } from "../types/tmdb";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";

import MovieCard from "../components/MovieCard";
import MovieGrid from "../components/MoiveGrid";

export default function Home() {
  const [query, setQuery] = useState<MovieQuery>({
    q: "",
    genre: null,
    sortBy: "popularity.desc",
    year: null,
    minRating: undefined,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteMovies({ ...query, q: query.q?.trim() || undefined });

  const onDebouncedChange = useCallback((q: string) => {
    setQuery((prev) => ({ ...prev, q }));
  }, []);

  const handleFilterChange = useCallback((next: MovieQuery) => {
    setQuery(next);
  }, []);

  return (
    <main className="max-w-7xl mx-auto p-4">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-2xl font-bold">TMDB Browser</h1>
        <SearchBar
          value={query.q ?? ""}
          onDebouncedChange={onDebouncedChange}
        />
      </header>

      <section className="mb-4">
        <FilterBar query={query} onChange={handleFilterChange} />
      </section>

      {isLoading && (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-200 rounded-xl aspect-[2/3]"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-600">
          데이터를 불러오는 중 오류가 발생했습니다.
        </p>
      )}

      {!isLoading && !isError && (
        <MovieGrid<Movie>
          pages={data?.pages}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          onLoadMore={() => fetchNextPage()}
          renderItem={(m) => <MovieCard movie={m} />}
        />
      )}
    </main>
  );
}
