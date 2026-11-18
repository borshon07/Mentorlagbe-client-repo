"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { clearToken } from "@/lib/api";
import AuthShell from "@/components/ui/shared/AuthShell";
import GoogleButton from "@/components/ui/shared/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "tutor"]),
});

type FormValues = z.infer<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "student" },
  });

  const role = useWatch({ control, name: "role" });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Sign up failed");
      return;
    }
    toast.success("Account created successfully");
    clearToken();
    router.push("/dashboard");
  };

  return (
    <AuthShell
      heading={
        <>
          Learn better with the <span className="text-[#e9c9a5]">right mentor</span>.
        </>
      }
      points={[
        "Verified tutors for every subject",
        "Apply and track applications in one place",
        "Secure Pro upgrade with Stripe",
      ]}
    >
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Join MentorLagbe as a student or a tutor.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Your name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="At least 6 characters" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>I want to join as</Label>
          <div className="grid grid-cols-2 gap-3">
            {(["student", "tutor"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setValue("role", r)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition ${
                  role === r
                    ? "btn-accent border-transparent"
                    : "glass hover:border-primary/40"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
      </div>
      <GoogleButton label="Sign up with Google" />
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Google accounts join as students. To join as a tutor, use email sign up.
      </p>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </AuthShell>
  );
}