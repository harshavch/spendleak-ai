# SpendLeak AI

Dark founder-grade AI spend auditor for Credex-ready savings discovery.

A production-oriented Credex Round 1 build: deterministic audit math, public-safe result flow, lead capture endpoint, transactional email hook, benchmark intelligence, confidence score, and 30 audit-engine tests.


## Live Demo

Live URL: https://spendleakai.netlify.app

GitHub URL:
https://github.com/harshavch/spendleak-ai


## Screenshots / video

<img width="1536" height="960" alt="Screenshot 2026-05-14 151016" src="https://github.com/user-attachments/assets/d5f0179a-5330-47c6-bf43-104d479ce07b" />

<img width="1536" height="960" alt="Screenshot 2026-05-14 150702" src="https://github.com/user-attachments/assets/4084df1f-cbf5-44dd-a259-48ea5cf7ea55" />

## Quick start
```bash
npm install
cp .env.example .env.local
npm run dev
npm test
```

## Production setup
1. Create Supabase table using `supabase/schema.sql`.
2. Add Supabase, Resend, Anthropic, and app URL env vars.
3. Deploy on Cloudflare Pages or Netlify.
4. Add real screenshots and deployed URL here.

## Decisions
1. Next.js + TypeScript for typed product flow, API routes, metadata, and deploy speed.
2. Deterministic audit engine for math; AI is used only for summary copy/fallback.
3. Email gate appears after value is shown to match the assignment and improve trust.
4. Public reports must strip company/email but keep tools and savings to support virality.
5. Benchmark and confidence scores make the report feel finance-literate, not like a generic calculator.


