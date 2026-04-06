"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/resume-store";
import { useRouter } from "next/navigation";
import CountUp from "@/components/ui/CountUp";
import { gsap } from "gsap";
import { useRef } from "react";

const GLOW_COLOR = "99, 102, 241";

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  enableTilt?: boolean;
  onClick?: () => void;
}> = ({ children, className = "", style, enableTilt = false, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spawnParticle = (x: number, y: number) => {
    if (!cardRef.current) return;
    const el = document.createElement("div");
    el.style.cssText = `position:absolute;width:3px;height:3px;border-radius:50%;background:rgba(${GLOW_COLOR},0.8);box-shadow:0 0 6px rgba(${GLOW_COLOR},0.4);pointer-events:none;z-index:10;left:${x}px;top:${y}px;`;
    cardRef.current.appendChild(el);
    gsap.to(el, { x: (Math.random() - 0.5) * 70, y: (Math.random() - 0.5) * 70, opacity: 0, scale: 0, duration: 1.2 + Math.random(), ease: "power2.out", onComplete: () => el.remove() });
  };
  return (
    <div ref={cardRef} onClick={onClick} className={`relative overflow-hidden ${className}`}
      style={{ "--glow-x": "50%", "--glow-y": "50%", "--glow-intensity": "0", cursor: onClick ? "pointer" : "default", ...style } as React.CSSProperties}
      onMouseEnter={() => { if (!cardRef.current) return; if (enableTilt) gsap.to(cardRef.current, { rotateX: 3, rotateY: 3, duration: 0.3, ease: "power2.out", transformPerspective: 1000 }); const { width, height } = cardRef.current.getBoundingClientRect(); for (let i = 0; i < 5; i++) setTimeout(() => spawnParticle(Math.random() * width, Math.random() * height), i * 80); }}
      onMouseLeave={() => { if (!cardRef.current) return; if (enableTilt) gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" }); cardRef.current.style.setProperty("--glow-intensity", "0"); }}
      onMouseMove={(e) => { if (!cardRef.current) return; const rect = cardRef.current.getBoundingClientRect(); const x = e.clientX - rect.left, y = e.clientY - rect.top; cardRef.current.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`); cardRef.current.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`); cardRef.current.style.setProperty("--glow-intensity", "1"); if (enableTilt) gsap.to(cardRef.current, { rotateX: ((y - rect.height / 2) / rect.height) * -6, rotateY: ((x - rect.width / 2) / rect.width) * 6, duration: 0.1, ease: "power2.out", transformPerspective: 1000 }); if (Math.random() > 0.9) spawnParticle(x, y); }}>
      {children}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", background: `radial-gradient(280px circle at var(--glow-x) var(--glow-y), rgba(${GLOW_COLOR}, calc(var(--glow-intensity) * 0.07)) 0%, transparent 60%)` }} />
      <div style={{ position: "absolute", inset: 0, padding: 1, background: `radial-gradient(280px circle at var(--glow-x,50%) var(--glow-y,50%), rgba(${GLOW_COLOR},calc(var(--glow-intensity,0)*0.5)) 0%, rgba(${GLOW_COLOR},calc(var(--glow-intensity,0)*0.15)) 40%, transparent 60%)`, borderRadius: "inherit", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", pointerEvents: "none", zIndex: 1 }} />
    </div>
  );
};

export default function History() {
  const router = useRouter();
  const { history, clearHistory, setLatestResult } = useResumeStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  const avg = history.length ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length) : 0;
  const best = history.length ? Math.max(...history.map(h => h.score)) : 0;
  const scoreColor = (s: number) => s >= 75 ? "#4ade80" : s >= 50 ? "#fbbf24" : "#f87171";

  const reloadResume = (entry: typeof history[0]) => {
    setLatestResult(entry.extractedText, entry.fileName, entry.analysis, entry.totalPages);
    router.push("/dashboard/upload");
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#0d0d14", padding: "40px 32px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.fade-up{animation:fadeUp 0.5s ease forwards;opacity:0;}.delay-1{animation-delay:0.05s}.delay-2{animation-delay:0.1s}.delay-3{animation-delay:0.15s}.delay-4{animation-delay:0.2s}`}</style>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(99,102,241,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>History</p>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "white", margin: 0 }}>My analyses</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>All your past resume scans, stored locally.</p>
        </div>
        {history.length > 0 && (
          <button onClick={clearHistory}
            style={{ fontSize: 12, color: "rgba(248,113,113,0.6)", border: "1px solid rgba(248,113,113,0.15)", background: "rgba(248,113,113,0.05)", padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
            Clear all
          </button>
        )}
      </div>

      <div style={{ maxWidth: "min(800px, 100%)", width: "100%" }}>
        
        {history.length > 0 && (
          <div className="fade-up delay-1 grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Total Analyses", value: history.length },
              { label: "Average Score", value: avg },
              { label: "Best Score", value: best },
            ].map(({ label, value }, i) => (
              <ParticleCard key={label} className="rounded-xl px-4 py-4 text-center" enableTilt
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</p>
                <p style={{ fontSize: 26, fontWeight: 800, color: i === 0 ? "white" : scoreColor(value), fontFamily: "'Syne', sans-serif" }}>
                  <CountUp to={value} duration={1.2} delay={0.1 * i} />
                </p>
              </ParticleCard>
            ))}
          </div>
        )}

        
        {history.length >= 2 && (
          <ParticleCard className="fade-up delay-2 rounded-2xl p-5 mb-6" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }} enableTilt={false}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Score Trend</p>
            <div className="flex items-end gap-2" style={{ height: 64 }}>
              {[...history].reverse().slice(-10).map((entry, i, arr) => {
                const c = scoreColor(entry.score);
                const h = (entry.score / 100) * 64;
                const isLast = i === arr.length - 1;
                return (
                  <div key={entry.id} className="flex flex-col items-center gap-1 flex-1" title={`${entry.fileName}: ${entry.score}`}>
                    <div className="w-full rounded-t-sm" style={{ height: h, background: isLast ? c : `${c}50`, boxShadow: isLast ? `0 0 8px ${c}60` : "none", transition: "height 0.8s ease", minHeight: 4 }} />
                    <span style={{ fontSize: 9, color: isLast ? c : "rgba(255,255,255,0.2)", fontWeight: 600 }}>{entry.score}</span>
                  </div>
                );
              })}
            </div>
          </ParticleCard>
        )}

        
        {history.length === 0 ? (
          <ParticleCard className="fade-up delay-1 rounded-2xl p-12 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }} enableTilt={false}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 3h9l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 3v5h5M7 11h6M7 14h4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>No analyses yet</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>Upload and analyze a resume to see your history here.</p>
            <button onClick={() => router.push("/dashboard/upload")}
              style={{ fontSize: 12, fontWeight: 600, color: "white", background: "linear-gradient(135deg,#6366f1,#4f46e5)", padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}>
              Analyze your first resume →
            </button>
          </ParticleCard>
        ) : (
          <div className="space-y-3">
            {history.map((entry, idx) => (
              <ParticleCard key={entry.id} className="fade-up rounded-2xl overflow-hidden"
                style={{ animationDelay: `${0.05 * idx}s`, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                enableTilt={false}>
                
                <button onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                  className="w-full flex items-center gap-4 px-5 py-4 transition-colors text-left"
                  style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }} className="truncate">{entry.fileName}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{entry.date} · {entry.totalPages} page{entry.totalPages !== 1 ? "s" : ""}</p>
                  </div>
                  <div style={{ textAlign: "center", background: "rgba(255,255,255,0.04)", border: `1px solid ${scoreColor(entry.score)}30`, borderRadius: 10, padding: "6px 14px", flexShrink: 0 }}>
                    <p style={{ fontSize: 20, fontWeight: 800, color: scoreColor(entry.score), fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{entry.score}</p>
                    <p style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>score</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{ transform: expanded === entry.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                    <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                
                {expanded === entry.id && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "16px 20px" }}>
                    <div className="px-3 py-2 rounded-lg mb-4" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)" }}>
                      <p style={{ fontSize: 12, color: "rgba(165,180,252,0.7)", fontStyle: "italic" }}>"{entry.analysis.verdict}"</p>
                    </div>
                    
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {Object.values(entry.analysis.sections).map((s: any, i: number) => (
                        <div key={i} className="text-center rounded-lg py-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                          <p style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{s.title.split(" ")[0]}</p>
                          <p style={{ fontSize: 16, fontWeight: 800, color: scoreColor(s.score), fontFamily: "'Syne', sans-serif" }}>{s.score}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(74,222,128,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Strengths</p>
                        {entry.analysis.topStrengths.slice(0, 2).map((s: string, i: number) => (
                          <div key={i} className="flex gap-1.5 items-start mb-1.5">
                            <span style={{ color: "#4ade80", fontSize: 10, marginTop: 1 }}>✓</span>
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{s}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(248,113,113,0.6)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>To Improve</p>
                        {entry.analysis.criticalImprovements.slice(0, 2).map((s: string, i: number) => (
                          <div key={i} className="flex gap-1.5 items-start mb-1.5">
                            <span style={{ color: "#f87171", fontSize: 10, marginTop: 1 }}>!</span>
                            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => reloadResume(entry)}
                        style={{ fontSize: 11, fontWeight: 600, color: "white", background: "linear-gradient(135deg,#6366f1,#4f46e5)", padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                        View full analysis
                      </button>
                      <button onClick={() => { reloadResume(entry); setTimeout(() => router.push("/dashboard/match"), 80); }}
                        style={{ fontSize: 11, fontWeight: 500, color: "rgba(99,102,241,0.8)", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
                        Match to job
                      </button>
                    </div>
                  </div>
                )}
              </ParticleCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}