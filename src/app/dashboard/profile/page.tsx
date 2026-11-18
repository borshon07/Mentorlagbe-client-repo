"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { authFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import type { AppUser } from "@/types";
import ImageUpload from "@/components/ui/shared/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string(),
  bio: z.string().max(300, "Bio must be 300 characters or less"),
});

type FormValues = z.infer<typeof schema>;

export default function ProfilePage() {
  const { refetch } = useSession();
  const [profile, setProfile] = useState<AppUser | null>(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", bio: "" },
  });

  useEffect(() => {
    let cancelled = false;
    authFetch<AppUser>("/api/users/me")
      .then((u) => {
        if (cancelled) return;
        setProfile(u);
        setImage(u.image || "");
        reset({ name: u.name, phone: u.phone || "", bio: u.bio || "" });
      })
      .catch((e) => toast.error(e.message))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reset]);

  const onSubmit = async (values: FormValues) => {
    setSaving(true);
    try {
      await authFetch("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify({ ...values, image }),
      });
      await refetch();
      toast.success("Profile updated");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="h-64 animate-pulse rounded-2xl bg-muted" />;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Update Profile</h1>
        <p className="text-sm text-muted-foreground">
          {profile?.email} · <span className="capitalize">{profile?.role}</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-2xl border bg-card p-6"
      >
        <ImageUpload label="Profile Picture" value={image} onChange={setImage} />

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+8801XXXXXXXXX" {...register("phone")} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            rows={4}
            placeholder="Tell us a little about yourself"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}