import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in or join — SoulMate" },
      { name: "description", content: "Join SoulMate — Africa's verified matrimonial platform for marriage-minded singles." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate({ to: "/onboarding" });
      } else {
        setChecking(false);
      }
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        if (password.length < 8) {
          toast.error("Password must be at least 8 characters.");
          setLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/onboarding`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Welcome to SoulMate.");
          router.invalidate();
          navigate({ to: "/onboarding" });
        } else {
          toast.success("Check your email to verify your account.");
          setMode("signin");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in.");
        router.invalidate();
        navigate({ to: "/onboarding" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster />
      <header className="border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl text-primary tracking-tight">SoulMate</Link>
          <button
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            {mode === "signup" ? "Already a member? Sign in" : "New here? Create account"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70 mb-3">
              {mode === "signup" ? "Begin your story" : "Welcome back"}
            </p>
            <h1 className="font-serif text-4xl text-foreground leading-tight">
              {mode === "signup" ? "Meet with intention." : "Continue your journey."}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              {mode === "signup"
                ? "Every member is verified. Every intention is marriage."
                : "Sign in to see today's curation."}
            </p>
          </div>

          <Card className="p-8 bg-card border-border/60">
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Adaeze Okonkwo"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full h-11 mt-2">
                {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
              </Button>
            </form>

            {mode === "signup" && (
              <p className="mt-5 text-xs text-muted-foreground text-center leading-relaxed">
                By joining, you agree to our respectful community standards and to
                verifying your identity before matching begins.
              </p>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
