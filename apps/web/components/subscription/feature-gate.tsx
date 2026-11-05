
"use client";

import Link from "next/link";
import { LockKeyhole, ArrowRight, Sparkles } from "lucide-react";

import { PlanBadge } from "@/components/subscription/plan-badge";

import {
  FEATURES,
  hasFeatureAccess,
  type PlanType,
} from "@/lib/subscription/feature-config";

type FeatureGateProps = {
  featureId: string;
  currentPlan: PlanType;
  children: React.ReactNode;
};

export function FeatureGate({
  featureId,
  currentPlan,
  children,
}: FeatureGateProps) {
  const feature = FEATURES.find(
    (item) => item.id === featureId
  );

  if (!feature) {
    return null;
  }

  const hasAccess = hasFeatureAccess(
    currentPlan,
    featureId
  );

  // Show the actual feature when the plan allows access.
  if (hasAccess) {
    return <>{children}</>;
  }

  // Show an upgrade card when the feature is locked.
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#93C5FD] bg-[#EFF6FF] p-6 dark:border-[#263D60] dark:bg-[#142B4A]">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#2563EB]/10 blur-2xl" />

      <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DBEAFE] text-[#2563EB] dark:bg-[#203D65]">
          <LockKeyhole size={25} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-[#142B4A] dark:text-white">
              {feature.name}
            </h3>

            <PlanBadge plan={feature.requiredPlan} />
          </div>

          <p className="text-sm leading-6 text-[#58708F] dark:text-[#A9BEDA]">
            {feature.description}
          </p>

          <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#2563EB]">
            <Sparkles size={14} />
            Upgrade your plan to unlock this feature.
          </p>
        </div>

        <Link
          href="/subscription"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#142B4A] px-5 py-3 text-sm font-bold !text-white transition hover:bg-[#2563EB]"
        >
          Upgrade Plan
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
