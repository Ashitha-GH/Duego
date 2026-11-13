export type PlanType = "free" | "pro" | "business";

export type FeatureConfig = {
  id: string;
  name: string;
  description: string;
  requiredPlan: PlanType;
  category: string;
  route?: string;
};

export const PLAN_DETAILS: Record<
  PlanType,
  {
    name: string;
    price: number;
    color: string;
    description: string;
  }
> = {
  free: {
    name: "Free",
    price: 0,
    color: "#16A34A",
    description: "Essential business management",
  },
  pro: {
    name: "Pro",
    price: 199,
    color: "#2563EB",
    description: "Advanced AI-powered tools",
  },
  business: {
    name: "Business",
    price: 299,
    color: "#D6A84B",
    description: "Complete business intelligence",
  },
};

export const PLAN_ORDER: Record<PlanType, number> = {
  free: 0,
  pro: 1,
  business: 2,
};

export const FEATURES: FeatureConfig[] = [
  // FREE FEATURES
  {
    id: "basic-dashboard",
    name: "Business Dashboard",
    description: "View your basic business overview.",
    requiredPlan: "free",
    category: "Dashboard",
    route: "/dashboard",
  },
  {
    id: "basic-documents",
    name: "Document Management",
    description: "Upload and organize business documents.",
    requiredPlan: "free",
    category: "Documents",
    route: "/documents",
  },
  {
    id: "basic-deadlines",
    name: "Deadline Tracking",
    description: "Track important business deadlines.",
    requiredPlan: "free",
    category: "Management",
    route: "/deadlines",
  },
  {
    id: "basic-reminders",
    name: "Basic Reminders",
    description: "Manage your upcoming reminders.",
    requiredPlan: "free",
    category: "Management",
    route: "/reminders",
  },

  // PRO FEATURES
  {
    id: "advanced-ai-analysis",
    name: "Advanced AI Analysis",
    description: "Get deeper insights from your documents.",
    requiredPlan: "pro",
    category: "AI Tools",
    route: "/analysis",
  },
  {
    id: "risk-detection",
    name: "Advanced Risk Detection",
    description: "Identify potential business and document risks.",
    requiredPlan: "pro",
    category: "AI Tools",
    route: "/analysis",
  },
  {
    id: "detailed-reports",
    name: "Detailed AI Reports",
    description: "Access more detailed document insights.",
    requiredPlan: "pro",
    category: "Reports",
    route: "/analysis",
  },
  {
    id: "advanced-reminders",
    name: "Advanced Reminders",
    description: "Use enhanced reminder management tools.",
    requiredPlan: "pro",
    category: "Management",
    route: "/reminders",
  },

  // BUSINESS FEATURES
  {
    id: "business-insights",
    name: "Business Intelligence",
    description: "View advanced business performance insights.",
    requiredPlan: "business",
    category: "Business Tools",
    route: "/dashboard",
  },
  {
    id: "financial-overview",
    name: "Advanced Financial Overview",
    description: "Explore detailed business financial information.",
    requiredPlan: "business",
    category: "Finance",
    route: "/business-payments",
  },
  {
    id: "advanced-obligations",
    name: "Advanced Obligation Management",
    description: "Manage business obligations with advanced tools.",
    requiredPlan: "business",
    category: "Management",
    route: "/obligations",
  },
  {
    id: "business-reports",
    name: "Business Reports",
    description: "Access enhanced business reporting tools.",
    requiredPlan: "business",
    category: "Reports",
    route: "/analysis",
  },
];

export function hasFeatureAccess(
  currentPlan: PlanType,
  featureId: string
): boolean {
  const feature = FEATURES.find((item) => item.id === featureId);

  if (!feature) return false;

  return PLAN_ORDER[currentPlan] >= PLAN_ORDER[feature.requiredPlan];
}

export function getPlanFeatures(plan: PlanType): FeatureConfig[] {
  return FEATURES.filter((feature) =>
    hasFeatureAccess(plan, feature.id)
  );
}

export function getRequiredPlan(
  featureId: string
): PlanType | undefined {
  return FEATURES.find((feature) => feature.id === featureId)
    ?.requiredPlan;
}