import { useState } from "react";
import { Chip, OptionSection, Field, inputCls, PromptOutput, useApp, StickyBar, Button, generatePrompt } from "../components/chrome";
import { chatCompletion, friendlyError } from "../lib/api";
import {
  METHODS, TONES, OUTPUT_FORMATS, AUDIENCES, LANGUAGES, DETAIL_LEVELS, CATEGORIES,
  REFINE_FORMATS, QUALITY_LEVELS, TARGET_MODELS,
  CODE_LANGS, CODE_USECASES, WEBSITE_TYPES, DESIGN_STYLES, COMPLEXITY, CODE_OUTPUT_STYLES,
  VIBE_PLATFORMS, PROJECT_TYPES, TECH_STACKS, VIBE_FEATURES, COLOR_SCHEMES,
} from "../data/options";

function useSingle<T>(initial: T) {
  const [v, setV] = useState<T>(initial);
  return [v, setV] as const;
}

// ================= GENERAL =================
export function GeneralMode() {
  const { needKey } = useApp();
  const [idea, setIdea] = useState("");
  const [cat, setCat] = useSingle<string | null>(null);
  const [sub, setSub] = useSingle<string | null>(null);
  const [method, setMethod] = useSingle("Standard");
  const [tone, setTone] = useSingle("Professional");
  const [format, setFormat] = useSingle("Paragraph");
  const [audience, setAudience] = useSingle("General Public");
  const [lang, setLang] = useSingle("English");
  const [detail, setDetail] = useSingle<string>("detailed");
  const [context, setContext] = useState("");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [openCat, setOpenCat] = useState<string | null>(null);

  const words = detail === "brief" ? 200 : detail === "mega" ? 1500 : 700;

  const generate = () => {
    const lines = [
      `# PROMPT — ${method} method`,
      ``,
      `**Topic:** ${idea || "(no topic given — treat as open brief)"}`,
      cat ? `**Category:** ${cat}${sub ? ` / ${sub}` : ""}` : null,
      `**Tone:** ${tone}`,
      `**Output format:** ${format}`,
      `**Audience:** ${audience}`,
      `**Language:** ${lang}`,
      `**Length:** about ${words} words (${detail})`,
      context ? `**Extra context:** ${context}` : null,
      ``,
      `## Instructions for the AI`,
      methodInstruction(method),
      `Write in a ${tone.toLowerCase()} tone, formatted as ${format.toLowerCase()}, for ${audience.toLowerCase()}. Respond in ${lang}.`,
    ].filter((x) => x !== null);
    generatePrompt(lines.join("\n"), { setPrompt, setBusy, setErr });
  };

  const aiHelper = async (kind: "idea" | "autoselect") => {
    if (needKey()) return;
    setBusy(true); setErr(null);
    try {
      const out = await chatCompletion([
        { role: "system", content: "Reply with only the requested text, no explanations." },
        { role: "user", content: kind === "idea"
          ? "Suggest one creative, specific prompt topic idea (single sentence)."
          : `Given this idea: "${idea}". Pick the single best category from: ${CATEGORIES.map((c) => c.name).join(", ")}. Reply with only the category name.` },
      ], { maxTokens: 120 });
      if (kind === "idea") setIdea(out.trim());
      else {
        const found = CATEGORIES.find((c) => out.toLowerCase().includes(c.name.toLowerCase()));
        if (found) { setCat(found.name); setOpenCat(found.name); }
      }
    } catch (e) { setErr(friendlyError(e)); }
    finally { setBusy(false); }
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5">
        <Field label="Your idea">
          <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={3} placeholder="Describe what you want the AI to do…" className={inputCls} />
        </Field>
        <div className="flex flex-wrap gap-2 mt-3">
          <Button variant="secondary" size="sm" onClick={() => aiHelper("autoselect")} disabled={busy || !idea}>🤖 AI Auto-Select category</Button>
          <Button variant="secondary" size="sm" onClick={() => aiHelper("idea")} disabled={busy}>🎲 Random idea (AI)</Button>
        </div>
        {err && <p className="text-rose-300 text-sm mt-2">⚠️ {err}</p>}
      </div>

      <div className="liquid rounded-2xl p-4 md:p-5">
        <h3 className="font-bold mb-3">📂 Category</h3>
        <div className="grid gap-2">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => { setOpenCat(openCat === c.name ? null : c.name); setCat(c.name); }}
                className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex justify-between ${cat === c.name ? "bg-violet-500/15" : "bg-white/[0.03]"}`}>
                {c.name} <span className="text-zinc-500">({c.subs.length}) {openCat === c.name ? "▾" : "▸"}</span>
              </button>
              {openCat === c.name && (
                <div className="flex flex-wrap gap-2 p-3">
                  {c.subs.map((s) => <Chip key={s} active={sub === s} onClick={() => setSub(sub === s ? null : s)}>{s}</Chip>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <OptionSection title="🧠 Prompt engineering method">{METHODS.map((m) => <Chip key={m} active={method === m} onClick={() => setMethod(m)}>{m}</Chip>)}</OptionSection>
      <OptionSection title="🎭 Tone / Style">{TONES.map((x) => <Chip key={x} active={tone === x} onClick={() => setTone(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="📄 Output format">{OUTPUT_FORMATS.map((x) => <Chip key={x} active={format === x} onClick={() => setFormat(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="👥 Target audience">{AUDIENCES.map((x) => <Chip key={x} active={audience === x} onClick={() => setAudience(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🌍 Output language">{LANGUAGES.map((x) => <Chip key={x} active={lang === x} onClick={() => setLang(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="📏 Detail level">{DETAIL_LEVELS.map((d) => <Chip key={d.id} active={detail === d.id} onClick={() => setDetail(d.id)}>{d.label} · {d.hint}</Chip>)}</OptionSection>

      <div className="liquid rounded-2xl p-4 md:p-5">
        <Field label="Additional context (optional)">
          <textarea value={context} onChange={(e) => setContext(e.target.value)} rows={2} placeholder="Anything else the AI should know…" className={inputCls} />
        </Field>
      </div>
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy}>{busy ? "✨ Writing with AI…" : "✨ Generate Prompt"}</Button>
      </StickyBar>

      <PromptOutput prompt={prompt} busy={busy} />
    </div>
  );
}

function methodInstruction(m: string): string {
  switch (m) {
    case "Chain-of-Thought": return "Think step by step: show your reasoning before the final answer.";
    case "Few-Shot": return "First give 2 short examples of the desired output style, then produce the real answer.";
    case "Role-Play": return "Adopt the persona of a world-class expert in this field for the entire response.";
    case "Tree-of-Thought": return "Explore 3 different approaches, compare them, then deliver the best one.";
    case "Socratic": return "Guide through questions first, then synthesize the final answer.";
    case "Mega Prompt": return "Be exhaustive: cover definition, steps, examples, pitfalls, and pro tips.";
    case "ReAct": return "Reason about what to do, then act: alternate brief reasoning with concrete output.";
    case "Constraint-Based": return "Respect these constraints strictly: no filler, no repetition, every claim actionable.";
    case "Iterative Refinement": return "Draft the answer, then critique it, then deliver the improved final version.";
    default: return "Answer directly, clearly, and completely.";
  }
}

// ================= REFINE =================
export function RefineMode() {
  const [raw, setRaw] = useState("");
  const [method, setMethod] = useSingle("Standard");
  const [format, setFormat] = useSingle(REFINE_FORMATS[0]);
  const [quality, setQuality] = useSingle(QUALITY_LEVELS[0]);
  const [target, setTarget] = useSingle(TARGET_MODELS[0]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const generate = () => {
    const brief = [
      `# PROMPT REFINEMENT — ${quality} level`,
      ``,
      `**Raw prompt to refine:**`,
      raw || "(paste your rough prompt above)",
      ``,
      `**Refine it into:** ${format}`,
      `**Method:** ${method} — ${methodInstruction(method)}`,
      target !== "Any" ? `**Optimized for:** ${target}` : null,
      ``,
      `## Requirements`,
      `- Preserve the original intent exactly; remove ambiguity and vagueness.`,
      `- Add roles, constraints, output format, and examples where they strengthen the prompt.`,
      `- Quality bar: ${quality}. Make it reusable — use [BRACKETS] for variables.`,
      `- Output ONLY the refined prompt, no commentary.`,
    ].filter((x) => x !== null).join("\n");
    generatePrompt(brief, { setPrompt, setBusy, setErr });
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5">
        <Field label="Your rough prompt">
          <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={4} placeholder="Paste the prompt you want to improve…" className={inputCls} />
        </Field>
      </div>
      <OptionSection title="🧠 Method">{METHODS.map((m) => <Chip key={m} active={method === m} onClick={() => setMethod(m)}>{m}</Chip>)}</OptionSection>
      <OptionSection title="📄 Refined format">{REFINE_FORMATS.map((x) => <Chip key={x} active={format === x} onClick={() => setFormat(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="⭐ Quality level">{QUALITY_LEVELS.map((x) => <Chip key={x} active={quality === x} onClick={() => setQuality(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🎯 Target AI">{TARGET_MODELS.map((x) => <Chip key={x} active={target === x} onClick={() => setTarget(x)}>{x}</Chip>)}</OptionSection>
      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy}>{busy ? "🔬 Writing with AI…" : "🔬 Refine Prompt"}</Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy} />
    </div>
  );
}

// ================= CODING =================
export function CodingMode() {
  const [task, setTask] = useState("");
  const [langs, setLangs] = useState<string[]>(["TypeScript"]);
  const [usecase, setUsecase] = useSingle(CODE_USECASES[0]);
  const [site, setSite] = useSingle<string | null>(null);
  const [style, setStyle] = useSingle<string | null>(null);
  const [complexity, setComplexity] = useSingle(COMPLEXITY[1]);
  const [outStyle, setOutStyle] = useSingle(CODE_OUTPUT_STYLES[1]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const generate = () => {
    const brief = [
      `# CODING PROMPT — ${usecase}`,
      ``,
      `**Task:** ${task || "(describe the feature / bug / refactor above)"}`,
      `**Stack:** ${langs.join(", ") || "—"}`,
      site ? `**Website type:** ${site}` : null,
      style ? `**UI/UX style:** ${style}` : null,
      `**Complexity:** ${complexity}`,
      `**Output style:** ${outStyle}`,
      ``,
      `## Instructions for the AI developer`,
      `- Write clean, production-quality code with sensible defaults; no placeholders.`,
      `- Follow current best practices for the chosen stack (types, error handling, accessibility).`,
      `- Explain key decisions briefly; keep prose tight and code complete.`,
      `- If requirements are ambiguous, state assumptions explicitly, then proceed.`,
      outStyle === "Step-by-Step" ? `- Structure the answer as numbered implementation steps with code per step.` : null,
      outStyle === "Diff / Patch" ? `- Show changes as diffs/patches against the described starting point.` : null,
    ].filter((x) => x !== null).join("\n");
    generatePrompt(brief, { setPrompt, setBusy, setErr });
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5">
        <Field label="What should the AI build / fix?">
          <textarea value={task} onChange={(e) => setTask(e.target.value)} rows={3} placeholder="e.g. Add JWT auth with refresh tokens to my Express API…" className={inputCls} />
        </Field>
      </div>
      <OptionSection title="🧰 Language / Framework (multi-select)">{CODE_LANGS.map((l) => <Chip key={l} active={langs.includes(l)} onClick={() => toggle(langs, setLangs, l)}>{l}</Chip>)}</OptionSection>
      <OptionSection title="🎯 Use case">{CODE_USECASES.map((x) => <Chip key={x} active={usecase === x} onClick={() => setUsecase(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🖥️ Website type (optional)">{WEBSITE_TYPES.map((x) => <Chip key={x} active={site === x} onClick={() => setSite(site === x ? null : x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🎨 UI/UX style (optional)">{DESIGN_STYLES.map((x) => <Chip key={x} active={style === x} onClick={() => setStyle(style === x ? null : x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="📊 Complexity">{COMPLEXITY.map((x) => <Chip key={x} active={complexity === x} onClick={() => setComplexity(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="📝 Output style">{CODE_OUTPUT_STYLES.map((x) => <Chip key={x} active={outStyle === x} onClick={() => setOutStyle(x)}>{x}</Chip>)}</OptionSection>
      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy}>{busy ? "💻 Writing with AI…" : "💻 Generate Coding Prompt"}</Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy} />
    </div>
  );
}

// ================= VIBE CODING =================
export function VibeMode() {
  const [idea, setIdea] = useState("");
  const [platform, setPlatform] = useSingle(VIBE_PLATFORMS[0]);
  const [ptype, setPtype] = useSingle(PROJECT_TYPES[0]);
  const [stack, setStack] = useSingle(TECH_STACKS[0]);
  const [design, setDesign] = useSingle(DESIGN_STYLES[0]);
  const [features, setFeatures] = useState<string[]>(["Auth", "Database"]);
  const [colors, setColors] = useSingle(COLOR_SCHEMES[0]);
  const [notes, setNotes] = useState("");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const toggle = (v: string) => setFeatures((f) => f.includes(v) ? f.filter((x) => x !== v) : [...f, v]);

  const generate = () => {
    const brief = [
      `# VIBE CODING BRIEF — for ${platform}`,
      ``,
      `**App idea:** ${idea || "(describe your app above)"}`,
      `**Project type:** ${ptype}`,
      `**Tech stack:** ${stack}`,
      `**Design style:** ${design} · **Color scheme:** ${colors}`,
      `**Features:** ${features.join(", ") || "—"}`,
      notes ? `**Notes:** ${notes}` : null,
      ``,
      `## Build instructions`,
      `You are an expert ${platform} builder. Create a complete, working ${ptype.toLowerCase()} app from this brief.`,
      `- Start with project setup, then build page by page / screen by screen.`,
      `- Every feature listed must actually work — no mock data, no TODO placeholders.`,
      `- Design: ${design} style with a ${colors} palette. Make it responsive (mobile + desktop) and polished.`,
      `- Explain what you built after each major step, then continue until the app is complete and runnable.`,
      `- Finish with how to run/deploy it.`,
    ].filter((x) => x !== null).join("\n");
    generatePrompt(brief, { setPrompt, setBusy, setErr });
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5">
        <Field label="Your app idea">
          <textarea value={idea} onChange={(e) => setIdea(e.target.value)} rows={3} placeholder="e.g. A booking app for barbershops with reminders…" className={inputCls} />
        </Field>
      </div>
      <OptionSection title="🤖 AI platform">{VIBE_PLATFORMS.map((x) => <Chip key={x} active={platform === x} onClick={() => setPlatform(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="📁 Project type">{PROJECT_TYPES.map((x) => <Chip key={x} active={ptype === x} onClick={() => setPtype(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🧱 Tech stack">{TECH_STACKS.map((x) => <Chip key={x} active={stack === x} onClick={() => setStack(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🎨 Design style">{DESIGN_STYLES.map((x) => <Chip key={x} active={design === x} onClick={() => setDesign(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="✨ Features (multi-select)">{VIBE_FEATURES.map((x) => <Chip key={x} active={features.includes(x)} onClick={() => toggle(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🌈 Color scheme">{COLOR_SCHEMES.map((x) => <Chip key={x} active={colors === x} onClick={() => setColors(x)}>{x}</Chip>)}</OptionSection>
      <div className="liquid rounded-2xl p-4 md:p-5">
        <Field label="Extra notes (optional)">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Anything else…" className={inputCls} />
        </Field>
      </div>
      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy}>{busy ? "🎨 Writing with AI…" : "🎨 Generate Vibe Prompt"}</Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy} />
    </div>
  );
}
