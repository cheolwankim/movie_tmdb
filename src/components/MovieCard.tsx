import {type Movie } from "../types/tmdb";
import { imgUrl } from "../lib/tmdb";

type Props = { movie: Movie };

export default function MovieCard({ movie }: Props) {
  const src = imgUrl(movie.poster_path, "w342");
  return (
    <article className="rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition">
      {src ? (
        <img src={src} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-200" />
      )}
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-1">{movie.title}</h3>
        <p className="text-xs text-gray-500">{movie.release_date?.slice(0, 4) || "-"}</p>
        <p className="text-xs mt-1 text-gray-600 line-clamp-2">{movie.overview || "-"}</p>
        <div className="mt-2 text-xs">⭐ {movie.vote_average.toFixed(1)} ({movie.vote_count})</div>
      </div>
    </article>
  );
}
