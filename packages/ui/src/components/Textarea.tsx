"use client";

import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "../lib/cn";

/**
 * Textarea — 라벨 + 멀티라인 입력박스(+글자수 카운터) + 헬퍼. Figma 속성과 대응.
 *
 *   State : default | focused | invalid | disabled
 *   placeholder on/off : native (값 gray-800 / placeholder gray-400)
 *
 * focused 는 실제 focus-within. invalid/disabled 는 prop/native (TextField 와 동일 규칙).
 * maxLength 가 있으면 박스 하단우측에 `현재/최대` 카운터(gray-500, opacity 0.74)를 표시.
 */
export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className"
> & {
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  invalid?: boolean;
  /** 글자수 카운터 표시 (기본: maxLength 가 있으면 표시) */
  showCount?: boolean;
  className?: string;
  textareaClassName?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      label,
      required = false,
      helperText,
      invalid = false,
      showCount,
      maxLength,
      value,
      defaultValue,
      onChange,
      disabled,
      id,
      className,
      textareaClassName,
      ...props
    },
    ref,
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const helperId = `${inputId}-helper`;

    const isControlled = value !== undefined;
    const [innerCount, setInnerCount] = useState(
      () => String(defaultValue ?? "").length,
    );
    const length = isControlled ? String(value).length : innerCount;
    const counterVisible = (showCount ?? maxLength != null) === true;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInnerCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div
        data-slot="textarea-field"
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

        <div
          data-slot="textarea-container"
          className={cn(
            "box-border flex flex-col gap-3 rounded-xl border p-3 transition-colors",
            disabled
              ? "bg-gray-100 border-gray-200"
              : invalid
                ? "border-error"
                : "border-gray-200 focus-within:border-blue-600",
          )}
        >
          <textarea
            id={inputId}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            aria-invalid={invalid || undefined}
            aria-describedby={helperText != null ? helperId : undefined}
            className={cn(
              "min-h-6 w-full flex-1 resize-none bg-transparent text-body-1 text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed",
              textareaClassName,
            )}
            {...props}
          />
          {counterVisible && (
            <div
              data-slot="textarea-count"
              className="flex justify-end px-1 opacity-[0.74]"
            >
              <span className="text-center text-label-2 font-medium text-gray-500">
                {length}
                {maxLength != null && `/${maxLength}`}
              </span>
            </div>
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
