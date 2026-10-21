import { buildSystemPrompt } from "/home/hatch/workspace/shweprompt/src/lib/systemPrompt.ts";
import { writeFileSync, mkdirSync } from "node:fs";

const outDir = "/home/hatch/workspace/shweprompt/samples-system-prompt-mode";
mkdirSync(outDir, { recursive: true });

const samples = [
  {
    file: "shop-bot.md",
    input: {
      appName: "ShweShop Assistant", appType: "Shop / Order Bot", surface: "Telegram Bot",
      audience: "General Public", tone: "Warm & Helpful",
      tools: ["Product catalog", "Order database", "Payments"],
      memory: true, outputFormat: "Short chat replies",
      neverDo: "promise a delivery date before checking stock",
    },
    expect: ["## Memory", "### Product catalog", "### Order database", "### Payments",
      "Hard limit set by the owner: Never promise a delivery date before checking stock."],
  },
  {
    file: "summary-bot.md",
    input: {
      appName: "BriefBot", appType: "Content / Summary Bot", surface: "Web App",
      audience: "Professionals", tone: "Concise & Direct",
      tools: ["Web search"],
      memory: false, outputFormat: "Bullet points",
      neverDo: "",
    },
    expect: ["### Web search"],
    forbid: ["## Memory", "Hard limit set by the owner"],
  },
  {
    file: "coding-bot.md",
    input: {
      appName: "DevBuddy", appType: "Coding Helper", surface: "CLI Tool",
      audience: "Developers", tone: "Expert & Precise",
      tools: ["Code execution"],
      memory: true, outputFormat: "Markdown documents",
      neverDo: "rewrite files that were not mentioned in the request",
    },
    expect: ["## Memory", "### Code execution", "Never rewrite files that were not mentioned in the request."],
  },
];

const COMMON = ["## Identity", "## Tone and formatting", "## Tools", "## Output format",
  "## Example", "Good response:", "Bad response (do not imitate):", "Why this is bad:", "## Limits"];

let allPass = true;
for (const s of samples) {
  const out = buildSystemPrompt(s.input);
  writeFileSync(`${outDir}/${s.file}`, out + "\n");
  const checks = [];
  for (const c of COMMON) checks.push([`contains "${c}"`, out.includes(c)]);
  for (const c of s.expect) checks.push([`contains "${c}"`, out.includes(c)]);
  for (const c of s.forbid ?? []) checks.push([`forbids "${c}"`, !out.includes(c)]);
  checks.push(["app name present", out.includes(s.input.appName)]);
  checks.push(["no leftover {{placeholders}}", !out.includes("{{") && !out.includes("}}")]);
  checks.push(["length > 1200 chars", out.length > 1200]);
  const fails = checks.filter(([, ok]) => !ok);
  console.log(`\n== ${s.file} (${out.length} chars) — ${checks.length - fails.length}/${checks.length} checks passed`);
  for (const [label, ok] of checks) console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}`);
  if (fails.length) allPass = false;
}
console.log(`\nOVERALL: ${allPass ? "ALL PASS" : "FAILURES PRESENT"}`);
process.exit(allPass ? 0 : 1);
