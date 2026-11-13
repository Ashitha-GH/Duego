
import { Crown, Sparkles, Zap } from "lucide-react";

export type PlanType = "free" | "pro" | "business";

type PlanBadgeProps = {
  plan: PlanType;
};

const planStyles = {
  free: {
    label: "FREE",
    icon: Zap,
    classes: "border-[#86EFAC] bg-[#F0FDF4] text-[#166534]",
  },
  pro: {
    label: "PRO",
    icon: Sparkles,
    classes: "border-[#93C5FD] bg-[#EFF6FF] text-[#1D4ED8]",
  },
  business: {
    label: "BUSINESS",
    icon: Crown,
    classes: "border-[#E8C778] bg-[#FFFBEB] text-[#946200]",
  },
};

export function PlanBadge({ plan }: PlanBadgeProps) {
  const config = planStyles[plan];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-extrabold tracking-wide ${config.classes}`}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
}
