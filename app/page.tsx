"use client";

import { useMemo, useState } from "react";
import { auditSpend, fallbackSummary, SpendItem, UseCase } from "../lib/audit-engine";

const tools = ["Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Anthropic API", "OpenAI API", "Gemini", "Windsurf"] as const;
const useCases = ["coding", "writing", "data", "research", "mixed"] as const;

const starter: SpendItem[] = [
  { tool: "Cursor", plan: "Business", monthlySpend: 80, seats: 2, useCase: "coding" },
  { tool: "GitHub Copilot", plan: "Business", monthlySpend: 38, seats: 2, useCase: "coding" },
  { tool: "OpenAI API", plan: "API direct", monthlySpend: 650, seats: 1, useCase: "coding" },
];

function money(v: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v);
}

export default function Page() {
  const [teamSize, setTeamSize] = useState(5);
  const [primaryUseCase, setPrimaryUseCase] = useState<UseCase>("coding");
  const [items, setItems] = useState<SpendItem[]>(starter);

  const result = useMemo(
    () => auditSpend({ teamSize, primaryUseCase, tools: items }),
    [teamSize, primaryUseCase, items]
  );

  function update(i: number, key: keyof SpendItem, value: string) {
    setItems((current) =>
      current.map((item, index) =>
        index === i
          ? { ...item, [key]: key === "monthlySpend" || key === "seats" ? Number(value) : value }
          : item
      )
    );
  }

  function addTool() {
    setItems([...items, { tool: "Claude", plan: "Pro", monthlySpend: 20, seats: 1, useCase: "research" }]);
  }

  function removeTool(index: number) {
    setItems((current) => current.filter((_, i) => i !== index));
  }

  return (
    <main className="shell">
      <nav className="nav">
        <div className="brand">
          <div className="logo">◆</div>
          <strong>SpendLeak AI</strong>
          <span>Credex Round 1 MVP</span>
        </div>
        <p>AI spend intelligence for modern teams</p>
      </nav>

      <section className="hero">
        <div>
          <h1>
            Find Hidden <span>AI Spend Leaks</span>
          </h1>
          <p>
            Dark founder-grade AI spend auditor for Credex-ready savings discovery. Enter your AI tools,
            get an instant audit, capture a report after value is shown, and share a public-safe savings result.
          </p>
        </div>

        <div className="metrics">
          <Metric title="Monthly Savings" value={`$${money(result.totalMonthlySavings)}`} />
          <Metric title="Annual Savings" value={`$${money(result.totalAnnualSavings)}`} />
          <Metric title="Confidence" value={`${result.confidenceScore}%`} />
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <div className="card-title">
            <div className="icon">✦</div>
            <h2>Audit Input</h2>
          </div>

          <div className="top-inputs">
            <label>
              Team size
              <input type="number" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} />
            </label>

            <label>
              Primary use case
              <select value={primaryUseCase} onChange={(e) => setPrimaryUseCase(e.target.value as UseCase)}>
                {useCases.map((u) => <option key={u}>{u}</option>)}
              </select>
            </label>
          </div>

          <div className="table-head">
            <span>Tool</span><span>Plan</span><span>Monthly Spend</span><span>Seats</span><span>Use Case</span><span></span>
          </div>

          <div className="rows">
            {items.map((item, i) => (
              <div className="tool-row" key={i}>
                <select value={item.tool} onChange={(e) => update(i, "tool", e.target.value)}>
                  {tools.map((t) => <option key={t}>{t}</option>)}
                </select>
                <input value={item.plan} onChange={(e) => update(i, "plan", e.target.value)} />
                <input type="number" value={item.monthlySpend} onChange={(e) => update(i, "monthlySpend", e.target.value)} />
                <input type="number" value={item.seats} onChange={(e) => update(i, "seats", e.target.value)} />
                <select value={item.useCase} onChange={(e) => update(i, "useCase", e.target.value)}>
                  {useCases.map((u) => <option key={u}>{u}</option>)}
                </select>
                <button className="delete" onClick={() => removeTool(i)}>×</button>
              </div>
            ))}
          </div>

          <button className="add" onClick={addTool}>＋ Add Tool</button>
          <button className="run">✦ Run Audit</button>
        </div>

        <div className="card">
          <div className="card-title spread">
            <div className="left-title">
              <div className="icon">✣</div>
              <h2>Audit Result</h2>
            </div>
            <span className="badge">Savings Identified</span>
          </div>

          <div className="summary">
            <h3>Save <span>${money(result.totalAnnualSavings)}</span>/year</h3>
            <p>{fallbackSummary(result)}</p>
          </div>

          <div className="recommendations">
            {result.recommendations.map((r) => (
              <article className="rec" key={r.tool}>
                <div className="rec-top">
                  <div>
                    <strong>{r.tool}</strong>
                    <small>Save ${money(r.monthlySavings)}/mo</small>
                  </div>
                  <span>${money(r.currentSpend)} current → ${money(r.recommendedSpend)} recommended</span>
                </div>
                <div className="rec-bottom">
                  <p>{r.reason}</p>
                  <b>{r.recommendedAction}</b>
                </div>
              </article>
            ))}
          </div>

          <div className="actions">
            <button>⇩ Download Report</button>
            <button className="share">⤴ Share Public Result</button>
          </div>
        </div>
      </section>

      <footer>© 2026 SpendLeak AI. Built for Credex.</footer>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="metric">
      <div className="metric-icon">●</div>
      <p>{title}</p>
      <strong>{value}</strong>
    </div>
  );
}