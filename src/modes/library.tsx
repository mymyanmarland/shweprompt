import { useMemo, useState } from "react";
import { Chip, Field, inputCls, PromptOutput, Button, generatePrompt } from "../components/chrome";
import { READY_MADE, TEXT_DESIGN, TEXT_CATEGORIES, RM_CATEGORIES } from "../data/templates";

// ================= READY-MADE CODING PROMPTS =================
export function LibraryMode() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return READY_MADE.filter((t) =>
      (!cat || t.category === cat) &&
      (!needle || t.title.toLowerCase().includes(needle) || t.prompt.toLowerCase().includes(needle))
    );
  }, [q, cat]);

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Field label={`Search ${READY_MADE.length} templates`}>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. marketplace, fitness, booking…" className={inputCls} />
            </Field>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Chip active={cat === null} onClick={() => setCat(null)}>All</Chip>
          {RM_CATEGORIES.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(cat === c ? null : c)}>{c}</Chip>)}
        </div>
        <p className="text-xs text-zinc-500 mt-3">{list.length} templates</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {list.map((t) => (
          <div key={t.id} className="liquid rounded-2xl p-4 flex flex-col">
            <div className="text-[11px] text-cyan-300 font-bold uppercase tracking-wider">{t.category}</div>
            <div className="font-bold mt-1 mb-2">{t.title}</div>
            <p className="text-xs text-zinc-500 flex-1 line-clamp-3">{t.prompt}</p>
            <Button variant="secondary" size="sm" className="mt-3" onClick={() => setPrompt(`# READY-MADE PROJECT PROMPT — ${t.title}\n\n${t.prompt}`)}>📋 Use this prompt</Button>
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="text-zinc-500 text-center py-8">No templates match. Try another search.</p>}

      <PromptOutput prompt={prompt} />
    </div>
  );
}

// ================= TEXT DESIGN PROMPTS =================
export function TextDesignMode() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [word, setWord] = useState("SHWE");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return TEXT_DESIGN.filter((t) =>
      (!cat || t.category === cat) &&
      (!needle || t.title.toLowerCase().includes(needle) || t.prompt.toLowerCase().includes(needle))
    );
  }, [q, cat]);

  const useTemplate = (tpl: (typeof TEXT_DESIGN)[number]) => {
    const brief = [
      `# TEXT DESIGN PROMPT — ${tpl.title}`,
      ``,
      `Render the word "${word || "(YOUR WORD)"}" as:`,
      tpl.prompt + ".",
      ``,
      `Center the word, fill the frame, no watermark, no extra text.`,
    ].join("\n");
    generatePrompt(brief, { setPrompt, setBusy, setErr });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5">
        <div className="grid md:grid-cols-2 gap-3">
          <Field label={`Search ${TEXT_DESIGN.length} styles`}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. neon, gold, graffiti…" className={inputCls} />
          </Field>
          <Field label="Your word">
            <input value={word} onChange={(e) => setWord(e.target.value)} placeholder="SHWE" className={inputCls} />
          </Field>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Chip active={cat === null} onClick={() => setCat(null)}>All</Chip>
          {TEXT_CATEGORIES.map((c) => <Chip key={c} active={cat === c} onClick={() => setCat(cat === c ? null : c)}>{c}</Chip>)}
        </div>
        <p className="text-xs text-zinc-500 mt-3">{list.length} styles</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
        {list.map((t) => (
          <div key={t.id} className="liquid rounded-2xl p-4 flex flex-col">
            <div className="text-[11px] text-pink-300 font-bold uppercase tracking-wider">{t.category}</div>
            <div className="font-bold mt-1">{t.title}</div>
            <div className="grad-text font-extrabold text-2xl my-2 tracking-wide">{t.example}</div>
            <p className="text-xs text-zinc-500 flex-1 line-clamp-2">{t.prompt}</p>
            <Button variant="secondary" size="sm" className="mt-3" onClick={() => useTemplate(t)} disabled={busy}>{busy ? "✨ Writing…" : "✨ Use this style"}</Button>
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="text-zinc-500 text-center py-8">No styles match. Try another search.</p>}

      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <PromptOutput prompt={prompt} busy={busy} />
    </div>
  );
}
