import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none",
  {
    variants: {
      variant: {
        // 3D liquid-glossy primary
        primary:
          "btn-3d text-white bg-gradient-to-b from-violet-500 via-violet-600 to-fuchsia-700 " +
          "shadow-[0_10px_25px_-8px_rgba(139,92,246,0.7),inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_6px_rgba(0,0,0,0.35)] " +
          "hover:brightness-110 hover:-translate-y-px active:translate-y-px active:shadow-[0_4px_12px_-6px_rgba(139,92,246,0.7),inset_0_2px_8px_rgba(0,0,0,0.4)]",
        secondary:
          "btn-3d bg-white/[0.07] text-zinc-100 border border-white/15 backdrop-blur-xl " +
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_20px_-10px_rgba(0,0,0,0.8)] " +
          "hover:bg-white/[0.12] hover:-translate-y-px active:translate-y-px",
        ghost: "text-zinc-300 hover:bg-white/[0.07] hover:text-white",
        outline:
          "border border-white/15 bg-transparent text-zinc-200 hover:bg-white/[0.06] hover:border-white/25",
        destructive:
          "btn-3d text-white bg-gradient-to-b from-rose-500 to-rose-700 " +
          "shadow-[0_10px_25px_-8px_rgba(244,63,94,0.6),inset_0_1px_0_rgba(255,255,255,0.3)] hover:brightness-110",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        default: "h-10 px-5",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
