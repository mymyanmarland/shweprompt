import { useEffect, useRef, useState } from "react";
import { inputCls, useApp, Button, Badge } from "../components/chrome";
import { Send } from "lucide-react";
import { chatCompletion, friendlyError, type ChatMessage } from "../lib/api";

const QUICK = ["Translate to Myanmar for me", "Write code for me", "What should I ask?"];

export function ChatMode() {
  const { needKey } = useApp();
  const [msgs, setMsgs] = useState<ChatMessage[]>([
    { role: "assistant", content: "👋 Hi! I'm your AI assistant — ask me anything. ✨" },
  ]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  const send = async (content: string) => {
    const clean = content.trim();
    if (!clean || busy) return;
    if (needKey()) return;
    setErr(null);
    const next: ChatMessage[] = [...msgs, { role: "user", content: clean }];
    setMsgs(next);
    setText("");
    setBusy(true);
    try {
      const out = await chatCompletion(
        [{ role: "system", content: "You are ShwePrompt's friendly AI assistant. Be helpful and concise." }, ...next],
        { maxTokens: 2000 }
      );
      setMsgs([...next, { role: "assistant", content: out }]);
    } catch (e) {
      setErr(friendlyError(e));
    } finally { setBusy(false); }
  };

  return (
    <div className="liquid rounded-2xl p-4 md:p-5 flex flex-col" style={{ minHeight: 480 }}>
      <h3 className="font-bold mb-1">🤖 AI Assistant <span className="text-zinc-500 font-normal text-sm">— always ready to help ✨</span></h3>
      <div className="flex flex-wrap gap-2 my-3">
        {QUICK.map((q) => (
          <Badge key={q} onClick={() => send(q)}>{q}</Badge>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 bg-black/30 rounded-xl p-4 max-h-[28rem]">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <pre className={`prompt-out text-sm rounded-2xl px-4 py-2.5 max-w-[85%] ${
              m.role === "user" ? "bg-gradient-to-br from-violet-600 to-pink-600 text-white" : "bg-white/8 border border-white/10 text-ink/90"
            }`}>{typeof m.content === "string" ? m.content : "[image]"}</pre>
          </div>
        ))}
        {busy && <div className="text-sm text-zinc-500">✍️ Thinking…</div>}
        <div ref={bottomRef} />
      </div>
      {err && <p className="text-rose-300 text-sm mt-2">⚠️ {err}</p>}
      <div className="flex gap-2 mt-3">
        <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(text)}
          placeholder="Ask anything…" className={inputCls + " min-w-0 flex-1"} />
        <Button onClick={() => send(text)} disabled={busy} className="shrink-0"><Send className="size-4" /><span className="hidden sm:inline">Send</span></Button>
      </div>
    </div>
  );
}
