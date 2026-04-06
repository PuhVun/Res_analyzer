"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/lib/resume-store";
import CountUp from "@/components/ui/CountUp";
import { gsap } from "gsap";

const GLOW = "99, 102, 241";

function ParticleCard({ children, className = "", style, enableTilt = true }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    enableTilt?: boolean;
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
            onMouseEnter={() => {
                if (!ref.current) return;
                if (enableTilt) gsap.to(ref.current, { rotateX: 4, rotateY: 4, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
                const { width, height } = ref.current.getBoundingClientRect();
                for (let i = 0; i < 8; i++) setTimeout(() => spawn(Math.random() * width, Math.random() * height), i * 60);
            }}
            onMouseLeave={() => {
                if (!ref.current) return;
                if (enableTilt) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
                ref.current.style.setProperty("--glow-intensity", "0");
            }}
            onMouseMove={(e) => {
                if (!ref.current) return;
                const r = ref.current.getBoundingClientRect();
                const x = e.clientX - r.left, y = e.clientY - r.top;
                ref.current.style.setProperty("--glow-x", `${(x / r.width) * 100}%`);
                ref.current.style.setProperty("--glow-y", `${(y / r.height) * 100}%`);
                ref.current.style.setProperty("--glow-intensity", "1");
                if (enableTilt) gsap.to(ref.current, { rotateX: ((y - r.height / 2) / r.height) * -8, rotateY: ((x - r.width / 2) / r.width) * 8, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
                if (Math.random() > 0.7) spawn(x, y);
            }}
        >
            {children}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", background: `radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(${GLOW}, calc(var(--glow-intensity) * 0.08)) 0%, transparent 60%)` }} />
            <div style={{ position: "absolute", inset: 0, padding: 1, background: `radial-gradient(300px circle at var(--glow-x,50%) var(--glow-y,50%), rgba(${GLOW},calc(var(--glow-intensity,0)*0.5)) 0%, rgba(${GLOW},calc(var(--glow-intensity,0)*0.15)) 40%, transparent 65%)`, borderRadius: "inherit", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", pointerEvents: "none", zIndex: 1 }} />
        </div>
    );
}

function ScoreRing({ score }: { score: number }) {
    const r = 44, circ = 2 * Math.PI * r;
    const color = score >= 75 ? "#4ade80" : score >= 50 ? "#fbbf24" : "#f87171";
    return (
        <div style={{ position: "relative", width: 110, height: 110, flexShrink: 0 }}>
            <svg width="110" height="110" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8"
                    strokeDasharray={circ} strokeDashoffset={circ - (score / 100) * circ}
                    strokeLinecap="round" style={{ transition: "stroke-dashoffset 1.2s ease", filter: `drop-shadow(0 0 8px ${color}60)` }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1, fontFamily: "'Syne', sans-serif" }}>
                    <CountUp to={score} duration={1.5} />
                </span>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>/ 100</span>
            </div>
        </div>
    );
}

function SectionRow({ section }: { section: any }) {
    const [open, setOpen] = useState(false);
    const color = section.score >= 75 ? "#4ade80" : section.score >= 50 ? "#fbbf24" : "#f87171";
    return (
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)" }}>{section.title}</span>
                        <span style={{ color, fontSize: 12, fontWeight: 700 }}>{section.score}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 99, overflow: "hidden", background: "rgba(255,255,255,0.06)" }}>
                        <div style={{ width: `${section.score}%`, background: color, height: "100%", borderRadius: 99, transition: "width 1.2s ease", boxShadow: `0 0 8px ${color}50` }} />
                    </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                    <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {open && (
                <div style={{ padding: "0 20px 16px" }}>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 10 }}>{section.feedback}</p>
                    {section.suggestions.map((s: string, i: number) => (
                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                            <span style={{ color, fontSize: 10, marginTop: 2, flexShrink: 0 }}>→</span>
                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{s}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function UploadPage() {
    const router = useRouter();
    const { setLatestResult } = useResumeStore();
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("");
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"analysis" | "text">("analysis");
    const inputRef = useRef<HTMLInputElement>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const reset = () => { setFile(null); setResult(null); setError(null); setLoadingProgress(0); };
    const handleFile = (f: File) => { setFile(f); setResult(null); setError(null); };
    const fmtSize = (b: number) => b < 1048576 ? (b / 1024).toFixed(1) + " KB" : (b / 1048576).toFixed(1) + " MB";

    const handleUpload = async () => {
        if (!file) return;
        setIsLoading(true); setError(null); setResult(null); setLoadingProgress(0);
        progressRef.current = setInterval(() => setLoadingProgress(p => p < 85 ? p + Math.random() * 8 : p), 400);
        try {
            setLoadingMsg("Reading PDF...");
            const fd = new FormData();
            fd.append("file", file);
            setTimeout(() => setLoadingMsg("Analyzing with AI..."), 1200);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            const data = await res.json();
            if (progressRef.current) clearInterval(progressRef.current);
            setLoadingProgress(100);
            if (!res.ok) setError(data.error || "Something went wrong.");
            else { setResult(data); setLatestResult(data.extractedText, file.name, data.analysis, data.totalPages); }
        } catch {
            if (progressRef.current) clearInterval(progressRef.current);
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false); setLoadingMsg("");
        }
    };

    return (
        <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#0d0d14", padding: "40px clamp(24px, 5vw, 72px)" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
                @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
                .fu{animation:fadeUp 0.5s ease forwards;opacity:0}
                .d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}.d4{animation-delay:.2s}.d5{animation-delay:.25s}.d6{animation-delay:.3s}
                @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
                .shimmer{background:linear-gradient(90deg,transparent,rgba(99,102,241,0.15),transparent);background-size:200% 100%;animation:shimmer 1.8s infinite}
            `}</style>

            
            <div style={{ marginBottom: 32 }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 600, color: "rgba(99,102,241,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Upload</span>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, color: "white", margin: 0 }}>Analyze your resume</h1>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 6 }}>Upload a PDF to get an AI-powered score with detailed section feedback.</p>
            </div>

            {!result ? (
                /* ── Upload form ── */
                <div style={{ maxWidth: 600, width: "100%" }}>
                    <ParticleCard
                        enableTilt={false}
                        className="rounded-2xl border-2 border-dashed mb-4 cursor-pointer transition-all"
                        style={{
                            borderColor: isDragging ? "rgba(99,102,241,0.6)" : file ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.08)",
                            background: isDragging ? "rgba(99,102,241,0.05)" : file ? "rgba(74,222,128,0.03)" : "rgba(255,255,255,0.02)",
                        }}
                    >
                        <div
                            style={{ padding: "40px 32px", textAlign: "center" }}
                            onClick={() => inputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
                        >
                            <input ref={inputRef} type="file" accept=".pdf" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} style={{ display: "none" }} />
                            {file ? (
                                <>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M3 2h10l5 5v11a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13 2v6h6" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: "white", margin: "0 0 4px" }}>{file.name}</p>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0 }}>{fmtSize(file.size)}</p>
                                </>
                            ) : (
                                <>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 2v12M7 5l3-3 3 3" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 15v2a1 1 0 001 1h12a1 1 0 001-1v-2" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <p style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)", margin: "0 0 6px" }}>{isDragging ? "Drop it here" : "Drag & drop your resume"}</p>
                                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: 0 }}>or click to browse · PDF only</p>
                                </>
                            )}
                        </div>
                    </ParticleCard>

                    {error && <div style={{ marginBottom: 16, padding: "12px 16px", borderRadius: 12, background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", fontSize: 13, color: "#fca5a5" }}>{error}</div>}

                    {isLoading && (
                        <div style={{ marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{loadingMsg}</span>
                                <span style={{ fontSize: 12, color: "rgba(99,102,241,0.8)", fontWeight: 600 }}>{Math.round(loadingProgress)}%</span>
                            </div>
                            <div style={{ height: 4, borderRadius: 99, overflow: "hidden", background: "rgba(255,255,255,0.06)" }}>
                                <div className="shimmer" style={{ width: `${loadingProgress}%`, background: "linear-gradient(90deg,#6366f1,#818cf8)", height: "100%", borderRadius: 99, transition: "width 0.4s ease" }} />
                            </div>
                        </div>
                    )}

                    <div style={{ display: "flex", gap: 8 }}>
                        {file && (
                            <button onClick={handleUpload} disabled={isLoading} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "white", background: isLoading ? "rgba(99,102,241,0.4)" : "linear-gradient(135deg,#6366f1,#4f46e5)", border: "none", cursor: isLoading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: isLoading ? "none" : "0 0 20px rgba(99,102,241,0.3)", transition: "all 0.15s" }}>
                                {isLoading ? <><svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="2" strokeDasharray="20 14" /></svg>Analyzing...</> : "Analyze Resume →"}
                            </button>
                        )}
                        {file && (
                            <button onClick={reset} style={{ padding: "12px 16px", borderRadius: 12, fontSize: 13, color: "rgba(255,255,255,0.4)", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontFamily: "inherit" }}>Clear</button>
                        )}
                    </div>

                    {!file && (
                        <div style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                            {[
                                { label: "Impact & Achievements", desc: "Are your bullets strong and quantified?" },
                                { label: "ATS Compatibility", desc: "Will recruiters' software find you?" },
                                { label: "Skills & Keywords", desc: "Do you match what employers search for?" },
                                { label: "Clarity & Structure", desc: "Is your resume easy to scan in 6 seconds?" },
                            ].map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(99,102,241,0.6)", boxShadow: "0 0 6px rgba(99,102,241,0.5)", flexShrink: 0 }} />
                                    <div>
                                        <p style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.7)", margin: 0 }}>{item.label}</p>
                                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "2px 0 0" }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                /* ── Results ── */
                <div style={{ width: "100%", maxWidth: 1100 }}>
                    
                    <div className="fu d1" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, marginBottom: 16, alignItems: "stretch" }}>
                        <ParticleCard style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "24px", display: "flex", alignItems: "center", gap: 24 }}>
                            <ScoreRing score={result.analysis.overallScore} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <span style={{ display: "block", fontSize: 10, fontWeight: 600, color: "rgba(99,102,241,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Overall Score</span>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 10 }}>{result.analysis.summary}</p>
                                <div style={{ padding: "8px 12px", borderRadius: 10, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                                    <p style={{ fontSize: 12, color: "rgba(165,180,252,0.8)", fontStyle: "italic", margin: 0 }}>"{result.analysis.verdict}"</p>
                                </div>
                            </div>
                        </ParticleCard>
                        <ParticleCard style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: 20, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, minWidth: 200 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(165,180,252,0.9)", margin: 0 }}>Ready to match jobs?</p>
                            <p style={{ fontSize: 11, color: "rgba(99,102,241,0.5)", margin: 0 }}>Your text is auto-loaded.</p>
                            <button onClick={() => router.push("/dashboard/match")} style={{ fontSize: 12, fontWeight: 600, color: "white", background: "linear-gradient(135deg,#6366f1,#4f46e5)", border: "none", borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 16px rgba(99,102,241,0.3)" }}>Try Job Match →</button>
                        </ParticleCard>
                    </div>

                    
                    <div className="fu d2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 16 }}>
                        {[
                            { label: "Pages", value: result.totalPages },
                            { label: "Characters", value: result.charCount },
                            { label: "Sections", value: Object.keys(result.analysis.sections).length },
                        ].map(({ label, value }) => (
                            <ParticleCard key={label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "14px 16px", textAlign: "center" }}>
                                <span style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</span>
                                <span style={{ display: "block", fontSize: 22, fontWeight: 800, color: "white", fontFamily: "'Syne', sans-serif" }}>
                                    <CountUp to={value} duration={1.2} />
                                </span>
                            </ParticleCard>
                        ))}
                    </div>

                    
                    <div className="fu d3" style={{ display: "flex", gap: 4, padding: 4, borderRadius: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16 }}>
                        {(["analysis", "text"] as const).map((tab) => (
                            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "10px", borderRadius: 12, fontSize: 12, fontWeight: 500, border: activeTab === tab ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent", background: activeTab === tab ? "rgba(99,102,241,0.25)" : "transparent", color: activeTab === tab ? "white" : "rgba(255,255,255,0.3)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
                                {tab === "analysis" ? "AI Analysis" : "Extracted Text"}
                            </button>
                        ))}
                    </div>

                    {activeTab === "analysis" && (
                        <div>
                            
                            <div className="fu d4" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 12, marginBottom: 16 }}>
                                {Object.values(result.analysis.sections).map((section: any, i: number) => {
                                    const c = section.score >= 75 ? "#4ade80" : section.score >= 50 ? "#fbbf24" : "#f87171";
                                    return (
                                        <ParticleCard key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "14px 12px", textAlign: "center" }}>
                                            <span style={{ display: "block", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8, lineHeight: 1.4 }}>{section.title.split(" ")[0]}</span>
                                            <span style={{ display: "block", fontSize: 22, fontWeight: 800, color: c, fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>
                                                <CountUp to={section.score} duration={1 + i * 0.1} delay={0.1 * i} />
                                            </span>
                                            <div style={{ height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                                                <div style={{ width: `${section.score}%`, height: "100%", background: c, borderRadius: 99, boxShadow: `0 0 6px ${c}50`, transition: "width 1.2s ease" }} />
                                            </div>
                                        </ParticleCard>
                                    );
                                })}
                            </div>

                            
                            <div className="fu d5" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 16 }}>
                                <ParticleCard style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.12)", borderRadius: 16, padding: "20px" }}>
                                    <span style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Strengths</span>
                                    {result.analysis.topStrengths.map((s: string, i: number) => (
                                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                                            <span style={{ color: "#4ade80", fontSize: 10, marginTop: 2, flexShrink: 0 }}>✓</span>
                                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{s}</span>
                                        </div>
                                    ))}
                                </ParticleCard>
                                <ParticleCard style={{ background: "rgba(248,113,113,0.04)", border: "1px solid rgba(248,113,113,0.12)", borderRadius: 16, padding: "20px" }}>
                                    <span style={{ display: "block", fontSize: 10, fontWeight: 600, color: "#f87171", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>To Improve</span>
                                    {result.analysis.criticalImprovements.map((s: string, i: number) => (
                                        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 10 }}>
                                            <span style={{ color: "#f87171", fontSize: 10, marginTop: 2, flexShrink: 0 }}>!</span>
                                            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{s}</span>
                                        </div>
                                    ))}
                                </ParticleCard>
                            </div>

                            
                            <ParticleCard className="fu d6" enableTilt={false} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
                                <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Section Breakdown</span>
                                </div>
                                {Object.values(result.analysis.sections).map((section: any, i: number) => (
                                    <SectionRow key={i} section={section} />
                                ))}
                            </ParticleCard>
                        </div>
                    )}

                    {activeTab === "text" && (
                        <ParticleCard enableTilt={false} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                                {[{ l: "Pages", v: result.totalPages }, { l: "Characters", v: result.charCount.toLocaleString() }].map(({ l, v }) => (
                                    <div key={l}>
                                        <span style={{ display: "block", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{l}</span>
                                        <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "white" }}>{v}</span>
                                    </div>
                                ))}
                                <button onClick={() => navigator.clipboard.writeText(result.extractedText)} style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: 8, fontSize: 12, color: "rgba(255,255,255,0.4)", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", fontFamily: "inherit" }}>Copy</button>
                            </div>
                            <pre style={{ padding: 20, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "'Fira Code', monospace", maxHeight: 480, overflowY: "auto", margin: 0 }}>
                                {result.extractedText}
                            </pre>
                        </ParticleCard>
                    )}

                    <button onClick={reset} style={{ marginTop: 16, width: "100%", padding: "12px", borderRadius: 12, fontSize: 13, color: "rgba(255,255,255,0.3)", background: "transparent", border: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", fontFamily: "inherit" }}>
                        Analyze another resume
                    </button>
                </div>
            )}
        </div>
    );
}