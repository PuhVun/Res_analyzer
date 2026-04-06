<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=AI%20Resume%20Analyzer&fontSize=50&fontColor=fff&animation=twinkling&fontAlignY=36&desc=Stop%20guessing.%20Start%20getting%20interviews.&descAlignY=58&descSize=20" width="100%"/>

<br/>

<p align="center">
  <a href="#-demo"><img src="https://img.shields.io/badge/🎬_Live_Demo-FF4B4B?style=for-the-badge"/></a>
  <a href="#%EF%B8%8F-getting-started"><img src="https://img.shields.io/badge/🚀_Quick_Start-0070F3?style=for-the-badge"/></a>
  <a href="#-features"><img src="https://img.shields.io/badge/✨_Features-8B5CF6?style=for-the-badge"/></a>
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white"/>
  <img src="https://img.shields.io/badge/Clerk_Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/PuhVun/ai-resume-analyzer?style=flat-square&color=FFD700&label=⭐%20Stars"/>
  <img src="https://img.shields.io/github/forks/PuhVun/ai-resume-analyzer?style=flat-square&color=0070F3&label=🍴%20Forks"/>
  <img src="https://img.shields.io/badge/License-MIT-22C55E?style=flat-square"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-F97316?style=flat-square"/>
  <img src="https://img.shields.io/badge/Status-Active-22C55E?style=flat-square"/>
</p>

<br/>

### 🎯 Upload your resume → Get an AI score → Land more interviews.

<br/>

</div>

---

<br/>

## 💥 Why This Exists

Most people send out **dozens of resumes** and hear nothing back.

Not because they're unqualified — but because their resume doesn't **clearly communicate** their value.

**AI Resume Analyzer** fixes that. In seconds, it tells you:
- 📈 How strong your resume actually is (scored out of 100)
- 🔍 What's holding you back
- 🎯 How well you match a specific job description
- 💡 Exactly what to change to get more callbacks

> *Built for developers, designers, and anyone serious about their job search.*

<br/>

---

<br/>

## ✨ Features

<br/>

<table>
<tr>
<td width="50%" valign="top">

### 📊 Resume Analysis
Upload your PDF resume and let AI do the heavy lifting.

```
✅  AI-generated score (0–100)
✅  Strengths breakdown
✅  Weaknesses identified  
✅  Actionable suggestions
✅  Instant results
```

</td>
<td width="50%" valign="top">

### 🎯 Job Description Matching
Paste any job description and see how well you fit.

```
✅  Smart match score
✅  Keyword gap analysis
✅  Tailored insights
✅  Side-by-side comparison
✅  Interview readiness check
```

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 📜 History & Progress Tracking
See how much you've improved over time.

```
✅  Full analysis history
✅  Score progression
✅  Version comparison
✅  Personalized dashboard
✅  Cloud-synced data
```

</td>
<td width="50%" valign="top">

### 🔐 Secure Authentication
Your data stays yours — always.

```
✅  Clerk-powered auth
✅  Secure login / signup
✅  Per-user dashboards
✅  Session management
✅  Privacy-first design
```

</td>
</tr>
</table>

<br/>

---

<br/>

## 🧠 How It Works

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│             │     │              │     │             │     │              │     │             │
│  📄 Upload  │────▶│  📝 Extract  │────▶│  🤖 AI      │────▶│  📊 Score &  │────▶│  🖥️ Display │
│   Resume    │     │    Text      │     │  Analysis   │     │  Feedback    │     │  Results    │
│             │     │              │     │             │     │              │     │             │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘     └─────────────┘
```

1. **User logs in** via Clerk authentication
2. **Uploads resume** as a PDF file
3. **Backend validates** the file and extracts raw text using `unpdf`
4. **AI processes** the content via OpenRouter (with OpenAI as fallback)
5. **Structured feedback** is generated and saved
6. **Results are rendered** in a clean, interactive UI

<br/>

---

<br/>

## 📈 Example Output

<br/>

```
╔══════════════════════════════════════════════════╗
║           📊  RESUME ANALYSIS REPORT             ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║   Overall Score:  ████████░░  82 / 100  🔥       ║
║                                                  ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  ✅  STRENGTHS                                   ║
║      → Strong technical background               ║
║      → Clear, concise project descriptions       ║
║      → Relevant skills well-highlighted          ║
║                                                  ║
║  ⚠️  WEAKNESSES                                  ║
║      → Missing quantified impact metrics         ║
║      → Formatting inconsistencies detected       ║
║      → Summary section lacks punch               ║
║                                                  ║
║  💡  SUGGESTIONS                                 ║
║      → Add numbers: "improved load time by 40%"  ║
║      → Align all section headers consistently    ║
║      → Rewrite summary to lead with value        ║
║                                                  ║
╚══════════════════════════════════════════════════╝
```

<br/>

---

<br/>

## 🏗️ Tech Stack

<br/>

| Layer | Technology | Purpose |
|-------|------------|---------|
| 🎨 **Frontend** | Next.js 15 + React 19 | App framework & UI |
| 💅 **Styling** | Tailwind CSS + shadcn/ui | Beautiful, accessible components |
| ⚙️ **Backend** | Next.js API Routes | Server-side processing |
| 🤖 **AI (Primary)** | OpenRouter | Resume analysis engine |
| 🤖 **AI (Fallback)** | OpenAI GPT-4 | Reliability backup |
| 📄 **PDF Processing** | unpdf | Text extraction from resumes |
| 🔐 **Auth** | Clerk | Secure user authentication |

<br/>

---

<br/>

## 📁 Project Structure

```bash
📦 ai-resume-analyzer
├── 📂 app/
│   ├── 📂 dashboard/
│   │   ├── 📂 upload/          # Resume upload page
│   │   ├── 📂 history/         # Past analyses
│   │   └── 📂 match/           # Job description matching
│   ├── 📂 api/
│   │   └── 📂 upload/          # File handling + AI API routes
│   └── layout.tsx
├── 📂 components/              # Reusable UI components
├── 📂 lib/                     # Utilities & helpers
├── .env.local                  # Environment variables
└── README.md
```

<br/>

---

<br/>

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# 🤖 AI
OPENROUTER_API_KEY=your_openrouter_key_here

# 🔐 Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

> 💡 Get your keys from [OpenRouter](https://openrouter.ai) and [Clerk](https://clerk.com) — both have generous free tiers to get you started instantly.

<br/>

---

<br/>

## ▶️ Getting Started

**Get up and running in under 2 minutes:**

```bash
# 1️⃣  Clone the repository
git clone https://github.com/PuhVun/ai-resume-analyzer.git
cd ai-resume-analyzer

# 2️⃣  Install dependencies
npm install

# 3️⃣  Set up your environment variables
cp .env.example .env.local
# → Fill in your API keys

# 4️⃣  Start the development server
npm run dev
```

<br/>

Open your browser and visit:

```
http://localhost:3000
```

**That's it. You're live. 🎉**

<br/>

---

<br/>

## 🔮 Roadmap

```
 ✅  Core resume analysis
 ✅  Job description matching
 ✅  History tracking
 ✅  Clerk authentication

 🔜  Structured JSON AI output
 🔜  Resume version comparison
 🔜  Analytics dashboard
 🔜  AI-powered resume rewriting
 🔜  PDF export / download reports
 🔜  ATS optimization scoring
 🔜  LinkedIn profile analysis
 🔜  Cover letter generator
```

<br/>

---

<br/>

## 💡 Key Highlights

| | |
|---|---|
| 🧠 **Real AI Integration** | Not just a wrapper — full prompt engineering for structured, meaningful feedback |
| 🏗️ **Full-Stack** | End-to-end Next.js — one codebase, frontend + backend |
| 🎨 **Clean UI/UX** | shadcn/ui components with Tailwind for a polished, professional feel |
| 📈 **Scalable Architecture** | API routes designed for extensibility and performance |
| 🔒 **Secure by Default** | Clerk handles auth so user data is always protected |

<br/>

---

<br/>

## 🔥 Why This Project Stands Out

This is a showcase of **modern full-stack AI development** done right:

- ✅ Real-world AI integration — not toy examples
- ✅ Production-ready architecture
- ✅ Clean API design with proper error handling
- ✅ Thoughtful UX with genuine product thinking
- ✅ Scalable, maintainable codebase

> Whether you're a recruiter evaluating skills or a developer looking to learn — this project demonstrates what modern web + AI development looks like in practice.

<br/>

---

<br/>

## 👨‍💻 Author

<div align="center">

Built with ❤️ as a full-stack AI project to demonstrate modern web development and AI integration.

<br/>

**If this helped you or inspired you, a ⭐ goes a long way — it helps others discover this project!**

<br/>

<a href="https://github.com/PuhVun">
  <img src="https://img.shields.io/badge/Follow_on_GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>
&nbsp;
<a href="https://github.com/PuhVun/ai-resume-analyzer/stargazers">
  <img src="https://img.shields.io/badge/⭐_Star_this_repo-FFD700?style=for-the-badge"/>
</a>
&nbsp;
<a href="https://github.com/PuhVun/ai-resume-analyzer/fork">
  <img src="https://img.shields.io/badge/🍴_Fork_it-0070F3?style=for-the-badge"/>
</a>

</div>

<br/>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer" width="100%"/>

<sub>Made with ☕ and a passion for building things that matter.</sub>

</div>
