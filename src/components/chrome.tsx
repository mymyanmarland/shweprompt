import { createContext, memo, useContext, useEffect, useState, type ReactNode } from "react";
import {
  Sparkles, KeyRound, Bot, Copy, Check, Rocket, Loader2, TriangleAlert,
  Lightbulb, Search, Clock3, Wand2, Code2, Palette, Package,
  Type, Clapperboard, Film, Crown, Image as ImageIcon, ScanSearch, Globe,
  ArrowUpRight, ScrollText,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input, Textarea, Label } from "./ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "./ui/dialog";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { Separator } from "./ui/controls";
import { cn } from "../lib/utils";
import {
  RELAY_MODELS, getApiKey, setApiKey, getModel, setModel,
  chatCompletion, friendlyError, fetchTicker, type TickerItem,
} from "../lib/api";

// ---------- app state ----------
interface AppState {
  apiKey: string; setApiKeyState: (v: string) => void;
  model: string; setModelState: (v: string) => void;
  keyOpen: boolean; setKeyOpen: (v: boolean) => void;
  modelOpen: boolean; setModelOpen: (v: boolean) => void;
  needKey: () => boolean;
}
const Ctx = createContext<AppState>(null as unknown as AppState);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }: { children: ReactNode }) {
  const [apiKey, setApiKeyState] = useState(getApiKey());
  const [model, setModelState] = useState(getModel());
  const [keyOpen, setKeyOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const saveKey = (v: string) => { setApiKey(v); setApiKeyState(v); };
  const saveModel = (id: string) => { setModel(id); setModelState(id); };
  return (
    <Ctx.Provider value={{ apiKey, setApiKeyState: saveKey, model, setModelState: saveModel, keyOpen, setKeyOpen, modelOpen, setModelOpen, needKey: () => { if (!apiKey) { setKeyOpen(true); return true; } return false; } }}>
      {children}
      <KeyModal /> <ModelModal />
    </Ctx.Provider>
  );
}

// ---------- animated header art: typing prompt card (JS typewriter, memo-isolated) ----------
const TYPE_PHRASES = [
  "a dreamy castle above the clouds, golden hour…",
  "minimal logo for a coffee brand, elegant…",
  "portrait of a robot painter, cinematic light…",
];

const Typewriter = memo(function Typewriter() {
  const [out, setOut] = useState("");
  useEffect(() => {
    let pi = 0, ci = 0, mode: "type" | "hold" | "del" = "type";
    let t = 0, alive = true;
    const step = () => {
      if (!alive) return;
      const ph = TYPE_PHRASES[pi];
      if (mode === "type") {
        ci += 1;
        setOut(ph.slice(0, ci));
        if (ci >= ph.length) { mode = "hold"; t = window.setTimeout(step, 2300); }
        else t = window.setTimeout(step, 60);
      } else if (mode === "hold") {
        mode = "del";
        t = window.setTimeout(step, 250);
      } else {
        ci -= 4;
        if (ci <= 0) {
          setOut(""); ci = 0; mode = "type"; pi = (pi + 1) % TYPE_PHRASES.length;
          t = window.setTimeout(step, 650);
        } else {
          setOut(ph.slice(0, ci));
          t = window.setTimeout(step, 16);
        }
      }
    };
    t = window.setTimeout(step, 700);
    return () => { alive = false; clearTimeout(t); };
  }, []);
  return (
    <span className="htype-text">{out}<span className="htype-caret" /></span>
  );
});

function HeaderArt() {
  return (
    <div className="htype-card" aria-hidden="true">
      <span className="htype-star">✦</span>
      <Typewriter />
      <span className="htype-tw" style={{ top: -8, left: 60, animationDelay: "0s" }}>✦</span>
      <span className="htype-tw" style={{ top: -10, right: 90, animationDelay: "1.1s" }}>✦</span>
      <span className="htype-tw" style={{ bottom: -8, left: 180, animationDelay: "2s" }}>✦</span>
      <span className="htype-tw" style={{ bottom: -9, right: 40, animationDelay: "0.6s" }}>✦</span>
    </div>
  );
}

// ---------- header ----------
// ---------- header ----------
// ---------- header ----------
// ---------- header ----------
// ---------- header ----------
export function Header() {
  const { apiKey, model, setKeyOpen, setModelOpen } = useApp();
  const [now, setNow] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);
  const modelLabel = RELAY_MODELS.find((m) => m.id === model)?.label || "Model";
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0817]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="ShwePrompt logo" className="size-9 rounded-xl shadow-[0_6px_16px_-6px_rgba(139,92,246,0.8)]" />
          <div className="leading-none">
            <div className="text-[15px] font-bold tracking-tight text-white">SHWE<span className="grad-text">PROMPT</span></div>
            <div className="text-[9px] font-semibold tracking-[0.28em] text-zinc-500">PROMPT STUDIO</div>
          </div>
        </div>
        <div className="flex-1 md:hidden" />
        <div className="hidden min-w-0 flex-1 items-center justify-center px-1 md:flex">
          <HeaderArt />
        </div>
        <div className="hidden items-center gap-1.5 text-xs tabular-nums text-zinc-500 md:flex">
          <Clock3 className="size-3.5" />
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>
        <Button variant="secondary" size="sm" onClick={() => setModelOpen(true)} className="gap-1.5 px-2.5 sm:px-3">
          <Bot className="size-3.5" /><span className="hidden max-w-28 truncate min-[420px]:inline">{modelLabel}</span>
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setKeyOpen(true)} className={cn("gap-1.5 px-2.5 sm:px-3", !apiKey && "pulse-glow border-violet-400/60")}>
          <KeyRound className="size-3.5" /><span className="hidden min-[420px]:inline">{apiKey ? "Key set" : "Add key"}</span>
        </Button>
      </div>
    </header>
  );
}

// ---------- ticker ----------
export function Ticker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  useEffect(() => {
    let live = true;
    const load = async () => { try { const t = await fetchTicker(); if (live) setItems(t); } catch { /* silent */ } };
    load();
    const i = setInterval(load, 120000);
    return () => { live = false; clearInterval(i); };
  }, []);
  if (!items.length) return null;
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-white/[0.07] bg-black/40">
      <div className="ticker-track flex w-max whitespace-nowrap py-1.5">
        {row.map((t, i) => (
          <span key={i} className="mx-4 text-[11px] tabular-nums">
            <span className="font-semibold text-zinc-400">{t.symbol}</span>{" "}
            <span className="text-zinc-200">${t.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>{" "}
            <span className={t.change >= 0 ? "text-emerald-400" : "text-rose-400"}>
              {t.change >= 0 ? "▲" : "▼"} {Math.abs(t.change).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------- mode navigation (grid launcher + dropdown) ----------
export interface ModeDef { id: string; icon: ReactNode; label: string; desc: string; }
export const MODES: ModeDef[] = [
  { id: "general", icon: <Sparkles className="size-5" />, label: "General", desc: "Build structured prompts from any idea" },
  { id: "refine", icon: <Wand2 className="size-5" />, label: "Refine", desc: "Turn rough prompts into expert ones" },
  { id: "coding", icon: <Code2 className="size-5" />, label: "Coding", desc: "Prompts for building & fixing code" },
  { id: "vibe", icon: <Palette className="size-5" />, label: "Vibe", desc: "Full app briefs for AI builders" },
  { id: "system", icon: <ScrollText className="size-5" />, label: "System Prompt", desc: "Build a full system prompt for a bot or agent" },
  { id: "library", icon: <Package className="size-5" />, label: "Ready-Made", desc: "112 ready-made project prompts" },
  { id: "textdesign", icon: <Type className="size-5" />, label: "Text Design", desc: "63 text-effect styles for image AI" },
  { id: "video-mm", icon: <Clapperboard className="size-5" />, label: "Video MM", desc: "Veo-optimized video prompts (Myanmar)" },
  { id: "video-en", icon: <Film className="size-5" />, label: "Video EN", desc: "Full-spec video prompts (English)" },
  { id: "logo", icon: <Crown className="size-5" />, label: "Logo", desc: "Logo design briefs" },
  { id: "image", icon: <ImageIcon className="size-5" />, label: "Image", desc: "Detailed image-generation prompts" },
  { id: "img2prompt", icon: <ScanSearch className="size-5" />, label: "Img\u2192Prompt", desc: "Reverse any image into a prompt" },
  { id: "webart", icon: <Globe className="size-5" />, label: "Web Art", desc: "Code-art prompts + generation" },
  { id: "chat", icon: <Bot className="size-5" />, label: "AI Chat", desc: "Talk to the AI directly" },
];

/** Home launcher: grid of mode cards with search */
export function ModeGrid({ onPick }: { onPick: (id: string) => void }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();
  const list = MODES.filter((m) => !needle || m.label.toLowerCase().includes(needle) || m.desc.toLowerCase().includes(needle));
  return (
    <div>
      <div className="relative mx-auto mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search modes…" className="pl-10" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {list.map((m) => (
          <button
            key={m.id}
            onClick={() => onPick(m.id)}
            className="liquid relative group cursor-pointer rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_20px_45px_-15px_rgba(139,92,246,0.5)]"
          >
            <div className="mb-3 flex items-start justify-between">
              <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-b from-violet-500 to-fuchsia-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_20px_-8px_rgba(139,92,246,0.9)]">
                {m.icon}
              </span>
              <ArrowUpRight className="size-4 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-violet-300" />
            </div>
            <div className="text-[15px] font-bold text-white">{m.label}</div>
            <div className="mt-0.5 text-xs leading-relaxed text-zinc-500">{m.desc}</div>
          </button>
        ))}
      </div>
      {list.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">No modes match.</p>}
    </div>
  );
}

// ---------- form primitives (same API as before, new look) ----------
export function Chip({ active, onClick, children }: { active?: boolean; onClick: () => void; children: ReactNode }) {
  return <Badge variant={active ? "active" : "default"} onClick={onClick}>{children}</Badge>;
}

export function OptionSection({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? "s" : undefined} className="w-full">
      <AccordionItem value="s">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-1.5">{children}</div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export const inputCls = "field";

/** Floating sticky action bar for the mode's primary action */
export function StickyBar({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-4 z-20 mt-2 flex justify-center">
      <div className="liquid relative flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-2 rounded-2xl px-3 py-2.5">
        {children}
      </div>
    </div>
  );
}

// ---------- key modal ----------
function KeyModal() {
  const { keyOpen, setKeyOpen, apiKey, setApiKeyState } = useApp();
  const [val, setVal] = useState(apiKey);
  useEffect(() => { if (keyOpen) setVal(apiKey); }, [keyOpen, apiKey]);
  return (
    <Dialog open={keyOpen} onOpenChange={setKeyOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><KeyRound className="size-4 text-violet-300" /> RelayModels API Key</DialogTitle>
          <DialogDescription>
            Paste your key below. It is stored <span className="text-zinc-200 font-medium">only in this browser</span> and
            never sent anywhere except the RelayModels API.
          </DialogDescription>
        </DialogHeader>
        <Input type="password" value={val} onChange={(e) => setVal(e.target.value)} placeholder="sk-…" />
        <div className="flex gap-2">
          <Button className="flex-1" onClick={() => { setApiKeyState(val.trim()); setKeyOpen(false); }}>Save key</Button>
          {apiKey && <Button variant="secondary" onClick={() => { setApiKeyState(""); setKeyOpen(false); }}>Remove</Button>}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------- model modal ----------
function ModelModal() {
  const { modelOpen, setModelOpen, model, setModelState } = useApp();
  const tiers = [["fast", "Fast"], ["balanced", "Balanced"], ["powerful", "Powerful"]] as const;
  return (
    <Dialog open={modelOpen} onOpenChange={setModelOpen}>
      <DialogContent className="max-w-lg max-h-[82vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Bot className="size-4 text-violet-300" /> Choose model</DialogTitle>
          <DialogDescription>Models available on your RelayModels relay.</DialogDescription>
        </DialogHeader>
        {tiers.map(([tier, label]) => (
          <div key={tier}>
            <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">{label}</div>
            <div className="grid gap-1.5">
              {RELAY_MODELS.filter((m) => m.tier === tier).map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setModelState(m.id); setModelOpen(false); }}
                  className={cn(
                    "rounded-xl border px-3.5 py-2.5 text-left transition-all cursor-pointer",
                    model === m.id
                      ? "border-violet-400/60 bg-violet-500/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                  )}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    {m.label}
                    {m.vision && <span className="text-[10px] font-medium text-cyan-300 border border-cyan-400/30 rounded-full px-1.5 py-px">vision</span>}
                    {model === m.id && <Check className="ml-auto size-4 text-violet-300" />}
                  </div>
                  <div className="truncate font-mono text-[11px] text-zinc-500">{m.id}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}

// ---------- prompt output ----------
// Shared AI prompt writer: key present → AI writes the prompt from the brief;
// no key (or AI error) → falls back to the locally assembled brief.
export const AI_WRITER_SYSTEM =
  "You are an elite prompt engineer. Turn the brief below into a complete, polished, ready-to-use prompt. Output ONLY the prompt itself — no explanations, no preamble, no quotation marks around it.";

export async function generatePrompt(
  brief: string,
  io: { setPrompt: (s: string) => void; setBusy?: (b: boolean) => void; setErr?: (e: string | null) => void }
) {
  if (!getApiKey()) { io.setErr?.(null); io.setPrompt(brief); return; }
  io.setBusy?.(true); io.setErr?.(null);
  try {
    const out = await chatCompletion(
      [
        { role: "system", content: AI_WRITER_SYSTEM },
        { role: "user", content: brief },
      ],
      { maxTokens: 2500 }
    );
    io.setPrompt(out.trim());
  } catch (e) {
    io.setPrompt(brief);
    io.setErr?.(friendlyError(e));
  } finally {
    io.setBusy?.(false);
  }
}

const LOAD_MSGS = [
  "Reading your brief…",
  "Structuring the magic…",
  "Adding pro details…",
  "Polishing the final prompt…",
];

function PromptLoading() {
  return (
    <Card className="write-glow border-violet-400/30">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <svg width="54" height="64" viewBox="-27 -34 54 68" aria-hidden="true" className="shrink-0">
            <g>
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -3; 0 0" dur="2.4s" repeatCount="indefinite" />
              <line x1="0" y1="-21" x2="0" y2="-26.5" stroke="#f0abfc" strokeWidth="2" strokeLinecap="round" />
              <circle cx="0" cy="-29" r="3.1" fill="#f0abfc">
                <animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <path d="M-13,-13 L-18,-26 L-4,-18 Z" fill="#6d28d9" />
              <path d="M13,-13 L18,-26 L4,-18 Z" fill="#6d28d9" />
              <rect x="-15" y="-20" width="30" height="26" rx="11" fill="#8b5cf6" />
              <ellipse cx="-6.5" cy="-9" rx="3.8" ry="4.6" fill="#221f33">
                <animate attributeName="ry" values="4.6;4.6;.6;4.6" keyTimes="0;.88;.94;1" dur="4.6s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="6.5" cy="-9" rx="3.8" ry="4.6" fill="#221f33">
                <animate attributeName="ry" values="4.6;4.6;.6;4.6" keyTimes="0;.88;.94;1" dur="4.6s" begin="0.12s" repeatCount="indefinite" />
              </ellipse>
              <circle cx="-5.2" cy="-10.6" r="1.3" fill="#fff" opacity="0.95" />
              <circle cx="7.8" cy="-10.6" r="1.3" fill="#fff" opacity="0.95" />
              <ellipse cx="-11" cy="-3.5" rx="2.6" ry="1.6" fill="#f0abfc" opacity="0.55" />
              <ellipse cx="11" cy="-3.5" rx="2.6" ry="1.6" fill="#f0abfc" opacity="0.55" />
              <path d="M-4,-1.5 Q0,2 4,-1.5" stroke="#221f33" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <rect x="-10.5" y="8" width="21" height="15" rx="7.5" fill="#8b5cf6" />
              <rect x="-16.5" y="10" width="5" height="10" rx="2.5" fill="#6d28d9" />
              <rect x="11.5" y="10" width="5" height="10" rx="2.5" fill="#6d28d9" />
              <ellipse cx="-6" cy="24.5" rx="4.5" ry="2.8" fill="#6d28d9" />
              <ellipse cx="6" cy="24.5" rx="4.5" ry="2.8" fill="#6d28d9" />
            </g>
          </svg>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-white">AI is writing your prompt</span>
              <span className="flex gap-1" aria-hidden="true"><span className="tdot" /><span className="tdot" /><span className="tdot" /></span>
            </div>
            <div className="relative mt-1 h-5 text-sm text-zinc-400">
              {LOAD_MSGS.map((m, i) => (
                <span key={m} className="load-msg" style={{ animationDelay: `${i * 2}s` }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 space-y-2.5" aria-hidden="true">
          {[100, 94, 98, 82, 90, 65].map((w, i) => (
            <div key={i} className="skel" style={{ width: `${w}%`, animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PromptOutput({ prompt, busy = false, executeLabel = "Generate + Execute" }: { prompt: string; busy?: boolean; executeLabel?: string }) {
  const { needKey } = useApp();
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setResult(null); setError(null); setCopied(false); }, [prompt]);
  if (busy) return <PromptLoading />;
  if (!prompt) return null;

  const copy = async () => {
    try { await navigator.clipboard.writeText(prompt); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = prompt; document.body.appendChild(ta); ta.select();
      document.execCommand("copy"); ta.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  const execute = async () => {
    if (needKey()) return;
    setRunning(true); setError(null); setResult(null);
    try {
      const out = await chatCompletion([
        { role: "system", content: "You are a helpful AI assistant. Answer the user's request directly and well." },
        { role: "user", content: prompt },
      ]);
      setResult(out);
    } catch (e) { setError(friendlyError(e)); }
    finally { setRunning(false); }
  };

  return (
    <Card className="border-violet-400/25">
      <CardHeader className="flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="flex items-center gap-2"><Sparkles className="size-4 text-violet-300" /> Generated prompt</CardTitle>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={copy}>
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />} {copied ? "Copied" : "Copy"}
          </Button>
          <Button size="sm" onClick={execute} disabled={running}>
            {running ? <Loader2 className="size-3.5 animate-spin" /> : <Rocket className="size-3.5" />}
            {running ? "Running…" : executeLabel}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="prompt-out max-h-80 overflow-y-auto rounded-xl bg-black/45 p-4 text-[13px] leading-relaxed text-zinc-200 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">{prompt}</pre>
        {error && (
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-[13px] text-rose-200">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" /> {error}
          </div>
        )}
        {result && (
          <div className="mt-4">
            <Separator className="mb-3" />
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white"><Bot className="size-4 text-cyan-300" /> AI response</div>
            <pre className="prompt-out max-h-[28rem] overflow-y-auto rounded-xl bg-black/45 p-4 text-[13px] leading-relaxed text-zinc-200 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------- guide bot ----------
const FAQS = [
  { q: "How do I use this studio?", a: "Pick a mode from the tab bar, fill in the options, hit Generate to build a prompt, then Copy it — or Generate + Execute to run it through the AI right here." },
  { q: "How do I add my API key?", a: "Click the key button (top-right) and paste your RelayModels key. It stays in your browser only — never on any server." },
  { q: "Generate vs Generate + Execute?", a: "Generate builds the prompt text for you to copy into any AI. Generate + Execute also sends it to the AI immediately and shows the answer." },
  { q: "Which model should I pick?", a: "Fast models answer quickly; Powerful models (Sonnet 5, Opus 5.5) reason better for hard tasks. Change anytime with the model button." },
];

export function GuideBot() {
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <Card className="w-80 p-4">
          <CardTitle className="mb-2 flex items-center gap-2 text-sm"><Lightbulb className="size-4 text-amber-300" /> Guide</CardTitle>
          <div className="grid gap-1.5">
            {FAQS.map((f, i) => (
              <div key={i}>
                <button onClick={() => setFaq(faq === i ? null : i)}
                  className="w-full rounded-lg px-2 py-1.5 text-left text-[13px] font-medium text-violet-200 hover:bg-white/[0.06] cursor-pointer">
                  {f.q}
                </button>
                {faq === i && <p className="px-2 pb-1 text-xs leading-relaxed text-zinc-400">{f.a}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
      <Button size="icon" onClick={() => setOpen(!open)} className="!h-12 !w-12 !rounded-full pulse-glow" aria-label="Help">
        <Lightbulb className="size-5" />
      </Button>
    </div>
  );
}

// re-export primitives used by modes
export { Input, Textarea, Label, Button, Badge };
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
export { Slider, Switch } from "./ui/controls";
