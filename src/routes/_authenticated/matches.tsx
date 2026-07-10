import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_authenticated/matches")({
  head: () => ({
    meta: [
      { title: "Today's curation — The Clove of Love" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MatchesPage,
});

type Profile = {
  id: string;
  full_name: string | null;
  gender: string | null;
  date_of_birth: string | null;
  location_city: string | null;
  location_country: string | null;
  religion: string | null;
  religiosity: string | null;
  core_values: string[] | null;
  education: string | null;
  occupation: string | null;
  marriage_timeline: string | null;
  wants_children: string | null;
  communication_style: string | null;
  lifestyle: Record<string, string> | null;
  about_me: string | null;
  avatar_url: string | null;
};

type Prefs = {
  age_min: number | null;
  age_max: number | null;
  preferred_religions: string[] | null;
  preferred_locations: string[] | null;
  marriage_timeline: string | null;
  wants_children: string | null;
  must_haves: string[] | null;
};

const TIMELINE_LABELS: Record<string, string> = {
  "6_months": "Within 6 months",
  "1_year": "Within 1 year",
  "2_years": "Within 2 years",
  flexible: "Flexible",
};
const TIMELINE_ORDER = ["6_months", "1_year", "2_years", "flexible"] as const;
type Timeline = (typeof TIMELINE_ORDER)[number] | "any";

function ageFromDob(dob: string | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  const diff = Date.now() - d.getTime();
  return Math.floor(diff / (365.25 * 24 * 3600 * 1000));
}

function scoreCompatibility(me: Profile | null, mePrefs: Prefs | null, other: Profile): number {
  if (!me) return 70;
  let score = 40;
  // Timeline alignment
  if (me.marriage_timeline && other.marriage_timeline) {
    if (me.marriage_timeline === other.marriage_timeline) score += 18;
    else {
      const diff = Math.abs(
        TIMELINE_ORDER.indexOf(me.marriage_timeline as never) -
          TIMELINE_ORDER.indexOf(other.marriage_timeline as never),
      );
      if (diff === 1) score += 10;
      else if (diff === 2) score += 4;
    }
  }
  // Religion
  if (me.religion && other.religion && me.religion === other.religion) score += 10;
  if (me.religiosity && other.religiosity && me.religiosity === other.religiosity) score += 6;
  // Values overlap
  const myVals = new Set(me.core_values ?? []);
  const overlap = (other.core_values ?? []).filter((v) => myVals.has(v)).length;
  score += Math.min(overlap * 4, 16);
  // Children
  if (me.wants_children && other.wants_children && me.wants_children === other.wants_children) score += 6;
  // Location
  if (me.location_country && other.location_country && me.location_country === other.location_country) score += 4;
  // Prefs: age
  const age = ageFromDob(other.date_of_birth);
  if (age != null && mePrefs?.age_min && mePrefs?.age_max) {
    if (age >= mePrefs.age_min && age <= mePrefs.age_max) score += 6;
  }
  return Math.min(99, Math.max(55, score));
}

function explain(me: Profile | null, other: Profile): string {
  if (!me) return "A member our matchmakers curated for you based on shared intent and values.";
  const parts: string[] = [];
  if (me.religion && me.religion === other.religion) parts.push(`${me.religion} faith`);
  if (me.marriage_timeline === other.marriage_timeline && me.marriage_timeline)
    parts.push(`same marriage timeline (${TIMELINE_LABELS[me.marriage_timeline]?.toLowerCase()})`);
  const myVals = new Set(me.core_values ?? []);
  const overlap = (other.core_values ?? []).filter((v) => myVals.has(v));
  if (overlap.length) parts.push(`overlap in values (${overlap.slice(0, 3).join(", ").toLowerCase()})`);
  if (me.wants_children && me.wants_children === other.wants_children) parts.push("aligned on children");
  if (!parts.length) return "A thoughtful match based on communication style and lifestyle alignment.";
  return "You share " + parts.join(", ") + ".";
}

function MatchesPage() {
  const navigate = useNavigate();
  const [me, setMe] = useState<Profile | null>(null);
  const [mePrefs, setMePrefs] = useState<Prefs | null>(null);
  const [candidates, setCandidates] = useState<Profile[]>([]);
  const [interestsSent, setInterestsSent] = useState<Set<string>>(new Set());
  const [interestsReceived, setInterestsReceived] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [timelineFilter, setTimelineFilter] = useState<Timeline>("any");

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      const uid = userData.user.id;

      const [{ data: myProfile }, { data: myPrefsRow }, { data: sent }, { data: received }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
        supabase.from("partner_preferences").select("*").eq("user_id", uid).maybeSingle(),
        supabase.from("interests").select("to_user").eq("from_user", uid),
        supabase.from("interests").select("from_user").eq("to_user", uid),
      ]);

      setMe(myProfile as Profile | null);
      setMePrefs(myPrefsRow as Prefs | null);
      setInterestsSent(new Set((sent ?? []).map((r) => r.to_user as string)));
      setInterestsReceived(new Set((received ?? []).map((r) => r.from_user as string)));

      if (!myProfile?.onboarding_completed) {
        toast("Complete your profile to unlock curated matches.");
        navigate({ to: "/onboarding" });
        return;
      }

      const oppositeGender = myProfile.gender === "female" ? "male" : "female";
      const { data: others, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("onboarding_completed", true)
        .eq("gender", oppositeGender)
        .neq("id", uid)
        .limit(24);
      if (error) toast.error(error.message);
      setCandidates((others ?? []) as Profile[]);
      setLoading(false);
    })();
  }, [navigate]);

  const scored = useMemo(() => {
    let list = candidates.map((c) => ({
      profile: c,
      score: scoreCompatibility(me, mePrefs, c),
    }));
    if (timelineFilter !== "any") {
      list = list.filter((x) => x.profile.marriage_timeline === timelineFilter);
    }
    list.sort((a, b) => b.score - a.score);
    return list.slice(0, 6);
  }, [candidates, me, mePrefs, timelineFilter]);

  async function expressInterest(toUser: string) {
    if (!me) return;
    const { error } = await supabase.from("interests").insert({ from_user: me.id, to_user: toUser });
    if (error) {
      toast.error(error.message);
      return;
    }
    setInterestsSent((prev) => new Set(prev).add(toUser));
    if (interestsReceived.has(toUser)) {
      toast.success("It's mutual — we'll open a private introduction.", { duration: 5000 });
    } else {
      toast.success("Interest sent. They'll be notified privately.");
    }
  }

  async function withdrawInterest(toUser: string) {
    const { error } = await supabase.from("interests").delete().eq("from_user", me!.id).eq("to_user", toUser);
    if (error) {
      toast.error(error.message);
      return;
    }
    setInterestsSent((prev) => {
      const n = new Set(prev);
      n.delete(toUser);
      return n;
    });
    toast("Interest withdrawn.");
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-serif text-2xl text-primary tracking-tight">The Clove of Love</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/matches" className="text-foreground">Curation</Link>
            <Link to="/onboarding" className="text-muted-foreground hover:text-foreground">Profile</Link>
            <button
              onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70 mb-3">Today's curation</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              Six intentional introductions.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-lg">
              Reviewed by our matchmakers and ranked by SoulScore™ — an AI reading of values, faith, timeline and lifestyle.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mr-2">Marriage timeline</span>
          {(["any", ...TIMELINE_ORDER] as Timeline[]).map((t) => (
            <button
              key={t}
              onClick={() => setTimelineFilter(t)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                timelineFilter === t
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-foreground border-border/60 hover:border-primary/60"
              }`}
            >
              {t === "any" ? "All" : TIMELINE_LABELS[t]}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-muted-foreground">Curating your matches…</p>
        ) : scored.length === 0 ? (
          <Card className="p-10 text-center bg-card border-border/60">
            <p className="font-serif text-2xl mb-2">No matches in this timeline yet.</p>
            <p className="text-sm text-muted-foreground">Try widening your filter — new verified members join every week.</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scored.map(({ profile, score }) => {
              const age = ageFromDob(profile.date_of_birth);
              const sent = interestsSent.has(profile.id);
              const mutual = sent && interestsReceived.has(profile.id);
              const theyReachedFirst = !sent && interestsReceived.has(profile.id);
              return (
                <Card key={profile.id} className="overflow-hidden bg-card border-border/60 flex flex-col">
                  <div className="relative aspect-[4/5] bg-muted">
                    {profile.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile.full_name ?? "member"} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No photo</div>
                    )}
                    <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-2 rounded-full border border-primary/30">
                      <div className="text-[10px] uppercase tracking-widest text-primary/80 leading-none">SoulScore</div>
                      <div className="font-serif text-lg text-primary leading-none mt-0.5">{score}%</div>
                    </div>
                    {mutual && (
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                        It's mutual
                      </div>
                    )}
                    {theyReachedFirst && !mutual && (
                      <div className="absolute top-3 left-3 bg-accent/90 text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                        Interested in you
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-xl text-foreground">
                        {profile.full_name}{age ? `, ${age}` : ""}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {[profile.occupation, profile.location_city].filter(Boolean).join(" · ")}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {profile.religion && <Badge variant="secondary">{profile.religion}</Badge>}
                      {profile.marriage_timeline && (
                        <Badge variant="outline" className="border-primary/40 text-primary">
                          {TIMELINE_LABELS[profile.marriage_timeline]}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-foreground/80 mt-4 leading-relaxed line-clamp-3">
                      {profile.about_me}
                    </p>
                    <p className="text-xs text-muted-foreground italic mt-3 leading-relaxed">
                      {explain(me, profile)}
                    </p>
                    <div className="mt-5 pt-4 border-t border-border/40">
                      {mutual ? (
                        <Button className="w-full" variant="default">Open introduction</Button>
                      ) : sent ? (
                        <Button className="w-full" variant="outline" onClick={() => withdrawInterest(profile.id)}>
                          Interest sent — withdraw
                        </Button>
                      ) : (
                        <Button className="w-full" onClick={() => expressInterest(profile.id)}>
                          {theyReachedFirst ? "I'm interested — make it mutual" : "I'm interested"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
