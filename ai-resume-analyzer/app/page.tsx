"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";

const features = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1v11M6 4l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 13v2a1 1 0 001 1h12a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Instant AI Analysis",
    desc: "Upload your PDF and get a structured score with actionable feedback in seconds.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 9.5l2.5 2.5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Job Match Scoring",
    desc: "Paste any job description and instantly see how well your resume aligns with the role.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 14l4-4 3 3 4-5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="1" y="1" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Score Tracking",
    desc: "Every analysis is saved. Watch your resume score improve as you iterate.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 2h9l4 4v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2v5h5M5 10h8M5 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "ATS Compatibility",
    desc: "Find out if recruiters' software can actually parse your resume and what to fix.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Keyword Extraction",
    desc: "Automatically surfaces missing keywords from job descriptions you're targeting.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1l2 4 4.5.7-3.2 3.1.7 4.4L9 11.1 5 13.2l.7-4.4L2.5 5.7 7 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Section-by-Section Feedback",
    desc: "Impact, clarity, skills, experience, and ATS — each scored and explained individually.",
  },
];

const stats = [
  { value: "5s", label: "Average analysis time" },
  { value: "5", label: "Dimensions scored" },
  { value: "100%", label: "Private & secure" },
];

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      className="relative min-h-screen bg-[#0d0d14] overflow-hidden"
    >
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
                @keyframes spotlight {
                    0% { opacity: 0; transform: translate(-72%, -62%) rotate(10deg) scale(0.9); }
                    100% { opacity: 1; transform: translate(-50%, -40%) rotate(6deg) scale(1); }
                }
                .animate-spotlight { animation: spotlight 2.5s ease forwards; }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-up { animation: fadeUp 0.7s ease forwards; opacity: 0; }
                .delay-1 { animation-delay: 0.1s; }
                .delay-2 { animation-delay: 0.25s; }
                .delay-3 { animation-delay: 0.4s; }
                .delay-4 { animation-delay: 0.55s; }
                .delay-5 { animation-delay: 0.7s; }
                .feature-card:hover { border-color: rgba(165,180,252,0.2) !important; background: rgba(255,255,255,0.04) !important; }
            `}</style>

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#818cf8"
      />

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(165,180,252,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(165,180,252,0.03) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full z-0"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h7l3 3v7H2V2z" fill="white" opacity="0.95" />
              <path d="M9 2v3h3" stroke="white" strokeWidth="1" opacity="0.5" />
              <path d="M4 7h6M4 9.5h4" stroke="#4f46e5" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "white" }}>
            ResumeAI
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="text-[13px] font-medium text-white px-4 py-2 rounded-lg transition-all"
              style={{ background: "rgba(99,102,241,0.8)", border: "1px solid rgba(99,102,241,0.5)" }}
            >
              Go to Dashboard →
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button
                className="text-[13px] font-medium text-white px-4 py-2 rounded-lg transition-all"
                style={{ background: "rgba(99,102,241,0.8)", border: "1px solid rgba(99,102,241,0.5)" }}
              >
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="fade-up delay-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
          style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ boxShadow: "0 0 6px #818cf8" }} />
          <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-widest">
            AI-Powered Resume Analysis
          </span>
        </div>

        <h1
          className="fade-up delay-2"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "white",
            marginBottom: 24,
          }}
        >
          Your resume,
          <br />
          <span style={{
            background: "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #a5b4fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            scored & improved
          </span>
          <br />
          by AI.
        </h1>

        <p
          className="fade-up delay-3"
          style={{ fontSize: 17, color: "#94a3b8", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.7 }}
        >
          Upload your PDF resume and get an instant breakdown — ATS score, strengths, gaps,
          and job match analysis. Built for serious job seekers.
        </p>

        <div className="fade-up delay-4 flex items-center justify-center gap-3">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button
                className="group flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  boxShadow: "0 0 24px rgba(99,102,241,0.35)",
                }}
              >
                Analyze my resume — it's free
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </SignInButton>
          ) : (
            <Link
              href="/dashboard/upload"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                boxShadow: "0 0 24px rgba(99,102,241,0.35)",
              }}
            >
              Analyze a resume
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          )}
          <Link
            href="#features"
            className="px-6 py-3 rounded-xl text-[14px] font-medium transition-all duration-200"
            style={{ color: "#64748b", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
          >
            See how it works
          </Link>
        </div>

        <div className="fade-up delay-5 flex items-center justify-center gap-8 mt-14">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "white" }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-8 mb-24">
        <div
          className="rounded-2xl p-px"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(99,102,241,0.05) 50%, rgba(99,102,241,0.15))" }}
        >
          <div className="rounded-2xl overflow-hidden" style={{ background: "#13131f" }}>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 mx-4 h-5 rounded-md bg-white/[0.05] flex items-center px-3">
                <span style={{ fontSize: 10, color: "#475569" }}>resumeai.app/dashboard</span>
              </div>
            </div>
            <div className="p-5 flex gap-4">
              <div className="w-36 shrink-0 space-y-1.5">
                <div className="h-6 rounded-lg bg-white/[0.07] w-24 mb-4" />
                {["Dashboard", "Upload", "History", "Job Match"].map((item, i) => (
                  <div key={item} className={`h-7 rounded-lg flex items-center px-2 gap-2 ${i === 1 ? "bg-white/[0.12]" : ""}`}>
                    <div className="w-2 h-2 rounded-sm bg-white/20" />
                    <div className="h-2 rounded bg-white/10 flex-1" />
                  </div>
                ))}
              </div>
              <div className="flex-1 space-y-3">
                <div className="h-4 w-32 rounded bg-white/10" />
                <div className="grid grid-cols-3 gap-2">
                  {[78, 82, 65].map((score, i) => (
                    <div key={i} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="text-[18px] font-bold text-indigo-300" style={{ fontFamily: "'Syne', sans-serif" }}>{score}</div>
                      <div className="h-1.5 rounded-full mt-2" style={{ background: "rgba(255,255,255,0.07)" }}>
                        <div className="h-full rounded-full bg-indigo-500/60" style={{ width: `${score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-3 space-y-2" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {[85, 72, 90, 68, 77].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-16 rounded bg-white/10 shrink-0" />
                      <div className="h-1.5 rounded-full bg-indigo-500/40 flex-1" style={{ width: `${w}%`, maxWidth: `${w}%` }} />
                      <span style={{ fontSize: 9, color: "#6366f1", fontWeight: 700 }}>{w}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="relative z-10 max-w-5xl mx-auto px-8 pb-24">
        <div className="text-center mb-12">
          <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-widest mb-3">Features</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "white" }}>
            Everything you need to land the interview
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card rounded-xl p-5 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)", color: "#818cf8" }}
              >
                {f.icon}
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 6 }}>{f.title}</p>
              <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 pb-20">
        <div
          className="rounded-2xl p-px"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.4), rgba(99,102,241,0.1))" }}
        >
          <div
            className="rounded-2xl px-10 py-10 text-center"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(13,13,20,0.9))" }}
          >
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "white", marginBottom: 10 }}>
              Ready to improve your resume?
            </h3>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24 }}>
              Free to use. No credit card. Results in seconds.
            </p>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button
                  className="px-6 py-3 rounded-xl text-[14px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 24px rgba(99,102,241,0.3)" }}
                >
                  Get started for free →
                </button>
              </SignInButton>
            ) : (
              <Link
                href="/dashboard"
                className="inline-block px-6 py-3 rounded-xl text-[14px] font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 24px rgba(99,102,241,0.3)" }}
              >
                Go to Dashboard →
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/[0.05] py-6 text-center">
        <p style={{ fontSize: 12, color: "#334155" }}>
          © 2026 ResumeAI · Built with Next.js & OpenRouter
        </p>
      </div>
    </div>
  );
}
