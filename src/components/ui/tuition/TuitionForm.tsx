"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/ui/shared/ImageUpload";
import { SUBJECTS, CLASS_LEVELS } from "@/lib/constants";

const schema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  subject: z.string().min(1, "Select a subject"),
  classLevel: z.string().min(1, "Select a class level"),
  mode: z.enum(["Online", "Offline"]),
  location: z.string(),
  monthlyFee: z.string().refine((v) => Number(v) > 0, "Enter a valid fee"),
  daysPerWeek: z
    .string()
    .refine((v) => Number(v) >= 1 && Number(v) <= 7, "Enter 1 to 7"),
  bannerImage: z.string(),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

export type TuitionFormValues = z.infer<typeof schema>;

type Props = {
  initial?: Partial<TuitionFormValues>;
  submitLabel: string;
  submitting: boolean;
  onSubmit: (values: TuitionFormValues) => void | Promise<void>;
};

const selectClass =
  "h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function TuitionForm({ initial, submitLabel, submitting, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TuitionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      subject: "",
      classLevel: "",
      mode: "Online",
      location: "",
      monthlyFee: "",
      daysPerWeek: "3",
      bannerImage: "",
      description: "",
      ...initial,
    },
  });

  const bannerImage = useWatch({ control, name: "bannerImage" });

  const err = (msg?: string) =>
    msg ? <p className="text-sm text-red-500">{msg}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="HSC Physics Batch" {...register("title")} />
        {err(errors.title?.message)}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <select id="subject" className={selectClass} {...register("subject")}>
            <option value="">Select subject</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {err(errors.subject?.message)}
        </div>

        <div className="space-y-2">
          <Label htmlFor="classLevel">Class Level</Label>
          <select id="classLevel" className={selectClass} {...register("classLevel")}>
            <option value="">Select class level</option>
            {CLASS_LEVELS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {err(errors.classLevel?.message)}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mode">Mode</Label>
          <select id="mode" className={selectClass} {...register("mode")}>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="Dhanmondi, Dhaka (or Zoom)" {...register("location")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyFee">Monthly Fee ($)</Label>
          <Input id="monthlyFee" type="number" min="1" {...register("monthlyFee")} />
          {err(errors.monthlyFee?.message)}
        </div>

        <div className="space-y-2">
          <Label htmlFor="daysPerWeek">Days per Week</Label>
          <Input id="daysPerWeek" type="number" min="1" max="7" {...register("daysPerWeek")} />
          {err(errors.daysPerWeek?.message)}
        </div>
      </div>

      <ImageUpload
        label="Banner Image"
        value={bannerImage}
        onChange={(url) => setValue("bannerImage", url)}
      />

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          rows={5}
          placeholder="Describe the syllabus, schedule and who this batch is for"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...register("description")}
        />
        {err(errors.description?.message)}
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}