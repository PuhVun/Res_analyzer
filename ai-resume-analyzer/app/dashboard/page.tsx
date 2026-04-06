"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useResumeStore } from "@/lib/resume-store";
import CountUp from "@/components/ui/CountUp";
import { useRef } from "react";
import { gsap } from "gsap";

const GLOW_COLOR = "99, 102, 241";


function ParticleCard({
    children,
    className = "",
    style,
    onClick,
    enableTilt = false,
    glowColor = GLOW_COLOR,
}: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    enableTilt?: boolean;
    glowColor?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const spawnParticle = (x: number, y: number) => {
        if (!ref.current) return;
        const el = document.createElement("div");
        el.style.cssText = `position:absolute;width:2.5px;height:2.5px;border-radius:50%;background:rgba(${glowColor},0.9);box-shadow:0 0 5px rgba(${glowColor},0.6);pointer-events:none;z-index:10;left:${x}px;top:${y}px;`;
        ref.current.appendChild(el);
        gsap.to(el, {
            x: (Math.random() - 0.5) * 70,
            y: (Math.random() - 0.5) * 70,
            opacity: 0,
            scale: 0,
            duration: 1.2 + Math.random() * 0.6,
            ease: "power2.out",
            onComplete: () => el.remove(),
        });
    };

    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`relative overflow-hidden ${className}`}
            style={{
                cursor: onClick ? "pointer" : "default",
                "--glow-x": "50%",
                "--glow-y": "50%",
                "--glow-intensity": "0",
                ...style,
            } as React.CSSProperties}
            onMouseEnter={() => {
                if (!ref.current) return;
                if (enableTilt) gsap.to(ref.current, { rotateX: 3, rotateY: 3, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
                const { width, height } = ref.current.getBoundingClientRect();
                for (let i = 0; i < 6; i++) setTimeout(() => spawnParticle(Math.random() * width, Math.random() * height), i * 60);
            }}
            onMouseLeave={() => {
                if (!ref.current) return;
                if (enableTilt) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
                ref.current.style.setProperty("--glow-intensity", "0");
            }}
            onMouseMove={(e) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                const x = e.clientX - rect.left, y = e.clientY - rect.top;
                ref.current.style.setProperty("--glow-x", `${(x / rect.width) * 100}%`);
                ref.current.style.setProperty("--glow-y", `${(y / rect.height) * 100}%`);
                ref.current.style.setProperty("--glow-intensity", "1");
                if (enableTilt) gsap.to(ref.current, { rotateX: ((y - rect.height / 2) / rect.height) * -7, rotateY: ((x - rect.width / 2) / rect.width) * 7, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
                if (Math.random() > 0.88) spawnParticle(x, y);
            }}
        >
            {children}
            
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", background: `radial-gradient(280px circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, calc(var(--glow-intensity) * 0.07)) 0%, transparent 60%)` }} />
            
            <div style={{ position: "absolute", inset: 0, padding: 1, background: `radial-gradient(280px circle at var(--glow-x,50%) var(--glow-y,50%), rgba(${glowColor},calc(var(--glow-intensity,0)*0.55)) 0%, rgba(${glowColor},calc(var(--glow-intensity,0)*0.15)) 40%, transparent 65%)`, borderRadius: "inherit", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", pointerEvents: "none", zIndex: 1 }} />
        </div>
    );
}


const actionCards = [
    {
        href: "/dashboard/upload",
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2v11M6 6l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        title: "Upload Resume",
        description: "Drop your PDF and get a full AI-powered breakdown — scores, feedback, and actionable tips in seconds.",
        cta: "Start analyzing →",
        glowColor: "99, 102, 241",
        accentColor: "rgba(165,180,252,0.9)",
        accentBg: "rgba(99,102,241,0.08)",
        accentBorder: "rgba(99,102,241,0.2)",
    },
    {
        href: "/dashboard/history",
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M4 3h9l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 3v5h5M7 11h6M7 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
        title: "My Analyses",
        description: "Review all your past resume scans, track your score over time, and see how much you've improved.",
        cta: "View history →",
        glowColor: "74, 222, 128",
        accentColor: "rgba(74,222,128,0.9)",
        accentBg: "rgba(74,222,128,0.07)",
        accentBorder: "rgba(74,222,128,0.18)",
    },
    {
        href: "/dashboard/match",
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
                <path d="M7 10.5l2.5 2.5 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Job Match",
        description: "Paste a job description and instantly see how well your resume aligns with the role requirements.",
        cta: "Try job match →",
        badge: "New",
        glowColor: "251, 191, 36",
        accentColor: "rgba(251,191,36,0.9)",
        accentBg: "rgba(251,191,36,0.07)",
        accentBorder: "rgba(251,191,36,0.18)",
    },
];

const tips = [
    { num: "01", text: "Quantify achievements — 'increased sales by 40%' beats 'improved sales' every time." },
    { num: "02", text: "Keep it to one page if you have under 10 years of experience. Recruiters scan, not read." },
    { num: "03", text: "Tailor keywords from the job description directly into your resume for ATS systems." },
    { num: "04", text: "Put your most recent and relevant experience first — don't bury the good stuff." },
];


export default function Dashboard() {
    const router = useRouter();
    const { user } = useUser();
    const { history } = useResumeStore();
    const firstName = user?.firstName ?? "there";

    
    const totalAnalyses = history.length;
    const latestScore = history.length > 0 ? history[0].score : null;
    const avgScore = history.length > 0
        ? Math.round(history.reduce((a, b) => a + b.score, 0) / history.length)
        : null;
    const scoreColor = (s: number) => s >= 75 ? "#4ade80" : s >= 50 ? "#fbbf24" : "#f87171";

    return (
        <div
            style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", minHeight: "100vh", background: "#0d0d14", padding: "40px 32px" }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
                @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
                .fade-up { animation: fadeUp 0.55s ease forwards; opacity: 0; }
                .d1{animation-delay:0.05s}.d2{animation-delay:0.12s}.d3{animation-delay:0.19s}
                .d4{animation-delay:0.26s}.d5{animation-delay:0.33s}.d6{animation-delay:0.4s}
                .d7{animation-delay:0.47s}.d8{animation-delay:0.54s}
                .action-card:hover .cta-text { opacity: 1 !important; transform: translateX(3px); }
                .action-card:hover { border-color: rgba(255,255,255,0.1) !important; }
            `}</style>

            
            <div className="fade-up d1 mb-10">
                <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(99,102,241,0.7)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                    Overview
                </p>
                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "white", margin: 0, lineHeight: 1.1 }}>
                    Good to see you, {firstName} 👋
                </h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 8 }}>
                    Here's a summary of your resume activity.
                </p>
            </div>

            
            <div className="fade-up d2 grid grid-cols-3 gap-4 mb-10">
                
                <ParticleCard
                    className="rounded-2xl px-5 py-5"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                    enableTilt
                >
                    <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                        Resumes Analyzed
                    </p>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "white", lineHeight: 1 }}>
                        {totalAnalyses > 0 ? <CountUp to={totalAnalyses} duration={1.2} /> : "0"}
                    </p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>
                        {totalAnalyses === 0 ? "Upload your first resume" : `${totalAnalyses} total scan${totalAnalyses > 1 ? "s" : ""}`}
                    </p>
                </ParticleCard>

                
                <ParticleCard
                    className="rounded-2xl px-5 py-5"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                    enableTilt
                >
                    <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                        Latest Score
                    </p>
                    {latestScore !== null ? (
                        <>
                            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: scoreColor(latestScore), lineHeight: 1, filter: `drop-shadow(0 0 10px ${scoreColor(latestScore)}50)` }}>
                                <CountUp to={latestScore} duration={1.4} />
                            </p>
                            
                            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 99, marginTop: 10, overflow: "hidden" }}>
                                <div style={{ width: `${latestScore}%`, height: "100%", background: scoreColor(latestScore), borderRadius: 99, boxShadow: `0 0 8px ${scoreColor(latestScore)}50`, transition: "width 1.2s ease" }} />
                            </div>
                        </>
                    ) : (
                        <>
                            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "rgba(255,255,255,0.15)", lineHeight: 1 }}>—</p>
                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>No analysis yet</p>
                        </>
                    )}
                </ParticleCard>

                
                <ParticleCard
                    className="rounded-2xl px-5 py-5"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                    enableTilt
                >
                    <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                        Average Score
                    </p>
                    {avgScore !== null ? (
                        <>
                            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: scoreColor(avgScore), lineHeight: 1, filter: `drop-shadow(0 0 10px ${scoreColor(avgScore)}50)` }}>
                                <CountUp to={avgScore} duration={1.4} delay={0.1} />
                            </p>
                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>
                                across {totalAnalyses} scan{totalAnalyses > 1 ? "s" : ""}
                            </p>
                        </>
                    ) : (
                        <>
                            <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 32, fontWeight: 800, color: "rgba(255,255,255,0.15)", lineHeight: 1 }}>—</p>
                            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: 6 }}>No data yet</p>
                        </>
                    )}
                </ParticleCard>
            </div>

            
            {history.length >= 2 && (
                <div className="fade-up d3 mb-10">
                    <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                        Score Trend
                    </p>
                    <ParticleCard
                        className="rounded-2xl p-5"
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                        <div className="flex items-end gap-2" style={{ height: 56 }}>
                            {[...history].reverse().slice(-12).map((entry, i, arr) => {
                                const c = scoreColor(entry.score);
                                const h = Math.max((entry.score / 100) * 56, 4);
                                const isLast = i === arr.length - 1;
                                return (
                                    <div key={entry.id} className="flex flex-col items-center gap-1 flex-1" title={`${entry.fileName}: ${entry.score}`}>
                                        <div style={{ width: "100%", height: h, background: isLast ? c : `${c}40`, borderRadius: "3px 3px 0 0", boxShadow: isLast ? `0 0 10px ${c}60` : "none", transition: "height 0.8s ease" }} />
                                        <span style={{ fontSize: 9, color: isLast ? c : "rgba(255,255,255,0.15)", fontWeight: 700 }}>{entry.score}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </ParticleCard>
                </div>
            )}

            
            <p className="fade-up d4" style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                Quick Actions
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-10">
                {actionCards.map((card, i) => (
                    <ParticleCard
                        key={card.href}
                        className={`fade-up action-card rounded-2xl p-5 transition-all duration-200 d${5 + i}`}
                        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                        onClick={() => router.push(card.href)}
                        enableTilt
                        glowColor={card.glowColor}
                    >
                        
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                            <div style={{
                                width: 38,
                                height: 38,
                                borderRadius: 10,
                                background: card.accentBg,
                                border: `1px solid ${card.accentBorder}`,
                                color: card.accentColor,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                {card.icon}
                            </div>
                            {card.badge && (
                                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(251,191,36,0.8)", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", padding: "3px 8px", borderRadius: 6 }}>
                                    {card.badge}
                                </span>
                            )}
                        </div>

                        <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 8 }}>
                            {card.title}
                        </p>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 18 }}>
                            {card.description}
                        </p>
                        <p
                            className="cta-text"
                            style={{ fontSize: 12, fontWeight: 600, color: card.accentColor, opacity: 0.7, transition: "opacity 0.15s ease, transform 0.15s ease", display: "inline-block" }}
                        >
                            {card.cta}
                        </p>
                    </ParticleCard>
                ))}
            </div>

            
            <p className="fade-up d8" style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                Resume Tips
            </p>
            <ParticleCard
                className="fade-up d8 rounded-2xl overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
                enableTilt={false}
            >
                {tips.map((tip, i) => (
                    <div
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 14,
                            padding: "14px 20px",
                            borderBottom: i < tips.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        }}
                    >
                        <span style={{ fontSize: 10, fontWeight: 800, color: "rgba(99,102,241,0.35)", marginTop: 2, flexShrink: 0, letterSpacing: "0.05em", fontFamily: "'Syne', sans-serif" }}>
                            {tip.num}
                        </span>
                        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0 }}>
                            {tip.text}
                        </p>
                    </div>
                ))}
            </ParticleCard>
        </div>
    );
}