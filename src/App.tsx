import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { AppProvider, Header, Ticker, ModeGrid, GuideBot, MODES } from "./components/chrome";
import { GeneralMode, RefineMode, CodingMode, VibeMode } from "./modes/builders";
import { LibraryMode, TextDesignMode } from "./modes/library";
import { VideoMode, LogoMode, ImageMode, ImageToPromptMode, WebArtMode } from "./modes/media";
import { ChatMode } from "./modes/chat";

function ModeView({ id }: { id: string }) {
  switch (id) {
    case "general": return <GeneralMode />;
    case "refine": return <RefineMode />;
    case "coding": return <CodingMode />;
    case "vibe": return <VibeMode />;
    case "library": return <LibraryMode />;
    case "textdesign": return <TextDesignMode />;
    case "video-mm": return <VideoMode lang="mm" />;
    case "video-en": return <VideoMode lang="en" />;
    case "logo": return <LogoMode />;
    case "image": return <ImageMode />;
    case "img2prompt": return <ImageToPromptMode />;
    case "webart": return <WebArtMode />;
    case "chat": return <ChatMode />;
    default: return <GeneralMode />;
  }
}

export default function App() {
  const [mode, setMode] = useState<string | null>(null);
  const active = MODES.find((m) => m.id === mode);
  const go = (id: string) => { setMode(id); window.scrollTo({ top: 0 }); };

  return (
    <AppProvider>
      <div className="relative min-h-full">
        {/* ambient liquid background */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="orb absolute -left-40 -top-40 size-[560px] rounded-full bg-violet-700/25 blur-[120px]" />
          <div className="orb absolute -right-40 top-1/4 size-[480px] rounded-full bg-fuchsia-700/20 blur-[120px]" style={{ animationDelay: "-6s" }} />
          <div className="orb absolute bottom-0 left-1/3 size-[460px] rounded-full bg-cyan-600/15 blur-[120px]" style={{ animationDelay: "-11s" }} />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
          />
        </div>

        <Header />
        <Ticker />

        <main className="mx-auto max-w-6xl px-4 pb-24 pt-6">
          {!mode ? (
            <>
              <div className="mb-6 text-center">
                <div className="mb-3 inline-grid size-14 place-items-center rounded-2xl bg-gradient-to-b from-violet-500 to-fuchsia-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_30px_-8px_rgba(139,92,246,0.9)]">
                  <Sparkles className="size-6" />
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-white">
                  What do you want to <span className="grad-text">create</span>?
                </h1>
                <p className="mx-auto mt-1 max-w-md text-sm text-zinc-500">
                  Pick a studio mode — build the perfect prompt, then copy it or run it with AI.
                </p>
              </div>
              <ModeGrid onPick={go} />
            </>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-2.5">
                <Button variant="ghost" size="icon" aria-label="Back to modes" onClick={() => { setMode(null); window.scrollTo({ top: 0 }); }} className="shrink-0">
                  <ArrowLeft className="size-4" />
                </Button>
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-violet-500 to-fuchsia-700 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_20px_-8px_rgba(139,92,246,0.9)]">
                  {active?.icon}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold tracking-tight text-white">{active?.label} Prompt</h2>
                  <p className="truncate text-xs text-zinc-500">{active?.desc}</p>
                </div>
                <div className="flex-1" />
                <Select value={mode} onValueChange={go}>
                  <SelectTrigger className="w-28 shrink-0 sm:w-40"><SelectValue placeholder="Jump to…" /></SelectTrigger>
                  <SelectContent>
                    {MODES.map((x) => (
                      <SelectItem key={x.id} value={x.id}>{x.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <ModeView id={mode} />
              </div>
            </>
          )}
        </main>

        <footer className="border-t border-white/[0.06] py-5 text-center text-[11px] text-zinc-600">
          <span className="grad-text font-bold">✦ ShwePrompt</span> · your key never leaves this browser
        </footer>

        <GuideBot />
      </div>
    </AppProvider>
  );
}
