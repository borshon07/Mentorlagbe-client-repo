"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { publicFetch } from "@/lib/api";
import { SUBJECTS, CLASS_LEVELS, DISTRICTS } from "@/lib/constants";
import type { PaginatedTuitions } from "@/types";
import TuitionCard from "@/components/ui/tuition/TuitionCard";
import Pagination from "@/components/ui/tuition/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const selectClass =
  "h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

type Initial = {
  search: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
};

export default function BrowseClient({ initial }: { initial: Initial }) {
  const [search, setSearch] = useState(initial.search);
  const [debouncedSearch, setDebouncedSearch] = useState(initial.search);
  const [subject, setSubject] = useState(initial.subject);
  const [classLevel, setClassLevel] = useState(initial.classLevel);
  const [mode, setMode] = useState(initial.mode);
  const [location, setLocation] = useState(initial.location);
  const [page, setPage] = useState(1);

  const [result, setResult] = useState<PaginatedTuitions | null>(null);
  const [error, setError] = useState("");
  const [loadedKey, setLoadedKey] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const queryString = (() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (subject) params.set("subject", subject);
    if (classLevel) params.set("classLevel", classLevel);
    if (mode) params.set("mode", mode);
    if (location) params.set("location", location);
    params.set("page", String(page));
    params.set("limit", "9");
    return params.toString();
  })();

  const loading = loadedKey !== queryString;

  useEffect(() => {
    let cancelled = false;
    publicFetch<PaginatedTuitions>(`/api/tuitions?${queryString}`)
      .then((data) => {
        if (cancelled) return;
        setResult(data);
        setError("");
        setLoadedKey(queryString);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message);
        setLoadedKey(queryString);
      });
    return () => {
      cancelled = true;
    };
  }, [queryString]);

  const resetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSubject("");
    setClassLevel("");
    setMode("");
    setLocation("");
    setPage(1);
  };

  const onFilter = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setPage(1);
  };

  return (
    <main className="mx-auto max-w-7xl space-y-8 px-4 py-10">
      <div>
        <h1 className="text-3xl font-bold">Browse Tuitions</h1>
        <p className="mt-1 text-muted-foreground">
          Find the right tutor by subject, class level, mode and district.
        </p>
      </div>

      <div className="glass grid gap-3 rounded-2xl p-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title or subject"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <select className={selectClass} value={subject} onChange={(e) => onFilter(setSubject)(e.target.value)}>
          <option value="">All Subjects</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select className={selectClass} value={classLevel} onChange={(e) => onFilter(setClassLevel)(e.target.value)}>
          <option value="">All Class Levels</option>
          {CLASS_LEVELS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select className={selectClass} value={mode} onChange={(e) => onFilter(setMode)(e.target.value)}>
          <option value="">Online & Offline</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <select className={selectClass} value={location} onChange={(e) => onFilter(setLocation)(e.target.value)}>
          <option value="">All Districts</option>
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : result && result.data.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground">
            {result.total} tuition{result.total > 1 ? "s" : ""} found
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((t) => (
              <TuitionCard key={t._id} tuition={t} />
            ))}
          </div>
          <Pagination page={result.page} totalPages={result.totalPages} onChange={setPage} />
        </>
      ) : (
        !error && (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-lg font-semibold">No tuitions found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try changing your search or filters.</p>
            <Button className="mt-4" variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        )
      )}
    </main>
  );
}