import { useEffect, useMemo, useState } from "react";

type Props = {
  value: string;
  onDebouncedChange: (val: string) => void;
  delay?: number;
};

export default function SearchBar({ value, onDebouncedChange, delay = 400 }: Props) {
  const [inner, setInner] = useState(value);

  useEffect(() => setInner(value), [value]);

  useEffect(() => {
    const id = setTimeout(() => onDebouncedChange(inner.trim()), delay);
    return () => clearTimeout(id);
  }, [inner, delay, onDebouncedChange]);

  return (
    <input
      placeholder="영화 검색..."
      value={inner}
      onChange={(e) => setInner(e.target.value)}
      className="w-full md:w-96 rounded-lg border px-3 py-2 outline-none focus:ring focus:ring-blue-200 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 border-slate-300 dark:border-slate-600 placeholder-slate-500 dark:placeholder-slate-400"
    />
  );
}
