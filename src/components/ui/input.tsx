import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-xl border border-white/12 bg-black/40 px-3.5 text-sm text-zinc-100",
        "shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)] placeholder:text-zinc-500",
        "focus-visible:outline-none focus-visible:border-violet-400/70 focus-visible:ring-2 focus-visible:ring-violet-500/30",
        "disabled:cursor-not-allowed disabled:opacity-50 transition-all",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border border-white/12 bg-black/40 px-3.5 py-2.5 text-sm text-zinc-100",
        "shadow-[inset_0_2px_8px_rgba(0,0,0,0.45)] placeholder:text-zinc-500",
        "focus-visible:outline-none focus-visible:border-violet-400/70 focus-visible:ring-2 focus-visible:ring-violet-500/30",
        "disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-xs font-semibold uppercase tracking-[0.08em] text-zinc-400", className)} {...props} />
  )
);
Label.displayName = "Label";

export { Input, Textarea, Label };
