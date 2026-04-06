import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";

export default function SignInPage() {
    return (
        <div
            style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
            className="relative min-h-screen bg-[#0d0d14] flex items-center justify-center overflow-hidden"
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Syne:wght@700;800&display=swap');
                @keyframes spotlight {
                    0% { opacity: 0; transform: translate(-72%, -62%) rotate(10deg) scale(0.9); }
                    100% { opacity: 1; transform: translate(-50%, -40%) rotate(6deg) scale(1); }
                }
                .animate-spotlight { animation: spotlight 2.5s ease forwards; }
            `}</style>

            <Spotlight className="-top-40 left-0 md:-top-20" fill="#818cf8" />

            
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `linear-gradient(rgba(165,180,252,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(165,180,252,0.03) 1px, transparent 1px)`,
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative z-10 w-full max-w-sm px-4">
                
                <div className="flex flex-col items-center mb-8">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", boxShadow: "0 0 24px rgba(99,102,241,0.4)" }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M3 2h8l4 4v10a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" fill="white" opacity="0.9" />
                            <path d="M11 2v5h5" stroke="white" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
                            <path d="M5 9h8M5 12h5" stroke="#4f46e5" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, color: "white" }}>
                        ResumeAI
                    </p>
                    <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>Sign in to continue</p>
                </div>

                
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "bg-[#13131f] border border-white/[0.08] shadow-none rounded-2xl",
                            headerTitle: "text-white font-semibold",
                            headerSubtitle: "text-slate-500",
                            socialButtonsBlockButton: "border border-white/[0.08] bg-white/[0.03] text-white hover:bg-white/[0.06] transition-all",
                            socialButtonsBlockButtonText: "text-white text-[13px]",
                            dividerLine: "bg-white/[0.06]",
                            dividerText: "text-slate-600",
                            formFieldLabel: "text-slate-400 text-[12px]",
                            formFieldInput: "bg-white/[0.04] border-white/[0.08] text-white placeholder-slate-600 focus:border-indigo-500/50 focus:ring-0 rounded-lg",
                            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[13px] rounded-lg transition-all",
                            footerActionText: "text-slate-500 text-[12px]",
                            footerActionLink: "text-indigo-400 hover:text-indigo-300 text-[12px]",
                            identityPreviewText: "text-white",
                            identityPreviewEditButton: "text-indigo-400",
                            alertText: "text-red-400",
                        },
                    }}
                />

                <p className="text-center mt-6" style={{ fontSize: 12, color: "#334155" }}>
                    <Link href="/" className="hover:text-slate-400 transition-colors">← Back to home</Link>
                </p>
            </div>
        </div>
    );
}