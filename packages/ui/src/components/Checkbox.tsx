"use client";

import { forwardRef, type InputHTMLAttributes, type SVGProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export type CheckboxSize = "medium" | "small";

/**
 * Checkbox — Figma 속성과 대응 (Size=Medium|Small, State, Disabled).
 *
 * Radio 와 동형이나 사각형(rounded-[5px]) + checked 시 흰 체크 아이콘.
 *  - Unchecked : border gray-200
 *  - Hover     : CSS group-hover (blue-100 / blue-400)
 *  - Error     : `error` prop (border error)
 *  - Checked   : bg blue-600 + 흰 체크
 *  - Disabled  : unchecked bg gray-100 / checked bg blue-200(medium)·blue-300(small)
 *
 * controlled(`checked` + `onChange`) 로 사용. 숨긴 native input[type=checkbox] 로
 * 접근성/폼 통합 + ref forwarding.
 */
const checkboxBoxVariants = cva(
  "box-border grid place-items-center rounded-[5px] border-[1.5px] transition-colors",
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
        // checked + disabled 배경은 사이즈별로 다름 → compoundVariants
        checkedDisabled: "border-transparent",
      },
    },
    compoundVariants: [
      { size: "medium", variant: "checkedDisabled", class: "bg-blue-200" },
      { size: "small", variant: "checkedDisabled", class: "bg-blue-300" },
    ],
    defaultVariants: {
      size: "medium",
      variant: "default",
    },
  },
);

type CheckboxBoxVariant = NonNullable<
  VariantProps<typeof checkboxBoxVariants>["variant"]
>;

function resolveVariant(
  checked: boolean,
  error: boolean,
  disabled: boolean,
): CheckboxBoxVariant {
  if (disabled) return checked ? "checkedDisabled" : "uncheckedDisabled";
  if (checked) return "checked";
  if (error) return "error";
  return "default";
}

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  size?: CheckboxSize;
  /** 검증 에러 상태 (border error) */
  error?: boolean;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { size = "medium", error = false, checked, disabled, className, ...props },
    ref,
  ) {
    const variant = resolveVariant(!!checked, error, !!disabled);

    return (
      <label
        data-slot="checkbox"
        className={cn(
          "group inline-flex items-center justify-center p-0.5",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <span className={checkboxBoxVariants({ size, variant })}>
          {checked && (
            <CheckIcon
              className={cn(
                "text-white",
                size === "medium" ? "size-4" : "size-3.5",
              )}
              aria-hidden
            />
          )}
        </span>
      </label>
    );
  },
);

/** 체크 아이콘 (currentColor, 16px viewBox) */
function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M13 4.5 6.5 11.5 3.5 8.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
