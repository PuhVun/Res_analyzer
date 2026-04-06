"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { useRef } from "react";
import { gsap } from "gsap";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
}

const navItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
                <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
                <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
                <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.4" />
            </svg>
        ),
    },
    {
        label: "Upload Resume",
        href: "/dashboard/upload",
        icon: (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v9M5 4l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "My Analyses",
        href: "/dashboard/history",
        icon: (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 2v4h4M5 9h6M5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        label: "Job Match",
        href: "/dashboard/match",
        icon: (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5.5 8.5l2 2 3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        badge: "New",
    },
];

// Particle hover effect on nav items
function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
    const ref = useRef<HTMLAnchorElement>(null);

    const spawnParticle = (x: number, y: number) => {
        if (!ref.current) return;
        const el = document.createElement("div");
        el.style.cssText = `
            position:absolute;width:2px;height:2px;border-radius:50%;
            background:rgba(99,102,241,0.9);box-shadow:0 0 4px rgba(99,102,241,0.6);
            pointer-events:none;z-index:10;left:${x}px;top:${y}px;
        `;
        ref.current.appendChild(el);
        gsap.to(el, {
            x: (Math.random() - 0.5) * 40,
            y: (Math.random() - 0.5) * 30,
            opacity: 0,
            scale: 0,
            duration: 0.8 + Math.random() * 0.5,
            ease: "power2.out",
            onComplete: () => el.remove(),
        });
    };

    return (
        <Link
            ref={ref}
            href={item.href}
            onMouseEnter={(e) => {
                if (!ref.current) return;
                const rect = ref.current.getBoundingClientRect();
                for (let i = 0; i < 4; i++) {
                    setTimeout(() => spawnParticle(
                        Math.random() * rect.width,
                        Math.random() * rect.height
                    ), i * 50);
                }
            }}
            className="group relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] transition-all duration-150 overflow-hidden"
            style={{
                background: isActive
                    ? "rgba(99,102,241,0.15)"
                    : "transparent",
                color: isActive
                    ? "rgba(165,180,252,1)"
                    : "rgba(255,255,255,0.3)",
                border: isActive
                    ? "1px solid rgba(99,102,241,0.25)"
                    : "1px solid transparent",
            }}
        >
            {/* Active left bar */}
            {isActive && (
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: "20%",
                        height: "60%",
                        width: 2,
                        borderRadius: 99,
                        background: "linear-gradient(180deg, #6366f1, #818cf8)",
                        boxShadow: "0 0 8px rgba(99,102,241,0.8)",
                    }}
                />
            )}

            <span
                className="shrink-0 transition-colors"
                style={{ color: isActive ? "rgba(165,180,252,0.9)" : "rgba(255,255,255,0.2)" }}
            >
                {item.icon}
            </span>
            <span className="flex-1 font-medium">{item.label}</span>
            {item.badge && (
                <span
                    style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        padding: "2px 6px",
                        borderRadius: 6,
                        background: isActive ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.12)",
                        color: isActive ? "rgba(165,180,252,1)" : "rgba(99,102,241,0.7)",
                        border: "1px solid rgba(99,102,241,0.2)",
                    }}
                >
                    {item.badge}
                </span>
            )}

            {/* Hover glow fill */}
            {!isActive && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none rounded-lg"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                />
            )}
        </Link>
    );
}

export function DashboardSidebar({
    userName,
    userEmail,
}: {
    userName: string;
    userEmail: string;
    userImage: string;
}) {
    const pathname = usePathname();

    return (
        <aside
            style={{
                fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
                background: "#0a0a12",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                width: 220,
                flexShrink: 0,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
            `}</style>

            {/* Logo */}
            <div style={{
                padding: "20px 20px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                        width: 30,
                        height: 30,
                        borderRadius: 10,
                        background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 0 16px rgba(99,102,241,0.4)",
                    }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 2h7l3 3v7H2V2z" fill="white" opacity="0.95" />
                            <path d="M9 2v3h3" stroke="white" strokeWidth="1" opacity="0.5" />
                            <path d="M4 7h6M4 9.5h4" stroke="#4f46e5" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>
                        <Link href="/" style={{ textDecoration: "none" }}>
                            <span style={{
                                display: "block",
                                fontFamily: "'Syne', sans-serif",
                                fontSize: 14,
                                fontWeight: 800,
                                color: "white",
                                lineHeight: 1,
                                margin: 0,
                            }}>ResumeAI</span>
                            <span style={{
                                display: "block",
                                fontSize: 10,
                                color: "rgba(99,102,241,0.6)",
                                marginTop: 2,
                                lineHeight: 1,
                            }}>Analyzer</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: "14px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
                <p style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.15)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "0 10px 8px",
                }}>
                    Navigation
                </p>
                {navItems.map((item) => {
                    const isActive = item.href === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname.startsWith(item.href);
                    return <NavLink key={item.href} item={item} isActive={isActive} />;
                })}
            </nav>

            {/* Analyze CTA */}
            <div style={{ padding: "0 10px 14px" }}>
                <Link
                    href="/dashboard/upload"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                        padding: "9px 12px",
                        borderRadius: 10,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "rgba(165,180,252,0.9)",
                        background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(79,70,229,0.08))",
                        border: "1px solid rgba(99,102,241,0.2)",
                        textDecoration: "none",
                        transition: "all 0.15s ease",
                        boxSizing: "border-box",
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 1v8M4 4l2.5-3L9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.5 10v1.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Analyze a resume
                </Link>
            </div>

            {/* Divider */}
            <div style={{ margin: "0 10px", height: 1, background: "rgba(255,255,255,0.05)" }} />

            {/* User section */}
            <div style={{
                padding: "12px 14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 10,
            }}>
                <UserButton afterSignOutUrl="/" />
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1,
                        marginBottom: 3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}>{userName}</p>
                    <p style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.25)",
                        lineHeight: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    }}>{userEmail}</p>
                </div>
            </div>
        </aside>
    );
}