"use client";

import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          size="sm"
          variant={p === page ? "default" : "outline"}
          onClick={() => onChange(p)}
        >
          {p}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </div>
  );
}