/**
 * Button / IconButton 공통 스타일 토큰.
 *
 * type(solid | outlined) × variant(primary | secondary | assistive |
 * error | errorSecondary) 조합으로 확장 예정 — 현재는 solid/primary만 구현.
 */
export type ButtonStyleType = "solid";
export type ButtonVariant = "primary";
export type ButtonSize = "s" | "m" | "l";
export type ButtonHtmlType = "button" | "submit" | "reset";

export const buttonBase =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors disabled:opacity-50";

export const buttonColor: Record<
  ButtonStyleType,
  Record<ButtonVariant, string>
> = {
  solid: {
    primary: "bg-blue-600 text-white",
  },
};

/** 텍스트 버튼: 높이 + 좌우 패딩 + gap + 타이포 (수직 패딩은 높이 고정 + 중앙 정렬로 충족) */
export const textButtonSize: Record<ButtonSize, string> = {
  s: "h-8 px-[14px] gap-1 text-label-2",
  m: "h-10 px-4 gap-1 text-body-2",
  l: "h-12 px-6 gap-1.5 text-body-1",
};

/** 아이콘 버튼: 정사각형 + 패딩 */
export const iconButtonSize: Record<ButtonSize, string> = {
  s: "size-8 p-[7px]",
  m: "size-10 p-2.5",
  l: "size-12 p-3",
};
