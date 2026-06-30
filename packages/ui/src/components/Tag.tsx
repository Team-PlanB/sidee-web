import type { HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type TagStyleType = "solid" | "outlined";
export type TagVariant = "accent" | "neutral";
export type TagSize = "xs" | "s" | "m";

/**
 * Tag 스타일 — Figma 컴포넌트 속성과 1:1 (Type × Variant × Size).
 * type × variant 색 매트릭스는 cva `compoundVariants` 로 표현한다.
 * outlined 1px 보더는 Button 과 동일하게 `inset-ring`(레이아웃 영향 없음)을 쓴다.
 */
export const tagVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium",
  {
    variants: {
      type: {
        solid: "",
        outlined: "bg-white inset-ring",
      },
      variant: {
        accent: "",
        neutral: "",
      },
      size: {
        xs: "h-5 px-2 gap-0.5 text-caption-2",
        s: "h-6 px-2 gap-0.5 text-caption-1",
        m: "h-7 px-2.5 gap-0.5 text-label-2",
      },
    },
    compoundVariants: [
      { type: "solid", variant: "accent", class: "bg-blue-100 text-blue-600" },
      { type: "solid", variant: "neutral", class: "bg-gray-200 text-gray-700" },
      { type: "outlined", variant: "accent", class: "inset-ring-blue-300 text-blue-600" },
      { type: "outlined", variant: "neutral", class: "inset-ring-gray-300 text-gray-700" },
    ],
    defaultVariants: {
      type: "solid",
      variant: "accent",
      size: "m",
    },
  },
);

export type TagVariantProps = VariantProps<typeof tagVariants>;

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  type?: TagStyleType;
  variant?: TagVariant;
  size?: TagSize;
  /** 자식 요소로 렌더링 (예: 링크 태그) */
  asChild?: boolean;
};

export function Tag({
  type = "solid",
  variant = "accent",
  size = "m",
  asChild = false,
  className,
  ...props
}: TagProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="tag"
      className={cn(tagVariants({ type, variant, size }), className)}
      {...props}
    />
  );
}
