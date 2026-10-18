import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[13px] font-medium transition-all duration-150 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60",
  {
    variants: {
      variant: {
        default: "border-white/12 bg-white/[0.05] text-zinc-200 hover:border-violet-400/60 hover:bg-violet-500/15",
        active:
          "border-transparent text-white bg-gradient-to-b from-violet-500 to-fuchsia-600 " +
          "shadow-[0_6px_16px_-6px_rgba(139,92,246,0.8),inset_0_1px_0_rgba(255,255,255,0.35)]",
        outline: "border-white/20 text-zinc-300 hover:bg-white/[0.06]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <button className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
