import { cn } from "@/lib/utils";

interface SectionLabelProps {
  index?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {index && (
        <span className="font-mono text-[10px] tracking-[0.25em] text-stone uppercase">
          {index}
        </span>
      )}
      <span className="h-px w-8 bg-stone/30" aria-hidden />
      <span className="font-mono text-[10px] tracking-[0.3em] text-stone uppercase">
        {children}
      </span>
    </div>
  );
}
