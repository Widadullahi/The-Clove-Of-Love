import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroCouple from "@/assets/hero-couple.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------- Small primitives ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-gold text-xs font-medium tracking-[0.25em] uppercase">
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.05] mt-5 text-balance">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 text-muted-foreground text-lg font-light leading-relaxed">
          {subtitle}
        </p>
      ) : null}
      <span
        className={`divider-gold mt-8 ${align === "center" ? "mx-auto" : ""}`}
        aria-hidden
      />
    </div>
  );
}

function GoldButton({
  children,
  as: As = "a",
  href = "#join",
  className = "",
}: {
  children: React.ReactNode;
  as?: "a" | "button";
  href?: string;
  className?: string;
}) {
  const cls =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gold text-emerald-deep font-semibold text-sm tracking-wide shadow-gold-glow transition-all duration-300 hover:bg-gold-soft hover:-translate-y-0.5 cursor-pointer " +
    className;
  return As === "a" ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <button className={cls}>{children}</button>
  );
}

function GhostButton({
  children,
  href = "#how",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={
        "inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-border text-ivory font-medium text-sm tracking-wide hover:bg-white/5 transition-all duration-300 " +
        className
      }
    >
      {children}
    </a>
  );
}

/* ---------- Sections ---------- */

function Nav() {
  const links = [
    { href: "#how", label: "How it works" },
    { href: "#soulscore", label: "SoulScore" },
    { href: "#trust", label: "Trust & Safety" },
    { href: "#stories", label: "Stories" },
    { href: "#pricing", label: "Pricing" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-emerald-deep/70 border-b border-border/60">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-16">
        <a href="#" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-gradient-gold grid place-items-center text-emerald-deep font-display italic font-bold">
            S
          </span>
          <span className="font-display text-xl text-ivory tracking-tight">
            SoulMate
          </span>
        </a>
        <ul className="hidden lg:flex items-center gap-9 text-sm text-ivory/80">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href="#signin"
            className="hidden sm:inline text-sm text-ivory/80 hover:text-gold transition-colors"
          >
            Sign in
          </a>
          <GoldButton href="#join" className="px-5 py-2.5 text-xs">
            Find My SoulMate
          </GoldButton>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 adinkra-pattern pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24 pb-24 lg:pb-32 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-6 animate-fade-up">
          <Eyebrow>Matrimony for the Discerning</Eyebrow>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.02] mt-6 text-balance">
            Meet the one you're{" "}
            <span className="italic text-gold">meant to marry.</span>
          </h1>
          <p className="mt-7 text-lg text-ivory/70 max-w-xl font-light leading-relaxed">
            SoulMate is a private, AI-powered matrimonial platform for verified,
            marriage-minded singles across Africa. No endless swiping. No games.
            Just intentional introductions to people who are ready for forever.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <GoldButton href="#join">Find My SoulMate →</GoldButton>
            <GhostButton href="#how">Our philosophy</GhostButton>
          </div>

          <div className="mt-14 flex items-center gap-5">
            <div className="flex -space-x-3">
              {[
                "linear-gradient(135deg,#d4b67a,#a97e3c)",
                "linear-gradient(135deg,#e0c9a3,#8a6a3f)",
                "linear-gradient(135deg,#c5a059,#6b4e22)",
                "linear-gradient(135deg,#f0dcb2,#b58a4a)",
              ].map((bg, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="w-10 h-10 rounded-full border-2 border-emerald-deep"
                  style={{ background: bg }}
                />
              ))}
            </div>
            <p className="text-sm text-ivory/60">
              <span className="text-ivory font-medium">12,400+ verified singles</span>{" "}
              in Lagos, Abuja, Nairobi & beyond
            </p>
          </div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-editorial">
            <img
              src={heroCouple}
              alt="A young Nigerian couple in refined traditional attire, standing together in warm side-light"
              width={1280}
              height={1600}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/30 to-transparent"
              aria-hidden
            />
            <div className="absolute top-0 right-0 p-8" aria-hidden>
              <div className="w-24 h-24 border-t-2 border-r-2 border-gold/40 rounded-tr-3xl" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-[10px] font-medium uppercase tracking-[0.2em]">
                SoulScore™ · 96%
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-ivory leading-tight">
                Adaeze & Tolu — introduced this month.
              </h3>
              <span className="divider-gold" aria-hidden />
              <p className="text-ivory/70 text-sm leading-relaxed">
                Shared faith, aligned marriage timeline, both eldest children of
                close-knit families. Their concierge letter is on page two.
              </p>
            </div>
          </div>

          {/* Floating trust badge */}
          <div className="hidden md:flex absolute -bottom-6 -left-6 items-center gap-3 bg-cream text-emerald-deep px-5 py-4 rounded-2xl shadow-editorial">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest text-emerald-deep/60">
                Verified today
              </div>
              <div className="font-display italic font-semibold text-lg leading-none mt-0.5">
                47 new members
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Create your profile",
      body:
        "Tell us your values, faith, family goals, and marriage timeline. Free to join, no card required.",
    },
    {
      n: "02",
      title: "Verify who you are",
      body:
        "Government ID, live selfie, phone and email. A one-time verification fee keeps the community serious.",
    },
    {
      n: "03",
      title: "Receive your SoulScore matches",
      body:
        "Each morning, our AI hand-picks a small, curated set of deeply compatible members — never a scroll of strangers.",
    },
    {
      n: "04",
      title: "Meet with intention",
      body:
        "Express interest, exchange messages, and, if you choose, invite a trusted family member to walk the journey with you.",
    },
  ];
  return (
    <section id="how" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Four quiet steps to <span className="italic text-gold">forever.</span>
            </>
          }
          subtitle="We do not optimise for screen time. We optimise for successful marriages."
        />
        <ol className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group relative p-8 rounded-3xl border border-border bg-card/40 hover:bg-card transition-colors duration-500"
            >
              <div className="font-display italic text-5xl text-gold/40 group-hover:text-gold/70 transition-colors">
                {s.n}
              </div>
              <h3 className="font-display text-2xl text-ivory mt-4 leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-ivory/60 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SoulScore() {
  const traits = [
    { label: "Faith & values", a: "Practising Christian", b: "Practising Christian" },
    { label: "Marriage timeline", a: "Within 12 months", b: "Within 12 months" },
    { label: "Family closeness", a: "Very close", b: "Very close" },
    { label: "Children", a: "2–3, God-willing", b: "2–3, God-willing" },
    { label: "Career vision", a: "Building in Lagos", b: "Building in Lagos" },
    { label: "Love language", a: "Acts of service", b: "Words of affirmation" },
  ];
  return (
    <section
      id="soulscore"
      className="relative py-24 lg:py-32 border-t border-border/60 overflow-hidden"
    >
      <div className="absolute inset-0 adinkra-pattern pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="SoulScore™ · AI Concierge"
            title={
              <>
                A compatibility score that{" "}
                <span className="italic text-gold">explains itself.</span>
              </>
            }
            subtitle="Anyone can show a percentage. Our AI Concierge writes you a plain-language letter — why this person, in this season of your life, on the way to the altar you both imagine."
          />
          <div className="mt-8 space-y-4">
            {[
              "Values, faith and family goals — weighted first, not last.",
              "Marriage timeline alignment so no one is wasting anyone's time.",
              "Communication style and love language, side by side.",
              "Long-term life vision, not just this weekend's plans.",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 text-ivory/80">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                <span className="text-sm leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample compatibility letter card */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-border bg-gradient-emerald p-8 md:p-10 shadow-editorial">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold">
                  SoulScore™
                </span>
                <span className="h-px w-10 bg-gold/40" aria-hidden />
              </div>
              <div className="font-display italic text-5xl text-gold leading-none">
                96<span className="text-2xl align-top">%</span>
              </div>
            </div>

            <h3 className="mt-6 font-display text-3xl md:text-4xl text-ivory leading-tight">
              Adaeze, meet Tolu.
            </h3>

            <p className="mt-5 text-ivory/70 leading-relaxed">
              You are both eldest children of close-knit families in Lagos, both
              hoping to marry within a year, and both quietly serious about
              faith without being loud about it. His way of loving is showing up;
              yours is speaking it. Those two, gently taught to each other,
              usually make a very good marriage.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-6">
              {traits.map((t) => (
                <div
                  key={t.label}
                  className="flex items-baseline justify-between gap-4 text-sm py-1.5 border-b border-border/50 last:border-0"
                >
                  <span className="text-ivory/50 uppercase tracking-wider text-[10px]">
                    {t.label}
                  </span>
                  <span className="text-ivory/90 text-right">
                    {t.a === t.b ? (
                      <span className="text-gold">{t.a}</span>
                    ) : (
                      <>
                        <span>{t.a}</span>
                        <span className="text-ivory/40"> · {t.b}</span>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-ivory/40 italic">
              — Written for you by the SoulMate AI Concierge
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CuratedMembers() {
  const members = [
    { name: "Chidinma, 29", city: "Lagos", faith: "Christian", timeline: "Within 12 months", score: 94 },
    { name: "Ibrahim, 32", city: "Abuja", faith: "Muslim", timeline: "Within 6 months", score: 91 },
    { name: "Amaka, 27", city: "Enugu", faith: "Christian", timeline: "Within 2 years", score: 89 },
    { name: "Kwame, 31", city: "Accra", faith: "Christian", timeline: "Within 12 months", score: 88 },
    { name: "Zainab, 28", city: "Kano", faith: "Muslim", timeline: "Within 12 months", score: 87 },
    { name: "Ade, 34", city: "Ibadan", faith: "Christian", timeline: "Flexible", score: 86 },
  ];
  return (
    <section className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <SectionHeading
            eyebrow="Today's curation"
            title={
              <>
                Six introductions.{" "}
                <span className="italic text-gold">Not six thousand.</span>
              </>
            }
            subtitle="Each morning we present a small, considered set of matches. Quality over quantity, always."
          />
          <div className="text-xs text-ivory/40 tracking-widest uppercase">
            Refreshed daily at sunrise
          </div>
        </div>

        <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m) => (
            <li
              key={m.name}
              className="group relative rounded-3xl overflow-hidden border border-border bg-card/40 hover:border-gold/50 transition-all duration-500"
            >
              <div
                className="aspect-[4/5] w-full relative"
                style={{
                  background:
                    "linear-gradient(160deg, oklch(0.35 0.05 155), oklch(0.20 0.03 155))",
                }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, rgba(197,160,89,0.35), transparent 55%), radial-gradient(circle at 70% 70%, rgba(197,160,89,0.15), transparent 60%)",
                  }}
                  aria-hidden
                />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-deep/80 border border-gold/30 text-[10px] text-gold uppercase tracking-widest">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"
                      fill="currentColor"
                    />
                  </svg>
                  Verified
                </div>
                <div className="absolute bottom-4 right-4 font-display italic text-2xl text-gold">
                  {m.score}%
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl text-ivory">{m.name}</h3>
                  <span className="text-xs text-ivory/50">{m.city}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-border text-ivory/70">
                    {m.faith}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold">
                    {m.timeline}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Trust() {
  const pillars = [
    {
      title: "Government ID",
      body: "Every member confirms their legal identity before their profile is ever shown.",
    },
    {
      title: "Live facial verification",
      body: "A live selfie is matched against ID to eliminate stolen photos and catfishing.",
    },
    {
      title: "AI fraud detection",
      body: "Our models continuously watch for scam patterns, duplicate accounts and dishonesty.",
    },
    {
      title: "Human moderation",
      body: "A real team reviews every report and every appeal. Trust is not automated away.",
    },
  ];
  return (
    <section id="trust" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Trust & Safety"
          title={
            <>
              A community your family would{" "}
              <span className="italic text-gold">be proud of.</span>
            </>
          }
          subtitle="SoulMate is the platform you can confidently introduce to your sister, your cousin, or your closest friend. That is the bar."
          align="center"
        />
        <ul className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="p-8 rounded-3xl border border-border bg-card/40 relative"
            >
              <div className="font-display italic text-3xl text-gold/40">
                0{i + 1}
              </div>
              <h3 className="font-display text-xl text-ivory mt-3">{p.title}</h3>
              <p className="mt-3 text-sm text-ivory/60 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Concierge() {
  return (
    <section className="relative py-24 lg:py-32 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 adinkra-pattern pointer-events-none" aria-hidden />
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <Eyebrow>The AI Concierge</Eyebrow>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.05] mt-6 text-balance">
          "Based on your shared values, communication styles, faith, and the
          twelve-month horizon you both set —{" "}
          <span className="italic text-gold">
            this is one worth writing to.
          </span>
          "
        </h2>
        <p className="mt-8 text-ivory/60 text-lg font-light">
          Every introduction comes with a letter, not just a number. Explainable
          matching, in the language you would use with a wise friend.
        </p>
        <div className="mt-10 flex justify-center">
          <GoldButton href="#join">Meet your Concierge</GoldButton>
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const stories = [
    {
      img: story1,
      names: "Bola & Emeka",
      city: "Lagos · married April 2026",
      quote:
        "We matched on a Tuesday, met our families in six weeks, and were engaged before Christmas. The Concierge letter is framed in our sitting room.",
    },
    {
      img: story2,
      names: "Halima & Yusuf",
      city: "Abuja · engaged 2026",
      quote:
        "I had almost given up. SoulMate did not send me a hundred profiles. It sent me the right three. Yusuf was the second.",
    },
    {
      img: story3,
      names: "Ada & Kelechi",
      city: "Enugu · married September 2025",
      quote:
        "We are both eldest children. My mother's blessing came the same evening he called her. Everything moved gently, and correctly, from there.",
    },
  ];
  return (
    <section id="stories" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Real stories"
          title={
            <>
              Marriages, not{" "}
              <span className="italic text-gold">match counts.</span>
            </>
          }
          subtitle="These are members who met on SoulMate and are now building a home."
        />
        <ul className="mt-16 grid md:grid-cols-3 gap-6">
          {stories.map((s) => (
            <li
              key={s.names}
              className="rounded-3xl overflow-hidden border border-border bg-card/40 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.img}
                  alt={`${s.names} wedding portrait`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <p className="font-display italic text-lg text-ivory/90 leading-relaxed">
                  "{s.quote}"
                </p>
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="font-display text-lg text-gold">{s.names}</div>
                  <div className="text-xs text-ivory/50 tracking-wider uppercase mt-1">
                    {s.city}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Membership"
          title={
            <>
              Free to join.{" "}
              <span className="italic text-gold">One-time verification.</span>
            </>
          }
          subtitle="A single, transparent fee — never a subscription. It funds the verification, the moderation, and the small daily curation. Nothing more."
          align="center"
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {[
            {
              tag: "For her",
              price: "₦5,000",
              note: "One-time · lifetime access",
            },
            {
              tag: "For him",
              price: "₦10,000",
              note: "One-time · lifetime access",
            },
          ].map((p) => (
            <div
              key={p.tag}
              className="relative p-10 rounded-3xl border border-border bg-gradient-emerald shadow-editorial"
            >
              <Eyebrow>{p.tag}</Eyebrow>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-6xl text-ivory">{p.price}</span>
                <span className="text-ivory/50 text-sm">{p.note}</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-ivory/75">
                {[
                  "Government ID, phone & email verification",
                  "Daily SoulScore™ curated matches",
                  "Full AI Concierge compatibility letters",
                  "Messaging, voice notes, voice & video calls",
                  "Family Mode: invite a trusted mentor",
                  "Priority human support",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-gold shrink-0"
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <GoldButton href="#join" className="w-full">
                  Begin verification →
                </GoldButton>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ivory/50">
          <span className="uppercase tracking-widest">Secure payments via</span>
          <span className="font-display italic text-gold text-lg">Paystack</span>
          <span aria-hidden>·</span>
          <span className="font-display italic text-gold text-lg">Flutterwave</span>
          <span aria-hidden>·</span>
          <span className="font-display italic text-gold text-lg">Stripe</span>
          <span className="w-full text-center mt-2">
            International members are billed the equivalent in their local currency.
          </span>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-border">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left py-6 gap-6 group"
        aria-expanded={open}
      >
        <span className="font-display text-xl md:text-2xl text-ivory group-hover:text-gold transition-colors">
          {q}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-gold/40 grid place-items-center text-gold transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-ivory/60 leading-relaxed max-w-3xl">{a}</p>
        </div>
      </div>
    </li>
  );
}

function FAQ() {
  const items = [
    {
      q: "Is SoulMate a dating app?",
      a: "No. SoulMate is a matrimonial platform for people who are intentionally seeking a lifelong marriage partner. Every product decision — from verification to daily curation — reinforces that.",
    },
    {
      q: "Why is there a verification fee?",
      a: "The one-time fee funds identity verification, human moderation, and the small daily curation. It also, respectfully, keeps unserious accounts out. It is not a subscription and there is never a renewal.",
    },
    {
      q: "What is a SoulScore™?",
      a: "It is an AI-generated compatibility measure based on your values, faith, marriage timeline, family goals, communication style, love language, and long-term vision — not just age and location. Each score comes with a plain-language letter from the AI Concierge.",
    },
    {
      q: "Can my family be involved?",
      a: "Optionally, yes. Our Family Mode lets you invite a trusted parent, sibling or mentor to view your progress and, if you choose, help review matches. Nothing is shared without your explicit permission.",
    },
    {
      q: "Is my data safe?",
      a: "Your profile is private by default, and photos are watermarked. Verification data is encrypted at rest and never shared. You can delete your account, and all associated data, at any time.",
    },
    {
      q: "Which countries do you serve?",
      a: "Our first market is Nigeria, with active members across Ghana, Kenya, South Africa and the diaspora. International expansion is ongoing.",
    },
  ];
  return (
    <section className="relative py-24 lg:py-32 border-t border-border/60">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <SectionHeading
          eyebrow="Frequently asked"
          title={
            <>
              The questions your mother{" "}
              <span className="italic text-gold">would also ask.</span>
            </>
          }
        />
        <ul className="mt-12">
          {items.map((it) => (
            <FAQItem key={it.q} q={it.q} a={it.a} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="join" className="relative py-24 lg:py-32 border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 adinkra-pattern pointer-events-none" aria-hidden />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <Eyebrow>Where Forever Begins</Eyebrow>
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-ivory leading-[1.02] mt-6 text-balance">
          Your future is looking{" "}
          <span className="italic text-gold">for you.</span>
        </h2>
        <p className="mt-6 text-ivory/70 text-lg font-light max-w-2xl mx-auto">
          Join a trusted community of verified, marriage-minded singles. Create
          your profile in minutes. It is free to begin.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <GoldButton href="#join">Find My SoulMate →</GoldButton>
          <GhostButton href="#how">Create a free account</GhostButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-emerald-deeper">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <a href="#" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-gradient-gold grid place-items-center text-emerald-deep font-display italic font-bold">
              S
            </span>
            <span className="font-display text-xl text-ivory">SoulMate</span>
          </a>
          <p className="mt-5 text-sm text-ivory/50 max-w-sm leading-relaxed">
            Africa's premium AI-powered matrimonial platform. Built for people
            who are intentionally seeking a lifelong partner.
          </p>
          <p className="mt-6 font-display italic text-gold/80">
            Where Forever Begins.
          </p>
        </div>
        {[
          {
            h: "Platform",
            l: ["How it works", "SoulScore™", "Trust & Safety", "Pricing", "Stories"],
          },
          {
            h: "Company",
            l: ["About", "Careers", "Press", "Contact", "Privacy", "Terms"],
          },
        ].map((col) => (
          <div key={col.h}>
            <div className="text-xs uppercase tracking-widest text-gold">
              {col.h}
            </div>
            <ul className="mt-5 space-y-3 text-sm text-ivory/60">
              {col.l.map((li) => (
                <li key={li}>
                  <a href="#" className="hover:text-gold transition-colors">
                    {li}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-ivory/40">
          <span>© {new Date().getFullYear()} SoulMate. Made with intention in Lagos.</span>
          <span>Serious hearts. Lasting marriages.</span>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <main className="min-h-screen bg-emerald-deep text-ivory">
      <Nav />
      <Hero />
      <HowItWorks />
      <SoulScore />
      <CuratedMembers />
      <Trust />
      <Concierge />
      <Stories />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
