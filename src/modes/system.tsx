import { useState } from "react";
import { Chip, OptionSection, Field, inputCls, PromptOutput, StickyBar, Button, Switch, generatePrompt } from "../components/chrome";
import { AUDIENCES, SYS_APP_TYPES, SYS_SURFACES, SYS_TONES, SYS_OUTPUT_FORMATS, SYS_TOOLS } from "../data/options";
import { buildSystemPrompt } from "../lib/systemPrompt";

function useSingle<T>(initial: T) {
  const [v, setV] = useState<T>(initial);
  return [v, setV] as const;
}

// ================= SYSTEM PROMPT BUILDER =================
export function SystemPromptMode() {
  const [appName, setAppName] = useState("");
  const [appType, setAppType] = useSingle(SYS_APP_TYPES[0]);
  const [surface, setSurface] = useSingle(SYS_SURFACES[0]);
  const [audience, setAudience] = useSingle(AUDIENCES[0]);
  const [tone, setTone] = useSingle(SYS_TONES[0]);
  const [tools, setTools] = useState<string[]>(["Web search"]);
  const [extraTools, setExtraTools] = useState("");
  const [memory, setMemory] = useState(true);
  const [format, setFormat] = useSingle(SYS_OUTPUT_FORMATS[0]);
  const [neverDo, setNeverDo] = useState("");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const toggleTool = (v: string) =>
    setTools((t) => (t.includes(v) ? t.filter((x) => x !== v) : [...t, v]));

  const generate = () => {
    const extra = extraTools.split(",").map((s) => s.trim()).filter(Boolean);
    const assembled = buildSystemPrompt({
      appName, appType, surface, audience, tone,
      tools: [...tools, ...extra],
      memory, outputFormat: format, neverDo,
    });
    generatePrompt(assembled, { setPrompt, setBusy, setErr });
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5">
        <Field label="App / bot name">
          <input value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="e.g. ShweShop Assistant, PyKhit Tutor…" className={inputCls} />
        </Field>
        <p className="mt-2 text-xs text-zinc-500">
          Builds a complete, ready-to-paste system prompt — identity, tone, {memory ? "memory, " : ""}tools, output format, a good/bad example pair and limits — from the Funapp template structure.
        </p>
      </div>

      <OptionSection title="🤖 App type" defaultOpen>{SYS_APP_TYPES.map((x) => <Chip key={x} active={appType === x} onClick={() => setAppType(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="📱 Where it runs">{SYS_SURFACES.map((x) => <Chip key={x} active={surface === x} onClick={() => setSurface(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="👥 Target audience">{AUDIENCES.map((x) => <Chip key={x} active={audience === x} onClick={() => setAudience(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🎭 Tone">{SYS_TONES.map((x) => <Chip key={x} active={tone === x} onClick={() => setTone(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🧰 Tools the agent can use (multi-select)">{SYS_TOOLS.map((x) => <Chip key={x} active={tools.includes(x)} onClick={() => toggleTool(x)}>{x}</Chip>)}</OptionSection>

      <div className="liquid rounded-2xl p-4 md:p-5 grid gap-4">
        <Field label="Other tools (optional, comma-separated)">
          <input value={extraTools} onChange={(e) => setExtraTools(e.target.value)} placeholder="e.g. Delivery tracker, Loyalty points" className={inputCls} />
        </Field>
        <Field label="Must never do (optional)">
          <input value={neverDo} onChange={(e) => setNeverDo(e.target.value)} placeholder="e.g. promise a delivery date before checking stock" className={inputCls} />
        </Field>
        <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
          <Switch checked={memory} onCheckedChange={setMemory} />
          Memory — remember users across conversations
        </label>
        <p className="text-xs text-zinc-500 -mt-2">Adds a memory section: what to file, where to file it, how to phrase it by certainty, and a strict never-file-secrets rule.</p>
      </div>

      <OptionSection title="📄 Output format">{SYS_OUTPUT_FORMATS.map((x) => <Chip key={x} active={format === x} onClick={() => setFormat(x)}>{x}</Chip>)}</OptionSection>

      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy}>{busy ? "🧩 Writing with AI…" : "🧩 Generate System Prompt"}</Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy} />
    </div>
  );
}
