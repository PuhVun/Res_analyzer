import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
        return NextResponse.json({ error: "Both resume text and job description are required." }, { status: 400 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            "X-Title": "Resume Analyzer",
        },
        body: JSON.stringify({
            model: "qwen/qwen3.6-plus:free",
            messages: [
                {
                    role: "system",
                    content: `You are an expert ATS and recruitment analyst. Compare a resume against a job description and respond ONLY in this exact JSON with no markdown, no backticks, no extra text:
{
  "matchScore": <number 0-100>,
  "matchedSkills": ["<skill1>", "<skill2>", ...],
  "missingSkills": ["<skill1>", "<skill2>", ...],
  "matchedKeywords": ["<kw1>", "<kw2>", ...],
  "missingKeywords": ["<kw1>", "<kw2>", ...],
  "sectionScores": {
    "skills": <0-100>,
    "experience": <0-100>,
    "education": <0-100>,
    "keywords": <0-100>
  },
  "recommendation": "<2-3 sentence actionable recommendation to improve match>",
  "verdict": "<one sentence overall verdict>",
  "topActions": ["<action1>", "<action2>", "<action3>"]
}`,
                },
                {
                    role: "user",
                    content: `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
                },
            ],
            temperature: 0.3,
            max_tokens: 1200,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        return NextResponse.json({ error: `OpenRouter error: ${err}` }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return NextResponse.json({ error: "Empty response from AI." }, { status: 500 });

    try {
        const match = JSON.parse(content.replace(/```json|```/g, "").trim());
        return NextResponse.json({ success: true, match });
    } catch {
        return NextResponse.json({ error: "AI returned unexpected format. Please try again." }, { status: 500 });
    }
}