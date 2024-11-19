import { cn } from "@/lib/utils";
import React from "react";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function RainbowButton({ children, className, ...props }: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition duration-300 ease-out hover:scale-[1.02]",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 flex items-center [container-type:inline-size]">
        <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] duration-300 ease-in-out group-hover:pause"></div>
      </div>
      <div className="absolute inset-[2px] rounded-lg bg-slate-900"></div>
      <div className="relative">{children}</div>
    </button>
  );
}