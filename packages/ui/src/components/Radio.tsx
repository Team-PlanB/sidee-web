"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type RadioSize = "medium" | "small";

/**
 * Radio — 단일 선택 컨트롤. Figma 속성과 대응 (Size=Medium|Small, State, Disabled).
 *
 * Figma State(Unchecked/Hover/Error/Checked)는 코드에서 이렇게 갈린다:
 *  - Unchecked : 기본 (border gray-200)
 *  - Hover     : CSS `:hover` (group-hover) — 비활성/체크/에러 아닐 때만
 *  - Error     : `error` prop (border error)
 *  - Checked   : `checked` (bg blue-600 + 흰 점), disabled 면 blue-300
 *
 * 시각 상태는 prop 으로 계산하므로 controlled(`checked` + `onChange`)로 쓴다.
 * 접근성/폼을 위해 시각적으로 숨긴 native `input[type=radio]` 를 둔다.
 */
const radioBoxVariants = cva(
  "box-border grid place-items-center rounded-full border-[1.5px] transition-colors",
  {
    variants: {
      size: {
        medium: "size-5",
        small: "size-4",
      },
      variant: {
        default:
          "border-gray-200 bg-transparent group-hover:border-blue-400 group-hover:bg-blue-100",
        error: "border-error bg-transparent",
        checked: "border-transparent bg-blue-600",
        uncheckedDisabled: "border-gray-200 bg-gray-100",
        checkedDisabled: "border-transparent bg-blue-300",
      },
    },
    defaultVariants: {
      size: "medium",
      variant: "default",
    },
  },
);

type RadioBoxVariant = NonNullable<
  VariantProps<typeof radioBoxVariants>["variant"]
>;

function resolveVariant(
  checked: boolean,
  error: boolean,
  disabled: boolean,
): RadioBoxVariant {
  if (disabled) return checked ? "checkedDisabled" : "uncheckedDisabled";
  if (checked) return "checked";
  if (error) return "error";
  return "default";
}

export type RadioProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  size?: RadioSize;
  /** 검증 에러 상태 (border error) */
  error?: boolean;
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { size = "medium", error = false, checked, disabled, className, ...props },
  ref,
) {
  const variant = resolveVariant(!!checked, error, !!disabled);

  return (
    <label
      data-slot="radio"
      className={cn(
        "group inline-flex items-center justify-center p-0.5",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <input
        ref={ref}
        type="radio"
        checked={checked}
        disabled={disabled}
        className="sr-only"
        {...props}
      />
      <span className={radioBoxVariants({ size, variant })}>
        {checked && (
          <span
            className={cn(
              "rounded-full bg-white",
              size === "medium" ? "size-2" : "size-[7px]",
            )}
          />
        )}
      </span>
    </label>
  );
});
