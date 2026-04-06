import { NextResponse } from "next/server";
import { extractText, getDocumentProxy } from "unpdf";

function checkFileType(uint8Array: Uint8Array): { type: string; isPDF: boolean } {
    const view = new Uint8Array(uint8Array.slice(0, 4));
    if (view[0] === 0x25 && view[1] === 0x50 && view[2] === 0x44 && view[3] === 0x46)
        return { type: "PDF", isPDF: true };
    if (view[0] === 0x50 && view[1] === 0x4b)
        return { type: "ZIP/DOCX", isPDF: false };
    return { type: "Unknown", isPDF: false };
}

async function analyzeWithOpenRouter(resumeText: string): Promise<string> {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
            "X-Title": "Resume Analyzer",
        },
        body: JSON.stringify({
            model: "nvidia/llama-nemotron-embed-vl-1b-v2:free",
            messages: [
                {
                    role: "system",
                    content: `You are an expert resume analyst and career coach with 15+ years of experience in recruitment across tech, finance, and creative industries. Analyze resumes with precision, honesty, and actionable insight. Always respond in the following exact JSON structure:

{
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentence executive summary of the candidate>",
  "sections": {
    "impact": {
      "score": <0-100>,
      "title": "Impact & Achievements",
      "feedback": "<specific feedback>",
      "suggestions": ["<suggestion 1>", "<suggestion 2>"]
    },
    "clarity": {
      "score": <0-100>,
      "title": "Clarity & Structure",
      "feedback": "<specific feedback>",
      "suggestions": ["<suggestion 1>", "<suggestion 2>"]
    },
    "skills": {
      "score": <0-100>,
      "title": "Skills & Keywords",
      "feedback": "<specific feedback>",
      "suggestions": ["<suggestion 1>", "<suggestion 2>"]
    },
    "experience": {
      "score": <0-100>,
      "title": "Experience Relevance",
      "feedback": "<specific feedback>",
      "suggestions": ["<suggestion 1>", "<suggestion 2>"]
    },
    "ats": {
      "score": <0-100>,
      "title": "ATS Compatibility",
      "feedback": "<specific feedback>",
      "suggestions": ["<suggestion 1>", "<suggestion 2>"]
    }
  },
  "topStrengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "criticalImprovements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"],
  "verdict": "<one punchy sentence verdict on this resume>"
}

Return ONLY valid JSON. No markdown, no backticks, no extra text.`,
                },
                {
                    role: "user",
                    content: `Analyze this resume:\n\n${resumeText}`,
                },
            ],
            temperature: 0.3,
            max_tokens: 1500,
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`OpenRouter error: ${response.status} — ${err}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("Empty response from OpenRouter");
    return content;
}

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file)
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const uint8Array = new Uint8Array(bytes);

    const fileCheck = checkFileType(uint8Array);
    if (!fileCheck.isPDF) {
        return NextResponse.json({
            error: fileCheck.type === "ZIP/DOCX"
                ? "Please convert your Word document to PDF first."
                : "Invalid file. Please upload a PDF.",
        }, { status: 400 });
    }

    try {
        
        const pdf = await getDocumentProxy(uint8Array);
        const { text, totalPages } = await extractText(pdf, { mergePages: true });

        if (!text || text.trim().length < 50) {
            return NextResponse.json({
                error: "Could not extract enough text. Your PDF may be image-based or scanned.",
                totalPages,
            }, { status: 422 });
        }

        
        const rawAnalysis = await analyzeWithOpenRouter(text);

        
        let analysis;
        try {
            const cleaned = rawAnalysis.replace(/```json|```/g, "").trim();
            analysis = JSON.parse(cleaned);
        } catch {
            return NextResponse.json({
                error: "AI returned an unexpected format. Please try again.",
            }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            extractedText: text,
            totalPages,
            charCount: text.length,
            analysis,
        });

    } catch (err) {
        console.error("Error:", err);
        const message = err instanceof Error ? err.message : "Unexpected error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}