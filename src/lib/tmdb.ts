import axios from "axios";

const baseURL = import.meta.env.VITE_TMDB_BASE_URL as string;
const apiKey = import.meta.env.VITE_TMDB_API_KEY as string;

export const tmdb = axios.create({
  baseURL,
  params: { api_key: apiKey, language: "ko-KR" },
});

// 이미지 URL 헬퍼
export function imgUrl(path: string | null, size: "w185" | "w342" | "w500" | "original" = "w342") {
  if (!path) return "";
  const ROOT = import.meta.env.VITE_TMDB_IMG as string; // https://image.tmdb.org/t/p
  return `${ROOT}/${size}${path}`;
}
