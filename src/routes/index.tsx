import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroCouple from "@/assets/hero-couple.jpg";
import logoMark from "@/assets/logo-mark.png";
import botanical from "@/assets/botanical-cream.jpg";

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
  tone = "dark",
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
}) {
  const titleColor = tone === "light" ? "text-emerald-deep" : "text-ivory";
  const subColor = tone === "light" ? "text-emerald-deep/65" : "text-muted-foreground";
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl ${titleColor} leading-[1.05] mt-5 text-balance`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-5 ${subColor} text-lg font-light leading-relaxed`}>
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-emerald-deep/75 border-b border-border/60">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">
        <a href="#" className="flex items-center gap-3 group">
          <img
            src={logoMark}
            alt="The Clove of Love"
            width={40}
            height={40}
            className="w-10 h-10 object-contain drop-shadow-[0_2px_8px_rgba(197,160,89,0.35)]"
          />

          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.35rem] text-ivory tracking-tight">
              The Clove of Love
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-ivory/40 mt-1">
              Est. Lagos · MMXXVI
            </span>
          </span>
        </a>
        <ul className="hidden lg:flex items-center gap-10 text-[13px] text-ivory/75">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-gold transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <a
            href="/auth"
            className="hidden sm:inline text-sm text-ivory/80 hover:text-gold transition-colors"
          >
            Sign in
          </a>
          <GoldButton href="/auth" className="px-5 py-2.5 text-xs">
            Begin the Rite
          </GoldButton>
        </div>
      </nav>
    </header>
  );
}


function Hero() {
  return (
    <section className="relative overflow-hidden vellum">
      {/* Botanical background flourish */}
      <img
        src={botanical}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-[0.35] mix-blend-multiply"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 85% 15%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 60%), radial-gradient(900px 500px at 10% 90%, color-mix(in oklab, var(--emerald-deep) 8%, transparent), transparent 65%)",
        }}
        aria-hidden
      />

      {/* Editorial chapter mark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-emerald-deep/45">
        <span className="h-px w-16 bg-emerald-deep/20" />
        <span>Volume I · The Prologue</span>
        <span className="h-px w-16 bg-emerald-deep/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-36 pb-24 lg:pb-36 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-6 animate-fade-up">
          <div className="flex items-center gap-3">
            <span className="chapter-mark text-sm">№ 01</span>
            <span className="h-px w-10 bg-gold/60" />
            <Eyebrow>Matrimony for the Discerning</Eyebrow>
          </div>
          <h1 className="font-display text-[3.25rem] md:text-7xl lg:text-[5.5rem] text-emerald-deep leading-[0.98] mt-8 text-balance tracking-tight">
            Meet the one <br className="hidden md:block" />
            you're{" "}
            <span className="italic text-gold-warm relative">
              meant
              <span className="absolute -bottom-1 left-0 right-2 h-px bg-gold-warm/60" aria-hidden />
            </span>{" "}
            <span className="italic text-gold-warm">to marry.</span>
          </h1>
          <p className="mt-8 text-lg text-emerald-deep/70 max-w-xl font-light leading-[1.7]">
            The Clove of Love is a private, AI-powered matrimonial house for verified,
            marriage-minded singles across Africa. No endless swiping. No games.
            Just intentional introductions to people ready for forever.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <GoldButton href="/auth">Begin the Rite →</GoldButton>
            <a
              href="#how"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-emerald-deep/25 text-emerald-deep font-medium text-sm tracking-wide hover:bg-emerald-deep hover:text-ivory transition-all duration-300"
            >
              Our philosophy
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg">
            {[
              { n: "12,400+", l: "Verified members" },
              { n: "1,120", l: "Marriages, and counting" },
              { n: "96%", l: "Median SoulScore™" },
            ].map((s) => (
              <div key={s.l} className="border-l border-gold/50 pl-4">
                <div className="font-display text-2xl md:text-3xl text-emerald-deep">{s.n}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-deep/55 mt-1 leading-snug">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-6 relative">
          {/* Ornament frame */}
          <div className="absolute -inset-4 lg:-inset-6 border border-gold/30 rounded-[2rem] pointer-events-none" aria-hidden />
          <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-gold/70 rounded-tl-3xl" aria-hidden />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold/70 rounded-br-3xl" aria-hidden />

          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-emerald-deep/10 shadow-editorial">
            <img
              src={heroCouple}
              alt="A young Nigerian couple in refined traditional attire, standing together in warm side-light"
              width={1280}
              height={1600}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/40 to-transparent"
              aria-hidden
            />
            <span className="grain-overlay" aria-hidden />

            {/* Top-right metadata */}
            <div className="absolute top-6 right-6 text-right">
              <div className="text-[9px] uppercase tracking-[0.35em] text-ivory/60">
                Plate I
              </div>
              <div className="font-display italic text-ivory/80 text-sm mt-1">
                Adaeze & Tolu
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-medium uppercase tracking-[0.2em]">
                  SoulScore™ · 96%
                </span>
                <span className="hairline flex-1" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-ivory leading-tight">
                Introduced this month, engaged by the next.
              </h3>
              <p className="text-ivory/70 text-sm leading-relaxed font-light italic">
                "Shared faith, aligned marriage timeline, both eldest of close-knit
                families. Their concierge letter is on page two."
              </p>
            </div>
          </div>

          {/* Floating trust badge */}
          <div className="hidden md:flex absolute -bottom-8 -left-8 items-center gap-3 bg-emerald-deep text-ivory px-6 py-4 rounded-2xl shadow-editorial border border-gold/25">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-70 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">
                Verified today
              </div>
              <div className="font-display italic font-semibold text-lg leading-none mt-0.5 text-gold">
                47 new members
              </div>
            </div>
          </div>

          {/* Concierge quill card */}
          <div className="hidden lg:flex absolute -top-6 -right-6 items-center gap-3 bg-white/90 backdrop-blur border border-gold/40 px-5 py-3 rounded-full shadow-[var(--shadow-vellum-card)]">
            <span className="font-display italic text-gold-warm">✒</span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-emerald-deep/75">
              A letter, not a swipe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PressBar() {
  const outlets = ["BellaNaija", "TechCabal", "Guardian Life", "Ventures Africa", "Pulse", "The Cable", "Ynaija"];
  return (
    <section aria-label="Featured in" className="border-y border-border/60 bg-emerald-deeper/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex items-center gap-10">
        <div className="hidden md:flex flex-col shrink-0 border-r border-border pr-8">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold">As featured in</span>
          <span className="font-display italic text-ivory/60 text-sm mt-1">the African press</span>
        </div>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-14 animate-marquee whitespace-nowrap w-max">
            {[...outlets, ...outlets, ...outlets].map((o, i) => (
              <span
                key={i}
                className="font-display italic text-2xl text-ivory/50 hover:text-gold transition-colors"
              >
                {o}
              </span>
            ))}
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
    <section id="how" className="relative py-24 lg:py-32 vellum">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <SectionHeading
          eyebrow="How it works"
          tone="light"
          title={
            <>
              Four quiet steps to <span className="italic text-gold-warm">forever.</span>
            </>
          }
          subtitle="We do not optimise for screen time. We optimise for successful marriages."
        />
        <ol className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group relative p-8 rounded-3xl border border-emerald-deep/10 bg-white/80 backdrop-blur-sm shadow-[var(--shadow-vellum-card)] hover:bg-white hover:border-gold/40 hover:shadow-[var(--shadow-vellum-card-hover)] transition-all duration-500"
            >
              <div className="font-display italic text-5xl text-gold group-hover:text-gold-warm transition-colors">
                {s.n}
              </div>
              <h3 className="font-display text-2xl text-emerald-deep mt-4 leading-snug">
                {s.title}
              </h3>
              <p className="mt-3 text-sm text-emerald-deep/70 leading-relaxed">{s.body}</p>
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

        {/* Sample compatibility letter — displayed in a phone mockup */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative mx-auto w-full max-w-[380px]">
            {/* Soft glow behind device */}
            <div
              className="absolute -inset-10 rounded-[3rem] opacity-70 blur-3xl pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, color-mix(in oklab, var(--gold) 35%, transparent), transparent 65%)",
              }}
              aria-hidden
            />

            {/* Phone frame */}
            <div className="relative rounded-[3rem] bg-neutral-950 p-3 shadow-editorial border border-white/10 ring-1 ring-black/40">
              {/* Side buttons */}
              <span className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-neutral-800" aria-hidden />
              <span className="absolute -left-[3px] top-40 h-16 w-[3px] rounded-l bg-neutral-800" aria-hidden />
              <span className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r bg-neutral-800" aria-hidden />

              {/* Screen */}
              <div className="relative rounded-[2.4rem] overflow-hidden bg-gradient-emerald">
                {/* Status bar */}
                <div className="relative flex items-center justify-between px-7 pt-3 pb-2 text-[10px] text-ivory/80 font-medium">
                  <span>9:41</span>
                  {/* Notch */}
                  <span className="absolute left-1/2 -translate-x-1/2 top-1.5 h-5 w-24 rounded-full bg-black" aria-hidden />
                  <span className="flex items-center gap-1">
                    <svg width="12" height="10" viewBox="0 0 12 10" aria-hidden>
                      <rect x="0" y="6" width="2" height="4" rx="0.5" fill="currentColor" />
                      <rect x="3" y="4" width="2" height="6" rx="0.5" fill="currentColor" />
                      <rect x="6" y="2" width="2" height="8" rx="0.5" fill="currentColor" />
                      <rect x="9" y="0" width="2" height="10" rx="0.5" fill="currentColor" />
                    </svg>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
                      <path d="M7 1a9 9 0 0 1 6 2.3M7 4a5.5 5.5 0 0 1 3.7 1.4M7 7a2 2 0 0 1 1.4.6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    <svg width="18" height="9" viewBox="0 0 18 9" aria-hidden>
                      <rect x="0.5" y="0.5" width="14" height="8" rx="2" fill="none" stroke="currentColor" />
                      <rect x="2" y="2" width="11" height="5" rx="1" fill="currentColor" />
                      <rect x="15" y="3" width="2" height="3" rx="0.5" fill="currentColor" />
                    </svg>
                  </span>
                </div>

                {/* App header */}
                <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <img src={logoMark} alt="" className="w-6 h-6 object-contain" />
                    <span className="font-display italic text-ivory text-sm">
                      Concierge
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-ivory/45">
                    Today
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 pt-6 pb-8 max-h-[560px] overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gold">
                        SoulScore™
                      </span>
                      <span className="h-px w-8 bg-gold/40" aria-hidden />
                    </div>
                    <div className="font-display italic text-4xl text-gold leading-none">
                      96<span className="text-lg align-top">%</span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-2xl text-ivory leading-tight">
                    Adaeze, meet Tolu.
                  </h3>

                  <p className="mt-4 text-ivory/70 text-[13px] leading-relaxed">
                    You are both eldest children of close-knit families in Lagos,
                    both hoping to marry within a year, and both quietly serious
                    about faith without being loud about it. His way of loving is
                    showing up; yours is speaking it.
                  </p>

                  <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                    {traits.slice(0, 5).map((t) => (
                      <div
                        key={t.label}
                        className="flex items-baseline justify-between gap-4 text-[11px]"
                      >
                        <span className="text-ivory/45 uppercase tracking-wider text-[9px]">
                          {t.label}
                        </span>
                        <span className="text-ivory/90 text-right truncate">
                          {t.a === t.b ? (
                            <span className="text-gold">{t.a}</span>
                          ) : (
                            <span>{t.a}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-5 text-[10px] text-ivory/40 italic">
                    — Written by the AI Concierge
                  </p>

                  <button className="mt-6 w-full rounded-full bg-gold text-emerald-deep font-semibold text-xs py-3 tracking-wide">
                    I'm Interested
                  </button>
                </div>

                {/* Home indicator */}
                <div className="flex justify-center pb-2">
                  <span className="h-1 w-24 rounded-full bg-ivory/40" aria-hidden />
                </div>
              </div>
            </div>

            {/* Floating notification bubble */}
            <div className="hidden md:flex absolute -left-10 top-16 items-center gap-2 bg-cream text-emerald-deep px-4 py-2 rounded-2xl shadow-editorial rotate-[-6deg]">
              <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-deep/60">
                New match
              </span>
              <span className="font-display italic text-sm">96%</span>
            </div>
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
    <section id="trust" className="relative py-24 lg:py-32 vellum overflow-hidden">
      <img
        src={botanical}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -right-32 -top-24 w-[720px] opacity-40 mix-blend-multiply rotate-12"
      />
      <img
        src={botanical}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -left-40 bottom-0 w-[640px] opacity-25 mix-blend-multiply -rotate-6"
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <SectionHeading
          eyebrow="Trust & Safety"
          tone="light"
          title={
            <>
              A community your family would{" "}
              <span className="italic text-gold-warm">be proud of.</span>
            </>
          }
          subtitle="The Clove of Love is the platform you can confidently introduce to your sister, your cousin, or your closest friend. That is the bar."
          align="center"
        />
        <ul className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <li
              key={p.title}
              className="vellum-card hover:vellum-card-hover"
            >
              <div className="font-display italic text-3xl text-gold-warm/70">
                0{i + 1}
              </div>
              <h3 className="font-display text-xl text-emerald-deep mt-3">{p.title}</h3>
              <p className="mt-3 text-sm text-emerald-deep/65 leading-relaxed">{p.body}</p>
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
      <img
        src={botanical}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute inset-x-0 top-0 mx-auto w-[900px] max-w-full opacity-[0.12] mix-blend-screen"
      />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
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
          <GoldButton href="/auth">Meet your Concierge</GoldButton>
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
        "I had almost given up. The Clove of Love did not send me a hundred profiles. It sent me the right three. Yusuf was the second.",
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
    <section id="stories" className="relative py-24 lg:py-32 vellum">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <SectionHeading
          eyebrow="Real stories"
          tone="light"
          title={
            <>
              Marriages, not{" "}
              <span className="italic text-gold-warm">match counts.</span>
            </>
          }
          subtitle="These are members who met on The Clove of Love and are now building a home."
        />
        <ul className="mt-16 grid md:grid-cols-3 gap-6">
          {stories.map((s) => (
            <li
              key={s.names}
              className="rounded-3xl overflow-hidden border border-emerald-deep/10 bg-white flex flex-col shadow-[var(--shadow-vellum-card)] hover:shadow-[var(--shadow-vellum-card-hover)] transition-shadow duration-500"
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
                <p className="font-display italic text-lg text-emerald-deep/90 leading-relaxed">
                  "{s.quote}"
                </p>
                <div className="mt-6 pt-5 border-t border-emerald-deep/10">
                  <div className="font-display text-lg text-gold-warm">{s.names}</div>
                  <div className="text-xs text-emerald-deep/50 tracking-wider uppercase mt-1">
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
    <section id="pricing" className="relative py-24 lg:py-32 vellum">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 relative">
        <SectionHeading
          eyebrow="Membership"
          tone="light"
          title={
            <>
              Free to join.{" "}
              <span className="italic text-gold-warm">One-time verification.</span>
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
              className="relative p-10 rounded-3xl border border-emerald-deep/10 bg-white shadow-[0_30px_70px_-35px_rgba(13,27,21,0.45)]"
            >
              <Eyebrow>{p.tag}</Eyebrow>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-6xl text-emerald-deep">{p.price}</span>
                <span className="text-emerald-deep/55 text-sm">{p.note}</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-emerald-deep/75">
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
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-gold-warm shrink-0"
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <GoldButton href="/auth" className="w-full">
                  Begin verification →
                </GoldButton>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-emerald-deep/55">
          <span className="uppercase tracking-widest">Secure payments via</span>
          <span className="font-display italic text-gold-warm text-lg">Paystack</span>
          <span aria-hidden>·</span>
          <span className="font-display italic text-gold-warm text-lg">Flutterwave</span>
          <span aria-hidden>·</span>
          <span className="font-display italic text-gold-warm text-lg">Stripe</span>
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
    <li className="border-b border-emerald-deep/15">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left py-6 gap-6 group"
        aria-expanded={open}
      >
        <span className="font-display text-xl md:text-2xl text-emerald-deep group-hover:text-gold-warm transition-colors">
          {q}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-gold/50 grid place-items-center text-gold-warm transition-transform duration-300 ${
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
          <p className="text-emerald-deep/70 leading-relaxed max-w-3xl">{a}</p>
        </div>
      </div>
    </li>
  );
}


function FAQ() {
  const items = [
    {
      q: "Is The Clove of Love a dating app?",
      a: "No. The Clove of Love is a matrimonial platform for people who are intentionally seeking a lifelong marriage partner. Every product decision — from verification to daily curation — reinforces that.",
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
    <section className="relative py-24 lg:py-32 vellum">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative">
        <SectionHeading
          eyebrow="Frequently asked"
          tone="light"
          title={
            <>
              The questions your mother{" "}
              <span className="italic text-gold-warm">would also ask.</span>
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
          <GoldButton href="/auth">Begin the Rite →</GoldButton>
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
          <a href="#" className="flex items-center gap-3">
            <img src={logoMark} alt="The Clove of Love" width={40} height={40} className="w-10 h-10 object-contain" loading="lazy" />

            <span className="font-display text-xl text-ivory">The Clove of Love</span>
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
          <span>© {new Date().getFullYear()} The Clove of Love. Made with intention in Lagos.</span>
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
      <PressBar />
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
