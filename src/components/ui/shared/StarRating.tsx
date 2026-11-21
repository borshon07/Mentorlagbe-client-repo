import { Star } from "lucide-react";

export default function StarRating({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          style={{ width: size, height: size }}
          className={n <= Math.round(value) ? "fill-[#E9C9A5] text-[#E9C9A5]" : "text-muted-foreground/40"}
        />
      ))}
    </span>
  );
}