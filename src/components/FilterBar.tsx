import { useQuery } from "@tanstack/react-query";
import { tmdb } from "../lib/tmdb";
import type { Genre, MovieQuery } from "../types/tmdb";

type Props = {
  query: MovieQuery;
  onChange: (next: MovieQuery) => void;
};

async function fetchGenres(): Promise<Genre[]> {
  const res = await tmdb.get<{ genres: Genre[] }>("/genre/movie/list");
  return res.data.genres;
}

export default function FilterBar({ query, onChange }: Props) {
  const { data: genres } = useQuery({ queryKey: ["genres"], queryFn: fetchGenres, staleTime: 1000 * 60 * 60 });

  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
      <select
        className="border rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border-slate-300 dark:border-slate-600"
        value={query.genre ?? ""}
        onChange={(e) =>
          onChange({ ...query, genre: e.target.value ? Number(e.target.value) : null })
        }
      >
        <option value="">장르 전체</option>
        {genres?.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      <select
        className="border rounded-lg px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border-slate-300 dark:border-slate-600"
        value={query.sortBy ?? "popularity.desc"}
        onChange={(e) => onChange({ ...query, sortBy: e.target.value as Props["query"]["sortBy"] })}
      >
        <option value="popularity.desc">인기순</option>
        <option value="vote_average.desc">평점순</option>
        <option value="release_date.desc">최신개봉순</option>
      </select>

      <input
        type="number"
        placeholder="개봉연도"
        className="border rounded-lg px-3 py-2 w-36 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border-slate-300 dark:border-slate-600"
        value={query.year ?? ""}
        onChange={(e) => onChange({ ...query, year: e.target.value ? Number(e.target.value) : null })}
      />

      <input
        type="number"
        min={0}
        max={10}
        step={0.5}
        placeholder="최소 평점(0~10)"
        className="border rounded-lg px-3 py-2 w-40 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border-slate-300 dark:border-slate-600"
        value={query.minRating ?? ""}
        onChange={(e) => onChange({ ...query, minRating: e.target.value ? Number(e.target.value) : undefined })}
      />
    </div>
  );
}
