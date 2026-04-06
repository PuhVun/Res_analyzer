"use client";

import { useState, useRef } from "react";
import { useResumeStore } from "@/lib/resume-store";
import CountUp from "@/components/ui/CountUp";
import { gsap } from "gsap";

const GLOW = "99, 102, 241";

function ParticleCard({ children, className = "", style, enableTilt = true }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; enableTilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const spawn = (x: number, y: number) => {
    if (!ref.current) return;
    const el = document.createElement("div");
    el.style.cssText = `position:absolute;width:3px;height:3px;border-radius:50%;background:rgba(${GLOW},0.8);box-shadow:0 0 6px rgba(${GLOW},0.5);pointer-events:none;z-index:10;left:${x}px;top:${y}px;`;
    ref.current.appendChild(el);
    gsap.to(el, { x: (Math.random() - .5) * 80, y: (Math.random() - .5) * 80, opacity: 0, scale: 0, duration: 1.5 + Math.random(), ease: "power2.out", onComplete: () => el.remove() });
  };
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}
      style={{ "--glow-x": "50%", "--glow-y": "50%", "--glow-intensity": "0", ...style } as React.CSSProperties}
      onMouseEnter={() => { if (!ref.current) return; if (enableTilt) gsap.to(ref.current, { rotateX: 3, rotateY: 3, duration: 0.3, ease: "power2.out", transformPerspective: 1000 }); const { width, height } = ref.current.getBoundingClientRect(); for (let i = 0; i < 6; i++) setTimeout(() => spawn(Math.random() * width, Math.random() * height), i * 70); }}
      onMouseLeave={() => { if (!ref.current) return; if (enableTilt) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" }); ref.current.style.setProperty("--glow-intensity", "0"); }}
      onMouseMove={(e) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; ref.current.style.setProperty("--glow-x", `${(x / r.width) * 100}%`); ref.current.style.setProperty("--glow-y", `${(y / r.height) * 100}%`); ref.current.style.setProperty("--glow-intensity", "1"); if (enableTilt) gsap.to(ref.current, { rotateX: ((y - r.height / 2) / r.height) * -8, rotateY: ((x - r.width / 2) / r.width) * 8, duration: 0.1, ease: "power2.out", transformPerspective: 1000 }); if (Math.random() > 0.85) spawn(x, y); }}>
      {children}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", background: `radial-gradient(280px circle at var(--glow-x) var(--glow-y), rgba(${GLOW}, calc(var(--glow-intensity) * 0.07)) 0%, transparent 60%)` }} />
      <div style={{ position: "absolute", inset: 0, padding: 1, background: `radial-gradient(300px circle at var(--glow-x,50%) var(--glow-y,50%), rgba(${GLOW},calc(var(--glow-intensity,0)*0.5)) 0%, rgba(${GLOW},calc(var(--glow-intensity,0)*0.15)) 40%, transparent 65%)`, borderRadius: "inherit", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", pointerEvents: "none", zIndex: 1 }} />
    </div>
  );
}

export default function JobMatch() {
  const { latestText, latestFileName, setLatestMatch } = useResumeStore();
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualResume, setManualResume] = useState("");
  const [useManual, setUseManual] = useState(false);

  const resumeText = useManual ? manualResume : latestText;
  const canAnalyze = resumeText && resumeText.trim().length > 50 && jobDescription.trim().length > 50;
  const mc = result ? result.matchScore >= 75 ? "#4ade80" : result.matchScore >= 50 ? "#fbbf24" : "#f87171" : "#6366f1";

  const handleMatch = async () => {
    if (!canAnalyze) return;
    setIsLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch("/api/match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resumeText, jobDescription }) });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong.");
      else { setResult(data.match); setLatestMatch(data.match); }
    } catch { setError("Network error. Please try again."); }
    finally { setIsLoading(false); }
  };

  const TA = ({ value, onChange, rows, placeholder }: { value: string; onChange: (v: string) => void; rows: number; placeholder: string }) => (
    <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder}
      style={{ width: "100%", fontSize: 12, color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 12, resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
  );

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#0d0d14", padding: "40px clamp(24px, 5vw, 72px)" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.fu{animation:fadeUp 0.5s ease forwards;opacity:0}.d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}.d4{animation-delay:.2s}.d5{animation-delay:.25s}`}</style>

      <div style={{ marginBottom: 32 }}>
        <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(99,102,241,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Job Match</span>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "white", margin: 0 }}>Match resume to job</h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>Paste a job description and see exactly how well your resume aligns.</p>
      </div>

      
      <div style={{ display: "grid", gridTemplateColumns: result ? "minmax(0,1fr) minmax(0,1fr)" : "minmax(0, 640px)", gap: 20, width: "100%", maxWidth: 1200, alignItems: "start" }}>

        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          
          <ParticleCard enableTilt={false} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Resume source</span>
              <button onClick={() => { setUseManual(!useManual); setResult(null); }} style={{ fontSize: 11, color: "rgba(99,102,241,0.8)", fontWeight: 500, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                {useManual ? "← Use last uploaded" : "Paste manually"}
              </button>
            </div>
            {!useManual ? (
              latestText ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2h8l3 3v9a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 2v4h4" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" /></svg>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(74,222,128,0.9)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{latestFileName}</span>
                    <span style={{ display: "block", fontSize: 11, color: "rgba(74,222,128,0.5)" }}>{latestText.length.toLocaleString()} chars</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(74,222,128,0.8)", background: "rgba(74,222,128,0.1)", padding: "2px 8px", borderRadius: 6 }}>Ready</span>
                </div>
              ) : (
                <div style={{ padding: "12px 14px", borderRadius: 12, background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)" }}>
                  <span style={{ display: "block", fontSize: 12, fontWeight: 500, color: "rgba(251,191,36,0.8)" }}>No resume uploaded yet</span>
                  <span style={{ display: "block", fontSize: 11, color: "rgba(251,191,36,0.45)", marginTop: 2 }}>
                    Go to <a href="/dashboard/upload" style={{ color: "rgba(99,102,241,0.8)" }}>Upload Resume</a> first, or paste manually.
                  </span>
                </div>
              )
            ) : <TA value={manualResume} onChange={setManualResume} rows={6} placeholder="Paste your resume text here..." />}
          </ParticleCard>

          
          <ParticleCard enableTilt={false} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 20 }}>
            <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>Job description</span>
            <TA value={jobDescription} onChange={(v) => { setJobDescription(v); setResult(null); }} rows={9} placeholder="Paste the full job description here..." />
            <span style={{ display: "block", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>{jobDescription.length} characters</span>
          </ParticleCard>

          {error && <div style={{ padding: "12px 16px", borderRadius: 12, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", fontSize: 13, color: "#fca5a5" }}>{error}</div>}

          <button onClick={handleMatch} disabled={isLoading || !canAnalyze} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "white", background: isLoading || !canAnalyze ? "rgba(99,102,241,0.2)" : "linear-gradient(135deg,#6366f1,#4f46e5)", border: "none", cursor: isLoading || !canAnalyze ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: isLoading || !canAnalyze ? "none" : "0 0 20px rgba(99,102,241,0.3)", transition: "all 0.15s" }}>
            {isLoading ? <><svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="2" strokeDasharray="20 14" /></svg>Analyzing match...</> : "Match Resume to Job →"}
          </button>
        </div>

        
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            
            <ParticleCard className="fu d1" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "24px", display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
                <svg width="96" height="96" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="48" cy="48" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                  <circle cx="48" cy="48" r="38" fill="none" stroke={mc} strokeWidth="7" strokeDasharray={2 * Math.PI * 38} strokeDashoffset={2 * Math.PI * 38 - (result.matchScore / 100) * 2 * Math.PI * 38} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.2s ease", filter: `drop-shadow(0 0 8px ${mc}60)` }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: mc, fontFamily: "'Syne', sans-serif", lineHeight: 1 }}><CountUp to={result.matchScore} duration={1.2} />%</span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>match</span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ display: "block", fontSize: 10, fontWeight: 600, color: "rgba(99,102,241,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Match Score</span>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 8px" }}>{result.verdict}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>{result.recommendation}</p>
              </div>
            </ParticleCard>

            
            <div className="fu d2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))", gap: 10 }}>
              {Object.entries(result.sectionScores).map(([key, score]: [string, any], i) => {
                const c = score >= 75 ? "#4ade80" : score >= 50 ? "#fbbf24" : "#f87171";
                return (
                  <ParticleCard key={key} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 8px", textAlign: "center" }}>
                    <span style={{ display: "block", fontSize: 9, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{key}</span>
                    <span style={{ display: "block", fontSize: 20, fontWeight: 800, color: c, fontFamily: "'Syne', sans-serif" }}><CountUp to={score} duration={1 + i * 0.1} /></span>
                  </ParticleCard>
                );
              })}
            </div>

            
            <div className="fu d3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              <ParticleCard style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.12)", borderRadius: 16, padding: 16 }}>
                <span style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Matched</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {result.matchedSkills.map((s: string) => <span key={s} style={{ fontSize: 11, fontWeight: 500, color: "rgba(74,222,128,0.8)", background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", padding: "3px 10px", borderRadius: 8 }}>{s}</span>)}
                </div>
              </ParticleCard>
              <ParticleCard style={{ background: "rgba(248,113,113,0.04)", border: "1px solid rgba(248,113,113,0.12)", borderRadius: 16, padding: 16 }}>
                <span style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#f87171", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Missing</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {result.missingSkills.map((s: string) => <span key={s} style={{ fontSize: 11, fontWeight: 500, color: "rgba(248,113,113,0.8)", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", padding: "3px 10px", borderRadius: 8 }}>{s}</span>)}
                </div>
              </ParticleCard>
            </div>

            
            <ParticleCard className="fu d4" enableTilt={false} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 20 }}>
              <span style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>Top Actions</span>
              {result.topActions.map((action: string, i: number) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(99,102,241,0.5)", marginTop: 2, flexShrink: 0 }}>0{i + 1}</span>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{action}</p>
                </div>
              ))}
            </ParticleCard>
          </div>
        )}
      </div>
    </div>
  );
}