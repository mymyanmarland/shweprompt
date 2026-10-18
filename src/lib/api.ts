// ShwePrompt — RelayModels API layer (BYOK: key stays in the user's browser)

export const RELAY_BASE = "https://api.relaymodels.com/v1";

export interface RelayModel {
  id: string;
  label: string;
  tier: "fast" | "balanced" | "powerful";
  vision?: boolean;
}

export const RELAY_MODELS: RelayModel[] = [
  { id: "gemini-3.8-flash", label: "Gemini 3.8 Flash", tier: "fast", vision: true },
  { id: "gemini-3.7-flash", label: "Gemini 3.7 Flash", tier: "fast", vision: true },
  { id: "gpt-5.4-mini", label: "GPT-5.4 Mini", tier: "fast" },
  { id: "qwen3.8-max", label: "Qwen 3.8 Max", tier: "balanced" },
  { id: "claude-haiku-4-5", label: "Claude Haiku 4.5", tier: "balanced", vision: true },
  { id: "claude-sonnet-5", label: "Claude Sonnet 5", tier: "powerful", vision: true },
  { id: "claude-opus-5-5", label: "Claude Opus 5.5", tier: "powerful", vision: true },
];

export const DEFAULT_MODEL = RELAY_MODELS[0].id;

// ---- prefs (localStorage) ----
const K = { key: "shweprompt.relay_key", model: "shweprompt.model", remember: "shweprompt.remember" };

export function getApiKey(): string {
  return localStorage.getItem(K.key) || "";
}
export function setApiKey(v: string) {
  if (v) localStorage.setItem(K.key, v);
  else localStorage.removeItem(K.key);
}
export function getModel(): string {
  const v = localStorage.getItem(K.model) || DEFAULT_MODEL;
  return RELAY_MODELS.some((m) => m.id === v) ? v : DEFAULT_MODEL;
}
export function setModel(id: string) {
  localStorage.setItem(K.model, id);
}

// ---- chat completions ----
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

export async function chatCompletion(
  messages: ChatMessage[],
  opts: { model?: string; temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  const key = getApiKey();
  if (!key) throw new Error("NO_KEY");
  const res = await fetch(`${RELAY_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: opts.model || getModel(),
      messages,
      temperature: opts.temperature ?? 0.7,
      max_tokens: opts.maxTokens ?? 2000,
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from model");
  return typeof text === "string" ? text : JSON.stringify(text);
}

export function friendlyError(e: unknown): string {
  const m = e instanceof Error ? e.message : String(e);
  if (m === "NO_KEY") return "Add your RelayModels API key first (key icon, top-right). The key stays in your browser only.";
  if (m.includes("401")) return "API key rejected (401). Check the key and try again.";
  if (m.includes("429")) return "Rate limited (429). Wait a moment and retry.";
  if (m.includes("Failed to fetch")) return "Network/CORS error. Check your connection and retry.";
  return m;
}

// ---- crypto ticker (CoinGecko, no key) ----
export interface TickerItem { symbol: string; price: number; change: number; }
const CG_IDS: Array<[string, string]> = [
  ["bitcoin", "BTC"], ["ethereum", "ETH"], ["binancecoin", "BNB"],
  ["solana", "SOL"], ["ripple", "XRP"], ["cardano", "ADA"],
  ["dogecoin", "DOGE"], ["pax-gold", "XAU"],
];
export async function fetchTicker(): Promise<TickerItem[]> {
  const ids = CG_IDS.map(([id]) => id).join(",");
  const res = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
  );
  if (!res.ok) throw new Error("ticker failed");
  const j = await res.json();
  return CG_IDS.map(([id, sym]) => ({
    symbol: sym,
    price: j[id]?.usd ?? 0,
    change: j[id]?.usd_24h_change ?? 0,
  })).filter((t) => t.price > 0);
}
