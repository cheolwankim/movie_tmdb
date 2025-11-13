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

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
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

  const toggleDarkMode = useCallback(() => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto p-4">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">TMDB Browser</h1>
          <div className="flex gap-2 items-center">
            <SearchBar
              value={query.q ?? ""}
              onDebouncedChange={onDebouncedChange}
            />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              title="Toggle dark mode"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </header>

        <section className="mb-4">
          <FilterBar query={query} onChange={handleFilterChange} />
        </section>

        {isLoading && (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-slate-700 rounded-xl aspect-[2/3]"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-red-600 dark:text-red-400">
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
      </div>
    </main>
  );
}
