import { cn } from "@/lib/utils";

interface FinTrackLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
}

const FinTrackLogo = ({ className, size = "md", variant = "dark" }: FinTrackLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const colorClasses = variant === "dark" ? "text-foreground" : "text-white";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-lg bg-primary flex items-center justify-center",
        sizeClasses[size]
      )}>
        <span className={cn("text-primary-foreground font-bold", iconSizes[size])}>F</span>
      </div>
      <span className={cn("font-semibold tracking-tight", textSizeClasses[size], colorClasses)}>
        FinTrack
      </span>
    </div>
  );
};

export default FinTrackLogo;
