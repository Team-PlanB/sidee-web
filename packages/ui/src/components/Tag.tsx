import type { HTMLAttributes } from "react";

export type TagStyleType = "solid" | "outlined";
export type TagVariant = "accent" | "neutral";
export type TagSize = "xs" | "s" | "m";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  type?: TagStyleType;
  variant?: TagVariant;
  size?: TagSize;
};

const base =
  "inline-flex items-center justify-center rounded-full font-medium";

/** outlined 1px 보더는 Button과 동일하게 inset-ring 사용 (레이아웃에 영향 없음) */
const tagColor: Record<TagStyleType, Record<TagVariant, string>> = {
  solid: {
    accent: "bg-blue-100 text-blue-600",
    neutral: "bg-gray-200 text-gray-700",
  },
  outlined: {
    accent: "bg-white inset-ring inset-ring-blue-300 text-blue-600",
    neutral: "bg-white inset-ring inset-ring-gray-300 text-gray-700",
  },
};

const tagSize: Record<TagSize, string> = {
  xs: "h-5 px-2 gap-0.5 text-caption-2",
  s: "h-6 px-2 gap-0.5 text-caption-1",
  m: "h-7 px-2.5 gap-0.5 text-label-2",
};

export function Tag({
  type = "solid",
  variant = "accent",
  size = "m",
  className,
  ...props
}: TagProps) {
  const classes = [base, tagColor[type][variant], tagSize[size], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} {...props} />;
}
