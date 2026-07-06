import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Complete your profile — SoulMate" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OnboardingWizard,
});

const RELIGIONS = ["Christianity", "Islam", "Traditional", "Spiritual", "Other", "Prefer not to say"];
const RELIGIOSITY = [
  { v: "devout", l: "Devout — faith guides my daily life" },
  { v: "practicing", l: "Practicing — I attend regularly" },
  { v: "spiritual", l: "Spiritual, not strictly religious" },
  { v: "cultural", l: "Cultural connection only" },
];
const VALUES = ["Family first", "Faith", "Ambition", "Loyalty", "Kindness", "Adventure", "Tradition", "Personal growth", "Financial discipline", "Community"];
const TIMELINES = [
  { v: "6_months", l: "Within 6 months" },
  { v: "1_year", l: "Within 1 year" },
  { v: "2_years", l: "Within 2 years" },
  { v: "flexible", l: "Flexible — when it's right" },
];
const WANTS_CHILDREN = [
  { v: "yes", l: "Yes, I want children" },
  { v: "open", l: "Open to it" },
  { v: "no", l: "No" },
  { v: "have_already", l: "I already have children" },
];
const EDUCATION = ["High school", "Diploma", "Bachelor's", "Master's", "PhD / Professional"];
const COMMUNICATION = [
  { v: "direct", l: "Direct & straightforward" },
  { v: "thoughtful", l: "Thoughtful & measured" },
  { v: "warm", l: "Warm & expressive" },
  { v: "playful", l: "Playful & light" },
];

type ProfileState = {
  full_name: string;
  gender: string;
  date_of_birth: string;
  location_city: string;
  location_country: string;
  phone: string;
  religion: string;
  religiosity: string;
  core_values: string[];
  education: string;
  occupation: string;
  communication_style: string;
  lifestyle: { smokes?: string; drinks?: string; exercises?: string; diet?: string };
  marriage_timeline: string;
  wants_children: string;
  about_me: string;
};

type PrefState = {
  age_min: number;
  age_max: number;
  preferred_religions: string[];
  religiosity_importance: string;
  marriage_timeline: string;
  wants_children: string;
  education_min: string;
  must_haves: string[];
  deal_breakers: string[];
};

function OnboardingWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [emailVerified, setEmailVerified] = useState(true);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [profile, setProfile] = useState<ProfileState>({
    full_name: "", gender: "", date_of_birth: "", location_city: "", location_country: "Nigeria",
    phone: "", religion: "", religiosity: "", core_values: [], education: "", occupation: "",
    communication_style: "", lifestyle: {}, marriage_timeline: "", wants_children: "", about_me: "",
  });
  const [prefs, setPrefs] = useState<PrefState>({
    age_min: 25, age_max: 40, preferred_religions: [], religiosity_importance: "",
    marriage_timeline: "", wants_children: "", education_min: "", must_haves: [], deal_breakers: [],
  });

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      setUserId(userData.user.id);
      setEmailVerified(Boolean(userData.user.email_confirmed_at));

      const { data: p } = await supabase.from("profiles").select("*").eq("id", userData.user.id).maybeSingle();
      if (p) {
        setProfile((prev) => ({
          ...prev,
          full_name: p.full_name ?? "",
          gender: p.gender ?? "",
          date_of_birth: p.date_of_birth ?? "",
          location_city: p.location_city ?? "",
          location_country: p.location_country ?? "Nigeria",
          phone: p.phone ?? "",
          religion: p.religion ?? "",
          religiosity: p.religiosity ?? "",
          core_values: p.core_values ?? [],
          education: p.education ?? "",
          occupation: p.occupation ?? "",
          communication_style: p.communication_style ?? "",
          lifestyle: (p.lifestyle as ProfileState["lifestyle"]) ?? {},
          marriage_timeline: p.marriage_timeline ?? "",
          wants_children: p.wants_children ?? "",
          about_me: p.about_me ?? "",
        }));
        setPhoneVerified(p.phone_verified);
        if (p.onboarding_completed) {
          toast.success("Your profile is already complete.");
        }
      }
      const { data: pr } = await supabase.from("partner_preferences").select("*").eq("user_id", userData.user.id).maybeSingle();
      if (pr) {
        setPrefs((prev) => ({
          ...prev,
          age_min: pr.age_min ?? 25,
          age_max: pr.age_max ?? 40,
          preferred_religions: pr.preferred_religions ?? [],
          religiosity_importance: pr.religiosity_importance ?? "",
          marriage_timeline: pr.marriage_timeline ?? "",
          wants_children: pr.wants_children ?? "",
          education_min: pr.education_min ?? "",
          must_haves: pr.must_haves ?? [],
          deal_breakers: pr.deal_breakers ?? [],
        }));
      }
      setLoading(false);
    })();
  }, []);

  async function saveProfileFields(patch: Partial<ProfileState>) {
    const { error } = await supabase.from("profiles").update(patch).eq("id", userId);
    if (error) throw error;
  }

  async function savePrefFields(patch: Partial<PrefState>) {
    const { error } = await supabase.from("partner_preferences").update(patch).eq("user_id", userId);
    if (error) throw error;
  }

  async function sendPhoneOtp() {
    if (!profile.phone.match(/^\+\d{7,15}$/)) {
      toast.error("Enter phone in international format, e.g. +2348012345678");
      return;
    }
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ phone: profile.phone });
      if (error) throw error;
      setOtpSent(true);
      toast.success("Verification code sent to your phone.");
    } catch (err) {
      toast.error(
        (err instanceof Error ? err.message : "Failed to send code") +
        " — an SMS provider may need to be configured in Cloud settings."
      );
    } finally {
      setSaving(false);
    }
  }

  async function verifyPhoneOtp() {
    if (otp.length !== 6) return;
    setSaving(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: profile.phone,
        token: otp,
        type: "phone_change",
      });
      if (error) throw error;
      await saveProfileFields({ phone: profile.phone, phone_verified: true } as never);
      setPhoneVerified(true);
      toast.success("Phone verified.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid code");
    } finally {
      setSaving(false);
    }
  }

  const steps = [
    "Verify",
    "About you",
    "Values & faith",
    "Lifestyle",
    "Marriage intent",
    "Partner preferences",
    "Finish",
  ];

  async function nextStep() {
    setSaving(true);
    try {
      if (step === 1) {
        if (!profile.full_name || !profile.gender || !profile.date_of_birth) {
          toast.error("Please complete required fields.");
          return;
        }
        await saveProfileFields({
          full_name: profile.full_name,
          gender: profile.gender,
          date_of_birth: profile.date_of_birth,
          location_city: profile.location_city,
          location_country: profile.location_country,
          education: profile.education,
          occupation: profile.occupation,
        });
      } else if (step === 2) {
        await saveProfileFields({
          religion: profile.religion,
          religiosity: profile.religiosity,
          core_values: profile.core_values,
        });
      } else if (step === 3) {
        await saveProfileFields({
          lifestyle: profile.lifestyle,
          communication_style: profile.communication_style,
        });
      } else if (step === 4) {
        await saveProfileFields({
          marriage_timeline: profile.marriage_timeline,
          wants_children: profile.wants_children,
          about_me: profile.about_me,
        });
      } else if (step === 5) {
        await savePrefFields(prefs);
      } else if (step === 6) {
        await saveProfileFields({ onboarding_completed: true } as never);
        toast.success("Your SoulMate profile is complete.");
        navigate({ to: "/" });
        return;
      }
      setStep((s) => Math.min(s + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function toggleArr(arr: string[], v: string) {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading your profile…</div>;
  }

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <header className="border-b border-border/40">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-serif text-2xl text-primary tracking-tight">SoulMate</span>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/auth" }); }}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Step {step + 1} of {steps.length}</p>
          <h1 className="font-serif text-3xl md:text-4xl mt-2 text-foreground">{steps[step]}</h1>
          <Progress value={progress} className="mt-5 h-1" />
        </div>

        <Card className="p-8 bg-card border-border/60">
          {step === 0 && (
            <div className="space-y-8">
              <section>
                <h2 className="font-serif text-xl mb-2">Email verification</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {emailVerified
                    ? "Your email is verified. ✓"
                    : "We sent you a verification link. Click it, then refresh this page."}
                </p>
                {!emailVerified && (
                  <Button
                    variant="outline"
                    onClick={async () => {
                      const { data: u } = await supabase.auth.getUser();
                      if (u.user?.email) {
                        await supabase.auth.resend({ type: "signup", email: u.user.email });
                        toast.success("Verification email resent.");
                      }
                    }}
                  >
                    Resend verification email
                  </Button>
                )}
              </section>

              <div className="border-t border-border/40" />

              <section>
                <h2 className="font-serif text-xl mb-2">Phone verification</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  A verified phone builds trust and protects you from impostors.
                </p>
                {phoneVerified ? (
                  <p className="text-sm text-primary">Phone {profile.phone} verified. ✓</p>
                ) : otpSent ? (
                  <div className="space-y-4">
                    <Label>Enter the 6-digit code sent to {profile.phone}</Label>
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}
                      </InputOTPGroup>
                    </InputOTP>
                    <div className="flex gap-3">
                      <Button onClick={verifyPhoneOtp} disabled={saving || otp.length !== 6}>Verify code</Button>
                      <Button variant="ghost" onClick={() => { setOtpSent(false); setOtp(""); }}>Change number</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number (international format)</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="+2348012345678"
                      />
                    </div>
                    <Button onClick={sendPhoneOtp} disabled={saving || !profile.phone}>Send code</Button>
                  </div>
                )}
              </section>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <Field label="Full name *">
                <Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} />
              </Field>
              <Field label="Gender *">
                <RadioGroup value={profile.gender} onValueChange={(v) => setProfile({ ...profile, gender: v })} className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="female" /> Woman</label>
                  <label className="flex items-center gap-2 cursor-pointer"><RadioGroupItem value="male" /> Man</label>
                </RadioGroup>
              </Field>
              <Field label="Date of birth *">
                <Input type="date" value={profile.date_of_birth} onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City"><Input value={profile.location_city} onChange={(e) => setProfile({ ...profile, location_city: e.target.value })} placeholder="Lagos" /></Field>
                <Field label="Country"><Input value={profile.location_country} onChange={(e) => setProfile({ ...profile, location_country: e.target.value })} /></Field>
              </div>
              <Field label="Education">
                <ChipGroup options={EDUCATION} value={[profile.education]} onToggle={(v) => setProfile({ ...profile, education: v })} single />
              </Field>
              <Field label="Occupation">
                <Input value={profile.occupation} onChange={(e) => setProfile({ ...profile, occupation: e.target.value })} placeholder="e.g. Product Designer" />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Field label="Religion">
                <ChipGroup options={RELIGIONS} value={[profile.religion]} onToggle={(v) => setProfile({ ...profile, religion: v })} single />
              </Field>
              <Field label="How would you describe your faith?">
                <RadioGroup value={profile.religiosity} onValueChange={(v) => setProfile({ ...profile, religiosity: v })} className="space-y-2">
                  {RELIGIOSITY.map((r) => (
                    <label key={r.v} className="flex items-center gap-3 cursor-pointer p-3 rounded-md border border-border/40 hover:border-primary/40 transition">
                      <RadioGroupItem value={r.v} /> <span className="text-sm">{r.l}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>
              <Field label="Your core values (pick up to 5)">
                <ChipGroup options={VALUES} value={profile.core_values} onToggle={(v) => setProfile({ ...profile, core_values: toggleArr(profile.core_values, v).slice(0, 5) })} />
              </Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <Field label="Do you smoke?">
                <ChipGroup options={["Never", "Socially", "Regularly"]} value={[profile.lifestyle.smokes ?? ""]} onToggle={(v) => setProfile({ ...profile, lifestyle: { ...profile.lifestyle, smokes: v } })} single />
              </Field>
              <Field label="Do you drink alcohol?">
                <ChipGroup options={["Never", "Socially", "Regularly"]} value={[profile.lifestyle.drinks ?? ""]} onToggle={(v) => setProfile({ ...profile, lifestyle: { ...profile.lifestyle, drinks: v } })} single />
              </Field>
              <Field label="Exercise & wellness">
                <ChipGroup options={["Very active", "Active", "Sometimes", "Rarely"]} value={[profile.lifestyle.exercises ?? ""]} onToggle={(v) => setProfile({ ...profile, lifestyle: { ...profile.lifestyle, exercises: v } })} single />
              </Field>
              <Field label="Diet">
                <ChipGroup options={["Omnivore", "Halal", "Kosher", "Vegetarian", "Vegan"]} value={[profile.lifestyle.diet ?? ""]} onToggle={(v) => setProfile({ ...profile, lifestyle: { ...profile.lifestyle, diet: v } })} single />
              </Field>
              <Field label="Communication style">
                <RadioGroup value={profile.communication_style} onValueChange={(v) => setProfile({ ...profile, communication_style: v })} className="space-y-2">
                  {COMMUNICATION.map((c) => (
                    <label key={c.v} className="flex items-center gap-3 cursor-pointer p-3 rounded-md border border-border/40 hover:border-primary/40 transition">
                      <RadioGroupItem value={c.v} /> <span className="text-sm">{c.l}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <Field label="When do you hope to marry?">
                <RadioGroup value={profile.marriage_timeline} onValueChange={(v) => setProfile({ ...profile, marriage_timeline: v })} className="space-y-2">
                  {TIMELINES.map((t) => (
                    <label key={t.v} className="flex items-center gap-3 cursor-pointer p-3 rounded-md border border-border/40 hover:border-primary/40 transition">
                      <RadioGroupItem value={t.v} /> <span className="text-sm">{t.l}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>
              <Field label="Children">
                <ChipGroup options={WANTS_CHILDREN.map((c) => c.l)} value={[WANTS_CHILDREN.find((c) => c.v === profile.wants_children)?.l ?? ""]} onToggle={(l) => setProfile({ ...profile, wants_children: WANTS_CHILDREN.find((c) => c.l === l)?.v ?? "" })} single />
              </Field>
              <Field label="A short note about you">
                <Textarea rows={5} value={profile.about_me} onChange={(e) => setProfile({ ...profile, about_me: e.target.value })} placeholder="What matters most to you? What are you looking forward to in a partner?" />
              </Field>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Preferred age (min)">
                  <Input type="number" min={18} max={80} value={prefs.age_min} onChange={(e) => setPrefs({ ...prefs, age_min: parseInt(e.target.value) || 18 })} />
                </Field>
                <Field label="Preferred age (max)">
                  <Input type="number" min={18} max={80} value={prefs.age_max} onChange={(e) => setPrefs({ ...prefs, age_max: parseInt(e.target.value) || 80 })} />
                </Field>
              </div>
              <Field label="Preferred religion(s)">
                <ChipGroup options={RELIGIONS} value={prefs.preferred_religions} onToggle={(v) => setPrefs({ ...prefs, preferred_religions: toggleArr(prefs.preferred_religions, v) })} />
              </Field>
              <Field label="How important is shared faith?">
                <ChipGroup options={["Essential", "Very important", "Somewhat", "Not important"]} value={[prefs.religiosity_importance]} onToggle={(v) => setPrefs({ ...prefs, religiosity_importance: v })} single />
              </Field>
              <Field label="Their marriage timeline">
                <RadioGroup value={prefs.marriage_timeline} onValueChange={(v) => setPrefs({ ...prefs, marriage_timeline: v })} className="space-y-2">
                  {TIMELINES.map((t) => (
                    <label key={t.v} className="flex items-center gap-3 cursor-pointer p-3 rounded-md border border-border/40 hover:border-primary/40 transition">
                      <RadioGroupItem value={t.v} /> <span className="text-sm">{t.l}</span>
                    </label>
                  ))}
                </RadioGroup>
              </Field>
              <Field label="Minimum education">
                <ChipGroup options={EDUCATION} value={[prefs.education_min]} onToggle={(v) => setPrefs({ ...prefs, education_min: v })} single />
              </Field>
              <Field label="Must-haves">
                <ChipGroup
                  options={["Family-oriented", "Career-driven", "Devout in faith", "Wants children", "Financially stable", "Emotionally mature", "Loves travel", "Community-minded"]}
                  value={prefs.must_haves}
                  onToggle={(v) => setPrefs({ ...prefs, must_haves: toggleArr(prefs.must_haves, v) })}
                />
              </Field>
              <Field label="Deal-breakers">
                <ChipGroup
                  options={["Smoking", "Heavy drinking", "Different religion", "Long distance long-term", "Doesn't want children", "Previously married"]}
                  value={prefs.deal_breakers}
                  onToggle={(v) => setPrefs({ ...prefs, deal_breakers: toggleArr(prefs.deal_breakers, v) })}
                />
              </Field>
            </div>
          )}

          {step === 6 && (
            <div className="text-center py-8">
              <p className="text-xs uppercase tracking-[0.3em] text-primary/70 mb-4">All set</p>
              <h2 className="font-serif text-3xl mb-4">Welcome to SoulMate, {profile.full_name.split(" ")[0]}.</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our matchmakers and SoulScore™ engine will review your profile and begin your curation.
                You'll receive your first hand-picked introductions within 48 hours.
              </p>
            </div>
          )}

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-border/40">
            <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || saving}>
              Back
            </Button>
            <Button onClick={nextStep} disabled={saving} className="min-w-32">
              {saving ? "Saving…" : step === steps.length - 1 ? "Enter SoulMate" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}

function ChipGroup({
  options, value, onToggle, single,
}: { options: string[]; value: string[]; onToggle: (v: string) => void; single?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value.includes(o);
        return (
          <button
            type="button"
            key={o}
            onClick={() => onToggle(o)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              active
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-foreground border-border/60 hover:border-primary/60"
            }`}
          >
            {single && active ? "✓ " : ""}{o}
          </button>
        );
      })}
    </div>
  );
}

// silence unused import
void Checkbox;
