import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Chip, OptionSection, Field, inputCls, PromptOutput, useApp, StickyBar, Button, generatePrompt, AI_WRITER_SYSTEM, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Slider, Switch } from "../components/chrome";
import { chatCompletion, friendlyError, generateImage, RELAY_MODELS } from "../lib/api";
import {
  VIDEO_TYPES_MM, VIDEO_TYPES_EN, VISUAL_STYLES, VISUAL_STYLES_EN, CAMERA_MOVES,
  DURATIONS, ASPECTS, MOODS, LIGHTING, COLOR_GRADING, TRANSITIONS, SOUND_DESIGN,
  LOGO_STYLES, INDUSTRIES, LOGO_COLORS, TYPO_STYLES, ICON_TYPES,
  IMAGE_STYLES, IMAGE_TYPES, CAMERA_ANGLES,
  WEBART_STYLES, PALETTES, WEBART_SIZES,
} from "../data/options";

// ================= VIDEO =================
export function VideoMode({ lang }: { lang: "mm" | "en" }) {
  const isMM = lang === "mm";
  const types = isMM ? VIDEO_TYPES_MM : VIDEO_TYPES_EN;
  const styles = isMM ? VISUAL_STYLES : VISUAL_STYLES_EN;
  const [type, setType] = useState(types[0]);
  const [style, setStyle] = useState(styles[1]);
  const [cam, setCam] = useState(CAMERA_MOVES[0]);
  const [dur, setDur] = useState(DURATIONS[2]);
  const [aspect, setAspect] = useState(ASPECTS[0]);
  const [mood, setMood] = useState(isMM ? "" : MOODS[0]);
  const [light, setLight] = useState(isMM ? "" : LIGHTING[0]);
  const [grade, setGrade] = useState(isMM ? "" : COLOR_GRADING[0]);
  const [trans, setTrans] = useState(isMM ? "" : TRANSITIONS[0]);
  const [sound, setSound] = useState(isMM ? "" : SOUND_DESIGN[0]);
  const [dialogue, setDialogue] = useState("");
  const [scene, setScene] = useState("");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const one = (v: string, cur: string, set: (x: string) => void) => set(cur === v ? "" : v);

  const generate = () => {
    const brief = [
      `# VIDEO PROMPT — ${type}${isMM ? " (Myanmar, Veo 3.1 optimized)" : ""}`,
      ``,
      `**Scene:** ${scene || "(describe the scene above)"}`,
      `**Visual style:** ${style}`,
      `**Camera:** ${cam}`,
      `**Duration:** ${dur} · **Aspect ratio:** ${aspect}`,
      !isMM ? `**Mood:** ${mood || "—"} · **Lighting:** ${light || "—"} · **Color grade:** ${grade || "—"}` : null,
      !isMM ? `**Transitions:** ${trans || "—"} · **Sound:** ${sound || "—"}` : null,
      dialogue ? `**Dialogue${isMM ? " (Myanmar)" : ""}:** "${dialogue}"` : null,
      ``,
      `Render as a detailed video-generation prompt: shot list, timing, camera direction, lighting notes, and audio cues. Keep it under 300 words, production-ready.`,
    ].filter((x) => x !== null).join("\n");
    generatePrompt(brief, { setPrompt, setBusy, setErr });
  };

  return (
    <div className="grid gap-4">
      {isMM && <div className="liquid rounded-2xl p-3 text-sm text-center">🇲🇲 <b>Veo 3.1 Optimized</b> · Myanmar Language</div>}
      <div className="liquid rounded-2xl p-4 md:p-5 grid md:grid-cols-2 gap-3">
        <Field label="Scene description">
          <textarea value={scene} onChange={(e) => setScene(e.target.value)} rows={3} placeholder="What happens in the video…" className={inputCls} />
        </Field>
        <Field label={isMM ? "Dialogue (Myanmar, optional)" : "Dialogue (optional)"}>
          <textarea value={dialogue} onChange={(e) => setDialogue(e.target.value)} rows={3} placeholder="Spoken lines…" className={inputCls} />
        </Field>
      </div>
      <OptionSection title="🎬 Video type">{types.map((x) => <Chip key={x} active={type === x} onClick={() => setType(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🎨 Visual style">{styles.map((x) => <Chip key={x} active={style === x} onClick={() => setStyle(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="📷 Camera movement">{CAMERA_MOVES.map((x) => <Chip key={x} active={cam === x} onClick={() => setCam(x)}>{x}</Chip>)}</OptionSection>
      <div className="grid md:grid-cols-2 gap-4">
        <OptionSection title="⏱️ Duration">{DURATIONS.map((x) => <Chip key={x} active={dur === x} onClick={() => setDur(x)}>{x}</Chip>)}</OptionSection>
        <OptionSection title="🖥️ Aspect ratio">{ASPECTS.map((x) => <Chip key={x} active={aspect === x} onClick={() => setAspect(x)}>{x}</Chip>)}</OptionSection>
      </div>
      {!isMM && (
        <>
          <OptionSection title="😊 Mood">{MOODS.map((x) => <Chip key={x} active={mood === x} onClick={() => one(x, mood, setMood)}>{x}</Chip>)}</OptionSection>
          <OptionSection title="💡 Lighting">{LIGHTING.map((x) => <Chip key={x} active={light === x} onClick={() => one(x, light, setLight)}>{x}</Chip>)}</OptionSection>
          <OptionSection title="🌈 Color grading">{COLOR_GRADING.map((x) => <Chip key={x} active={grade === x} onClick={() => one(x, grade, setGrade)}>{x}</Chip>)}</OptionSection>
          <OptionSection title="🔀 Transitions">{TRANSITIONS.map((x) => <Chip key={x} active={trans === x} onClick={() => one(x, trans, setTrans)}>{x}</Chip>)}</OptionSection>
          <OptionSection title="🔊 Sound design">{SOUND_DESIGN.map((x) => <Chip key={x} active={sound === x} onClick={() => one(x, sound, setSound)}>{x}</Chip>)}</OptionSection>
        </>
      )}
      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy}>{busy ? "🎬 Writing with AI…" : "🎬 Generate Video Prompt"}</Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy} />
    </div>
  );
}

// ================= LOGO =================
export function LogoMode() {
  const [brand, setBrand] = useState("");
  const [tagline, setTagline] = useState("");
  const [style, setStyle] = useState(LOGO_STYLES[0]);
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [colors, setColors] = useState(LOGO_COLORS[0]);
  const [typo, setTypo] = useState(TYPO_STYLES[0]);
  const [icon, setIcon] = useState(ICON_TYPES[0]);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const generate = () => {
    const brief = [
      `# LOGO PROMPT`,
      ``,
      `Design a logo for **"${brand || "(BRAND NAME)"}"**${tagline ? ` — tagline: "${tagline}"` : ""}.`,
      `**Industry:** ${industry}`,
      `**Style:** ${style}`,
      `**Color scheme:** ${colors}`,
      `**Typography:** ${typo}`,
      `**Icon:** ${icon}`,
      ``,
      `Requirements: vector-style, clean geometry, works at 16px favicon size and on billboards, flat version + one accent gradient version, no photo backgrounds, no watermark. Present 3 distinct concepts with rationale.`,
    ].join("\n");
    generatePrompt(brief, { setPrompt, setBusy, setErr });
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5 grid md:grid-cols-2 gap-3">
        <Field label="Brand name"><input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. ShwePrompt" className={inputCls} /></Field>
        <Field label="Tagline (optional)"><input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Prompt like a pro" className={inputCls} /></Field>
      </div>
      <OptionSection title="👑 Logo style">{LOGO_STYLES.map((x) => <Chip key={x} active={style === x} onClick={() => setStyle(x)}>{x}</Chip>)}</OptionSection>
      <div className="liquid rounded-2xl p-4 md:p-5">
        <Field label="Industry">
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <OptionSection title="🌈 Color scheme">{LOGO_COLORS.map((x) => <Chip key={x} active={colors === x} onClick={() => setColors(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🔤 Typography">{TYPO_STYLES.map((x) => <Chip key={x} active={typo === x} onClick={() => setTypo(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="⭐ Icon type">{ICON_TYPES.map((x) => <Chip key={x} active={icon === x} onClick={() => setIcon(x)}>{x}</Chip>)}</OptionSection>
      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy}>{busy ? "👑 Writing with AI…" : "👑 Generate Logo Prompt"}</Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy} />
    </div>
  );
}

// ================= IMAGE =================
const ASPECT_SIZES: Record<string, string> = {
  "16:9": "1536x1024",
  "9:16": "1024x1536",
  "1:1": "1024x1024",
  "4:3": "1024x1024",
  "21:9": "1536x1024",
};

export function ImageMode() {
  const { needKey } = useApp();
  const [subject, setSubject] = useState("");
  const [style, setStyle] = useState(IMAGE_STYLES[0]);
  const [type, setType] = useState(IMAGE_TYPES[0]);
  const [light, setLight] = useState(LIGHTING[0]);
  const [angle, setAngle] = useState(CAMERA_ANGLES[0]);
  const [aspect, setAspect] = useState(ASPECTS[0]);
  const [details, setDetails] = useState("");
  const [negative, setNegative] = useState("blurry, watermark, text artifacts, deformed hands");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgBusy, setImgBusy] = useState(false);
  const [imgErr, setImgErr] = useState<string | null>(null);

  const buildBrief = () => [
    `# IMAGE PROMPT`,
    ``,
    `${style} ${type.toLowerCase()} of ${subject || "(describe your subject above)"}.`,
    `${light} lighting, ${angle.toLowerCase()} camera angle.`,
    details ? `Details: ${details}.` : null,
    `Aspect ratio ${aspect}. Ultra-detailed, sharp focus, professional composition.`,
    ``,
    `Negative prompt: ${negative}`,
  ].filter((x) => x !== null).join("\n");

  const generate = () => {
    setImgSrc(null); setImgErr(null);
    generatePrompt(buildBrief(), { setPrompt, setBusy, setErr });
  };

  const renderImage = async (text: string) => {
    const img = await generateImage(text, ASPECT_SIZES[aspect] || "1024x1024");
    setImgSrc(img.b64 ? `data:image/png;base64,${img.b64}` : (img.url as string));
  };

  // AI writes the prompt, then gpt-image-2 renders it — one tap.
  const generateAndImage = async () => {
    if (needKey()) return;
    setBusy(true); setImgBusy(true);
    setErr(null); setImgErr(null); setImgSrc(null); setPrompt("");
    try {
      const text = (await chatCompletion(
        [
          { role: "system", content: AI_WRITER_SYSTEM },
          { role: "user", content: buildBrief() },
        ],
        { maxTokens: 2500 }
      )).trim();
      setPrompt(text);
      setBusy(false);
      await renderImage(text);
    } catch (e) { setImgErr(friendlyError(e)); }
    finally { setBusy(false); setImgBusy(false); }
  };

  // Render the currently shown prompt (no prompt rewrite).
  const renderFromPrompt = async () => {
    if (!prompt || needKey()) return;
    setImgBusy(true); setImgErr(null); setImgSrc(null);
    try { await renderImage(prompt); }
    catch (e) { setImgErr(friendlyError(e)); }
    finally { setImgBusy(false); }
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5 grid md:grid-cols-2 gap-3">
        <Field label="Subject">
          <textarea value={subject} onChange={(e) => setSubject(e.target.value)} rows={3} placeholder="e.g. A blue robot holding a golden key in a neon workshop…" className={inputCls} />
        </Field>
        <div className="grid gap-3">
          <Field label="Extra details (optional)">
            <input value={details} onChange={(e) => setDetails(e.target.value)} placeholder="e.g. rain reflections, night…" className={inputCls} />
          </Field>
          <Field label="Negative prompt">
            <input value={negative} onChange={(e) => setNegative(e.target.value)} className={inputCls} />
          </Field>
        </div>
      </div>
      <OptionSection title="🎨 Art style">{IMAGE_STYLES.map((x) => <Chip key={x} active={style === x} onClick={() => setStyle(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="🖼️ Image type">{IMAGE_TYPES.map((x) => <Chip key={x} active={type === x} onClick={() => setType(x)}>{x}</Chip>)}</OptionSection>
      <OptionSection title="💡 Lighting">{LIGHTING.map((x) => <Chip key={x} active={light === x} onClick={() => setLight(x)}>{x}</Chip>)}</OptionSection>
      <div className="grid md:grid-cols-2 gap-4">
        <OptionSection title="📷 Camera angle">{CAMERA_ANGLES.map((x) => <Chip key={x} active={angle === x} onClick={() => setAngle(x)}>{x}</Chip>)}</OptionSection>
        <OptionSection title="🖥️ Aspect ratio">{ASPECTS.map((x) => <Chip key={x} active={aspect === x} onClick={() => setAspect(x)}>{x}</Chip>)}</OptionSection>
      </div>
      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy || imgBusy}>{busy && !imgBusy ? "🖼️ Writing with AI…" : "🖼️ Generate Image Prompt"}</Button>
        <Button size="lg" variant="secondary" onClick={generateAndImage} disabled={busy || imgBusy}>
          {imgBusy ? <><Loader2 className="size-4 animate-spin" /> Painting…</> : "🎨 Prompt + Image"}
        </Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy && !imgBusy} />
      {prompt && !busy && !imgSrc && (
        <div className="flex justify-center">
          <Button size="sm" variant="secondary" onClick={renderFromPrompt} disabled={imgBusy}>
            {imgBusy ? <><Loader2 className="size-3.5 animate-spin" /> Rendering…</> : "🎨 Render image from this prompt"}
          </Button>
        </div>
      )}
      {(imgBusy || imgErr || imgSrc) && (
        <div className="liquid rounded-2xl p-4 md:p-5 grid gap-3">
          {imgBusy && (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-zinc-300">
              <Loader2 className="size-5 animate-spin" /> 🎨 gpt-image-2 is painting your image…
            </div>
          )}
          {imgErr && <p className="text-center text-sm text-rose-300">⚠️ {imgErr}</p>}
          {imgSrc && (
            <>
              <img src={imgSrc} alt="AI generated" className="mx-auto max-h-[32rem] rounded-xl" />
              <div className="flex justify-center">
                <a href={imgSrc} download="shweprompt-image.png">
                  <Button size="sm" variant="secondary">⬇️ Download PNG</Button>
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ================= IMAGE TO PROMPT =================
export function ImageToPromptMode() {
  const { needKey } = useApp();
  const [preview, setPreview] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(f.type)) { setErr("Only PNG / JPG / WEBP allowed."); return; }
    if (f.size > 5 * 1024 * 1024) { setErr("Max 5MB."); return; }
    setErr(null);
    const r = new FileReader();
    r.onload = () => { setDataUrl(r.result as string); setPreview(r.result as string); };
    r.readAsDataURL(f);
  };

  const analyze = async () => {
    if (!dataUrl) return;
    if (needKey()) return;
    setBusy(true); setErr(null); setPrompt("");
    try {
      const vision = RELAY_MODELS.find((m) => m.vision && m.tier === "powerful")!.id;
      const out = await chatCompletion([
        { role: "system", content: "You are an expert prompt engineer for image-generation AI. Analyze the image and write a detailed, copy-paste-ready image prompt describing subject, style, composition, lighting, colors, and mood. Output only the prompt." },
        { role: "user", content: [{ type: "image_url", image_url: { url: dataUrl } }, { type: "text", text: "Reverse-engineer this image into an image-generation prompt." }] },
      ], { model: vision, maxTokens: 800 });
      setPrompt(out.trim());
    } catch (e) { setErr(friendlyError(e)); }
    finally { setBusy(false); }
  };

  return (
    <div className="grid gap-4">
      <div
        className="liquid rounded-2xl p-8 text-center cursor-pointer border-dashed"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }}
      >
        <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden"
          onChange={(e) => onFile(e.target.files?.[0])} />
        {preview ? (
          <img src={preview} alt="upload" className="max-h-72 mx-auto rounded-xl" />
        ) : (
          <div>
            <div className="text-5xl mb-3">🔄</div>
            <p className="font-bold">Drop an image here or click to upload</p>
            <p className="text-sm text-zinc-500 mt-1">PNG / JPG / WEBP · max 5MB — the AI reverse-engineers it into a prompt</p>
          </div>
        )}
      </div>
      {err && <p className="text-rose-300 text-sm">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={analyze} disabled={busy || !dataUrl}>
          {busy ? "⏳ Analyzing…" : "🔍 Image → Prompt"}
        </Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy} executeLabel="✨ Polish with AI" />
    </div>
  );
}

// ================= WEB ART =================
export function WebArtMode() {
  const [concept, setConcept] = useState("");
  const [style, setStyle] = useState(WEBART_STYLES[0]);
  const [palette, setPalette] = useState(PALETTES[0]);
  const [size, setSize] = useState(WEBART_SIZES[0]);
  const [animated, setAnimated] = useState(true);
  const [speed, setSpeed] = useState(50);
  const [details, setDetails] = useState("");
  const [negative, setNegative] = useState("cluttered, unreadable, broken layout");
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const build = () => [
    `# WEB ART PROMPT — ${style}`,
    ``,
    `Create web art: ${concept || "(describe your concept above)"}.`,
    `**Technique:** ${style}`,
    `**Palette:** ${palette} · **Size:** ${size}`,
    animated ? `**Animation:** yes, loop at ${speed}% speed — smooth, performant (60fps target).` : `**Animation:** no — single static frame.`,
    details ? `**Details:** ${details}` : null,
    `**Avoid:** ${negative}`,
    ``,
    `Deliver a single self-contained HTML file (inline CSS/JS, no external assets) that renders this art full-bleed and responsively.`,
  ].filter((x) => x !== null).join("\n");

  const generate = () => generatePrompt(build(), { setPrompt, setBusy, setErr });

  const generateAndCode = () => {
    generatePrompt(build() + `\n\nNow write the complete code.`, { setPrompt, setBusy, setErr });
  };

  return (
    <div className="grid gap-4">
      <div className="liquid rounded-2xl p-4 md:p-5 grid md:grid-cols-2 gap-3">
        <Field label="Concept">
          <textarea value={concept} onChange={(e) => setConcept(e.target.value)} rows={3} placeholder="e.g. A neon jellyfish drifting through a particle ocean…" className={inputCls} />
        </Field>
        <div className="grid gap-3">
          <Field label="Details (optional)"><input value={details} onChange={(e) => setDetails(e.target.value)} placeholder="e.g. slow drift, glow trails…" className={inputCls} /></Field>
          <Field label="Avoid"><input value={negative} onChange={(e) => setNegative(e.target.value)} className={inputCls} /></Field>
        </div>
      </div>
      <OptionSection title="🌐 Code-art style">{WEBART_STYLES.map((x) => <Chip key={x} active={style === x} onClick={() => setStyle(x)}>{x}</Chip>)}</OptionSection>
      <div className="grid md:grid-cols-2 gap-4">
        <OptionSection title="🎨 Palette">{PALETTES.map((x) => <Chip key={x} active={palette === x} onClick={() => setPalette(x)}>{x}</Chip>)}</OptionSection>
        <OptionSection title="📐 Size">{WEBART_SIZES.map((x) => <Chip key={x} active={size === x} onClick={() => setSize(x)}>{x}</Chip>)}</OptionSection>
      </div>
      <div className="liquid rounded-2xl p-4 md:p-5">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <Switch checked={animated} onCheckedChange={setAnimated} />
            Animated
          </label>
          {animated && (
            <label className="flex items-center gap-2 text-sm text-zinc-500">
              Speed
              <Slider value={[speed]} onValueChange={([v]) => setSpeed(v)} min={10} max={100} className="w-36" />
              <span className="tabular-nums">{speed}%</span>
            </label>
          )}
        </div>
        <p className="text-xs text-zinc-500">“Prompt + Code” builds the prompt, then Generate + Execute writes the actual HTML for you.</p>
      </div>
      {err && <p className="text-center text-sm text-rose-300">⚠️ {err}</p>}
      <StickyBar>
        <Button size="lg" onClick={generate} disabled={busy}>{busy ? "✨ Writing with AI…" : "✨ Prompt Generate"}</Button>
        <Button size="lg" variant="secondary" onClick={generateAndCode} disabled={busy}>🚀 Prompt + Code</Button>
      </StickyBar>
      <PromptOutput prompt={prompt} busy={busy} executeLabel="🚀 Generate + Execute (writes the code)" />
    </div>
  );
}
