/**
 * Button / IconButton 공통 스타일 토큰.
 *
 * type(solid | outlined) × variant 조합별 컬러 매트릭스.
 * solid는 현재 primary / error 스펙만 확정 — 나머지 variant는 스펙 확정 시 추가.
 *
 * outlined의 1px 보더는 `border` 대신 `inset-ring`(안쪽 box-shadow)을 사용한다.
 * Figma의 stroke(inside)처럼 레이아웃(높이·패딩·hug 너비)에 영향을 주지 않아
 * solid와 outlined의 크기가 완전히 동일하게 유지된다.
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

export const buttonBase =
  "inline-flex items-center justify-center rounded-full font-bold transition-colors disabled:opacity-50";

const buttonColor: {
  solid: Record<SolidVariant, string>;
  outlined: Record<OutlinedVariant, string>;
} = {
  solid: {
    primary: "bg-blue-600 text-white",
    error: "bg-error text-white",
  },
  outlined: {
    primary: "bg-white inset-ring inset-ring-blue-600 text-blue-600",
    secondary: "bg-white inset-ring inset-ring-gray-200 text-blue-600",
    assistive: "bg-white inset-ring inset-ring-gray-200 text-gray-800",
    error: "bg-white inset-ring inset-ring-error text-error",
    errorSecondary: "bg-white inset-ring inset-ring-gray-200 text-error",
  },
};

export function resolveButtonColor(
  type: ButtonStyleType = "solid",
  variant: ButtonVariant = "primary",
): string {
  const palette: Partial<Record<ButtonVariant, string>> = buttonColor[type];
  return palette[variant] ?? buttonColor[type].primary;
}

/** 텍스트 버튼: 높이 + 좌우 패딩 + gap + 타이포 (수직 패딩은 높이 고정 + 중앙 정렬로 충족) */
export const textButtonSize: Record<ButtonSize, string> = {
  s: "h-8 px-[14px] gap-1 text-label-2",
  m: "h-10 px-4 gap-1 text-body-2",
  l: "h-12 px-6 gap-1.5 text-body-1",
};

/** 아이콘 버튼: 정사각형 + 패딩 + 내부 아이콘 크기(18 / 20 / 24px) */
export const iconButtonSize: Record<ButtonSize, string> = {
  s: "size-8 p-[7px] [&_svg]:size-4.5",
  m: "size-10 p-2.5 [&_svg]:size-5",
  l: "size-12 p-3 [&_svg]:size-6",
};
