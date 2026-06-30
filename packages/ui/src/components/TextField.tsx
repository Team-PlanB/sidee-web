"use client";

import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

/**
 * TextField — 라벨 + 입력박스 + 헬퍼 텍스트. Figma 속성과 대응.
 *
 *   State : default | focused | invalid | disabled
 *   placeholder on/off : native input 동작 (값 gray-800 / placeholder gray-400)
 *   trailing btn on/off : `actionLabel` 제공 시 우측 부착 버튼
 *
 * focused 는 실제 포커스(focus-within)로 처리한다. invalid/disabled 는 prop/native.
 *  - default  : border gray-200 (focus 시 blue-600)
 *  - invalid  : border error + helper error (focus 여도 빨강 유지)
 *  - disabled : bg gray-100 + native disabled
 *
 * 폼/접근성을 위해 native input + ref forwarding, label htmlFor / aria-describedby 연결.
 */
export type TextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  /** 라벨 (Heading). 없으면 헤딩 미표시 */
  label?: ReactNode;
  /** 필수 표시(*) */
  required?: boolean;
  /** 헬퍼/에러 메시지 */
  helperText?: ReactNode;
  /** 에러 상태 (border/helper error) */
  invalid?: boolean;
  /** 입력박스 좌측 아이콘 (24px) */
  leadingIcon?: ReactNode;
  /** 입력박스 우측 인필드 슬롯 (아이콘 등) */
  trailing?: ReactNode;
  /** 우측 부착 버튼 라벨 (있으면 trailing btn 표시) */
  actionLabel?: ReactNode;
  /** 부착 버튼 클릭 */
  onActionClick?: () => void;
  /** 루트 래퍼 className */
  className?: string;
  /** input 요소 className */
  inputClassName?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      required = false,
      helperText,
      invalid = false,
      leadingIcon,
      trailing,
      actionLabel,
      onActionClick,
      disabled,
      id,
      className,
      inputClassName,
      ...props
    },
    ref,
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const helperId = `${inputId}-helper`;
    const hasAction = actionLabel != null;

    return (
      <div
        data-slot="text-field"
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn("flex w-full flex-col gap-2", className)}
        style={{ fontFeatureSettings: "'ss10'" }}
      >
        {label != null && (
          <div className="flex items-center gap-1">
            <label
              htmlFor={inputId}
              className="text-label-1 font-medium text-gray-800"
            >
              {label}
            </label>
            {required && (
              <span aria-hidden className="text-label-1 font-medium text-error">
                *
              </span>
            )}
          </div>
        )}

        <div className="flex w-full">
          <div
            data-slot="text-field-container"
            className={cn(
              "box-border flex h-12 min-w-0 flex-1 items-center gap-3 border p-3 transition-colors",
              hasAction ? "rounded-l-xl" : "rounded-xl",
              disabled
                ? "bg-gray-100 border-gray-200"
                : invalid
                  ? "border-error"
                  : "border-gray-200 focus-within:border-blue-600",
            )}
          >
            {leadingIcon}
            <input
              id={inputId}
              ref={ref}
              disabled={disabled}
              aria-invalid={invalid || undefined}
              aria-describedby={helperText != null ? helperId : undefined}
              className={cn(
                "min-w-0 flex-1 bg-transparent text-body-1 text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed",
                inputClassName,
              )}
              {...props}
            />
            {trailing}
          </div>

          {hasAction && (
            <button
              type="button"
              data-slot="text-field-action"
              onClick={onActionClick}
              disabled={disabled}
              className={cn(
                "inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-r-xl border px-6 py-3 text-body-1 font-semibold transition-colors disabled:cursor-not-allowed",
                disabled
                  ? "bg-gray-100 border-gray-200 text-gray-400"
                  : "bg-white border-gray-200 text-blue-600",
              )}
            >
              {actionLabel}
            </button>
          )}
        </div>

        {helperText != null && (
          <p
            id={helperId}
            className={cn(
              "text-caption-1",
              invalid ? "text-error" : "text-gray-500",
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
