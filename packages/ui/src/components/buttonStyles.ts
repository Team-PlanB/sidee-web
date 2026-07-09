import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button / IconButton 공통 스타일 — Figma 컴포넌트 속성과 1:1.
 *
 *   Figma:  Type=Solid|Outlined · Variant=Primary|Error|... · Size=S|M|L · Icon only=bool
 *   코드 :  type            · variant                  · size       · iconOnly
 *
 * type × variant 색 매트릭스는 cva `compoundVariants` 로 표현한다.
 * size 의 실제 치수는 iconOnly 여부에 따라 갈리므로(텍스트 버튼 vs 정사각형 아이콘 버튼)
 * size 단독이 아니라 (iconOnly × size) 조합으로 적용한다.
 *
 * outlined 의 1px 보더는 `border` 대신 `inset-ring`(안쪽 box-shadow)을 사용한다.
 * Figma 의 stroke(inside)처럼 레이아웃(높이·패딩·hug 너비)에 영향을 주지 않아
 * solid 와 outlined 의 크기가 완전히 동일하게 유지된다.
 *
 * solid 는 현재 primary / error 스펙만 확정 — 나머지 variant 는 스펙 확정 시 추가.
 */
export type ButtonStyleType = "solid" | "outlined";
export type SolidVariant = "primary" | "error";
export type OutlinedVariant =
  | "primary"
  | "secondary"
  | "assistive"
  | "error"
  | "errorSecondary";
export type ButtonVariant = SolidVariant | OutlinedVariant;
export type ButtonSize = "s" | "m" | "l";
export type ButtonHtmlType = "button" | "submit" | "reset";

/** type별로 허용되는 variant를 타입 레벨에서 제한한다 */
export type ButtonColorProps =
  | { type?: "solid"; variant?: SolidVariant }
  | { type: "outlined"; variant?: OutlinedVariant };

export const buttonVariants = cva(
  // base: 레이아웃 + 라운드(pill) + Bold + 포커스 링 + svg 기본 처리
  [
    "inline-flex items-center justify-center rounded-full font-bold shrink-0",
    "cursor-pointer transition-colors outline-none",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      type: {
        solid: "",
        outlined: "bg-white inset-ring",
      },
      // 색은 (type × variant) compoundVariants 에서 결정. 치수는 (iconOnly × size) 에서.
      variant: {
        primary: "",
        secondary: "",
        assistive: "",
        error: "",
        errorSecondary: "",
      },
      size: { s: "", m: "", l: "" },
      iconOnly: { true: "", false: "" },
    },
    compoundVariants: [
      // ── 색: solid ──────────────────────────────────────
      { type: "solid", variant: "primary", class: "bg-blue-600 text-white" },
      { type: "solid", variant: "error", class: "bg-error text-white" },
      // ── 색: outlined (bg-white inset-ring 는 type 에서 적용) ──
      { type: "outlined", variant: "primary", class: "inset-ring-blue-600 text-blue-600" },
      { type: "outlined", variant: "secondary", class: "inset-ring-gray-200 text-blue-600" },
      { type: "outlined", variant: "assistive", class: "inset-ring-gray-200 text-gray-800" },
      { type: "outlined", variant: "error", class: "inset-ring-error text-error" },
      { type: "outlined", variant: "errorSecondary", class: "inset-ring-gray-200 text-error" },
      // ── 치수: 텍스트 버튼 (iconOnly=false) ──────────────
      { iconOnly: false, size: "s", class: "h-8 px-[14px] gap-1 text-label-2" },
      { iconOnly: false, size: "m", class: "h-10 px-4 gap-1 text-body-2" },
      { iconOnly: false, size: "l", class: "h-12 px-6 gap-1.5 text-body-1" },
      // ── 치수: 아이콘 버튼 (iconOnly=true, 정사각형 + 아이콘 18/20/24px) ──
      { iconOnly: true, size: "s", class: "size-8 p-[7px] [&_svg]:size-4.5" },
      { iconOnly: true, size: "m", class: "size-10 p-2.5 [&_svg]:size-5" },
      { iconOnly: true, size: "l", class: "size-12 p-3 [&_svg]:size-6" },
    ],
    defaultVariants: {
      type: "solid",
      variant: "primary",
      size: "m",
      iconOnly: false,
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
