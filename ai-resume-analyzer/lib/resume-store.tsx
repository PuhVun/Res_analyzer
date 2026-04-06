"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SectionAnalysis {
    score: number;
    title: string;
    feedback: string;
    suggestions: string[];
}

export interface Analysis {
    overallScore: number;
    summary: string;
    sections: Record<string, SectionAnalysis>;
    topStrengths: string[];
    criticalImprovements: string[];
    verdict: string;
}

export interface HistoryEntry {
    id: string;
    fileName: string;
    date: string;
    score: number;
    analysis: Analysis;
    extractedText: string;
    totalPages: number;
}

export interface MatchResult {
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    recommendation: string;
    verdict: string;
}

interface ResumeStore {
    // Latest upload
    latestText: string | null;
    latestFileName: string | null;
    latestAnalysis: Analysis | null;
    setLatestResult: (text: string, fileName: string, analysis: Analysis, totalPages: number) => void;

    // History
    history: HistoryEntry[];
    clearHistory: () => void;

    // Match
    latestMatch: MatchResult | null;
    setLatestMatch: (match: MatchResult) => void;
}

const ResumeContext = createContext<ResumeStore | null>(null);

const HISTORY_KEY = "resume_ai_history";

export function ResumeProvider({ children }: { children: ReactNode }) {
    const [latestText, setLatestText] = useState<string | null>(null);
    const [latestFileName, setLatestFileName] = useState<string | null>(null);
    const [latestAnalysis, setLatestAnalysis] = useState<Analysis | null>(null);
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [latestMatch, setLatestMatch] = useState<MatchResult | null>(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(HISTORY_KEY);
            if (stored) setHistory(JSON.parse(stored));
        } catch { }
    }, []);

    const setLatestResult = (text: string, fileName: string, analysis: Analysis, totalPages: number) => {
        setLatestText(text);
        setLatestFileName(fileName);
        setLatestAnalysis(analysis);

        const entry: HistoryEntry = {
            id: Date.now().toString(),
            fileName,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            score: analysis.overallScore,
            analysis,
            extractedText: text,
            totalPages,
        };

        setHistory((prev) => {
            const updated = [entry, ...prev].slice(0, 20);
            try { localStorage.setItem(HISTORY_KEY, JSON.stringify(updated)); } catch { }
            return updated;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        try { localStorage.removeItem(HISTORY_KEY); } catch { }
    };

    return (
        <ResumeContext.Provider value={{
            latestText, latestFileName, latestAnalysis,
            setLatestResult, history, clearHistory,
            latestMatch, setLatestMatch,
        }}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResumeStore() {
    const ctx = useContext(ResumeContext);
    if (!ctx) throw new Error("useResumeStore must be used within ResumeProvider");
    return ctx;
}