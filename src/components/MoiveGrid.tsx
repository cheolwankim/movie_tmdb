import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import useIntersection from "../hooks/useIntersection";
import { type ReactNode, useEffect } from "react";

type Props<T> = {
  pages: { results: T[] }[] | undefined;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  onLoadMore: () => void;
  renderItem: (item: T) => ReactNode;
  skeletonCount?: number;
};

export default function MovieGrid<T>({
  pages,
  isFetchingNextPage,
  hasNextPage,
  onLoadMore,
  renderItem,
  skeletonCount = 12,
}: Props<T>) {
  const { ref, isIntersecting } = useIntersection<HTMLDivElement>({ rootMargin: "200px" });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      onLoadMore();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, onLoadMore]);

  const items = pages?.flatMap((p) => p.results) ?? [];

  return (
    <>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((m, i) => (
          <div key={i}>{renderItem(m)}</div>
        ))}

        {isFetchingNextPage &&
          Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
      </div>

      <div ref={ref} className="h-8" />
    </>
  );
}
