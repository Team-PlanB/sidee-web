"use client";

import {
  useId,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import { cn } from "../lib/cn";

/**
 * Select — 드롭다운 트리거. Figma 속성과 대응.
 *
 *   State : default | focused | invalid | disabled
 *   placeholder on/off : 값 유무 (값 gray-800 / placeholder gray-400)
 *   multiselect on/off : on 이면 선택값을 칩(제거가능)으로 표시
 *   active on/off : 드롭다운 열림 → caret ▲ (off 면 ▼)
 *
 * focused 는 실제 :focus. invalid/disabled 는 prop.
 *  - border: default gray-200 / focus (multiselect?blue-500:blue-600) / invalid error / disabled gray-200+bg
 *  - caret : disabled gray-400 / invalid·focus gray-800 / default(값 gray-800·빈값 gray-400)
 *
 * 칩 내부에 제거 버튼(중첩 button 회피)이 있어 트리거는 role="combobox" 의 div 로 만든다.
 * 실제 옵션 목록(드롭다운)은 호출부에서 합성한다.
 */
export interface SelectItem {
  value: string;
  label: ReactNode;
}

export type SelectProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> & {
  label?: ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  /** 드롭다운 열림 상태 (caret ▲ + aria-expanded) */
  active?: boolean;
  /** 복수 선택 (선택값을 칩으로 표시) */
  multiselect?: boolean;
  placeholder?: string;
  /** 좌측 아이콘 */
  leadingIcon?: ReactNode;
  /** 단일 선택 표시값 (multiselect=false) */
  value?: ReactNode;
  /** 복수 선택 항목 (multiselect=true) */
  selectedItems?: SelectItem[];
  /** 칩 제거 클릭 */
  onRemoveItem?: (value: string) => void;
  /** 트리거 클릭/엔터 (열기·닫기 토글) */
  onTrigger?: () => void;
};

export function Select({
  label,
  required = false,
  helperText,
  invalid = false,
  disabled = false,
  active = false,
  multiselect = false,
  placeholder = "선택해 주세요.",
  leadingIcon,
  value,
  selectedItems = [],
  onRemoveItem,
  onTrigger,
  id,
  className,
  ...props
}: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const labelId = `${fieldId}-label`;
  const helperId = `${fieldId}-helper`;

  const hasValue = multiselect ? selectedItems.length > 0 : value != null;

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onTrigger?.();
    }
  };

  const caretColor = disabled
    ? "text-gray-400"
    : invalid || hasValue
      ? "text-gray-800"
      : "text-gray-400";

  return (
    <div
      data-slot="select"
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      className={cn("flex w-full flex-col gap-2", className)}
      style={{ fontFeatureSettings: "'ss10'" }}
      {...props}
    >
      {label != null && (
        <div className="flex items-center gap-1">
          <span
            id={labelId}
            className="text-label-1 font-medium text-gray-800"
          >
            {label}
          </span>
          {required && (
            <span aria-hidden className="text-label-1 font-medium text-error">
              *
            </span>
          )}
        </div>
      )}

      <div
        data-slot="select-trigger"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={active}
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        aria-labelledby={label != null ? labelId : undefined}
        aria-describedby={helperText != null ? helperId : undefined}
        tabIndex={disabled ? undefined : 0}
        onClick={disabled ? undefined : onTrigger}
        onKeyDown={handleKeyDown}
        className={cn(
          "group box-border flex h-12 items-center gap-3 rounded-xl border p-3 outline-none transition-colors",
          disabled
            ? "bg-gray-100 border-gray-200 cursor-not-allowed"
            : invalid
              ? "border-error cursor-pointer"
              : cn(
                  "border-gray-200 cursor-pointer",
                  multiselect ? "focus:border-blue-500" : "focus:border-blue-600",
                ),
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {leadingIcon}
          {multiselect && hasValue ? (
            <div className="flex min-w-0 items-center gap-1 overflow-hidden">
              {selectedItems.map((item) => (
                <span
                  key={item.value}
                  className="inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-gray-200 px-2"
                >
                  <span className="text-caption-1 font-medium text-gray-700">
                    {item.label}
                  </span>
                  {!disabled && (
                    <button
                      type="button"
                      aria-label="제거"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem?.(item.value);
                      }}
                      className="inline-flex text-gray-700"
                    >
                      <CloseIcon className="size-3.5" aria-hidden />
                    </button>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <span
              className={cn(
                "truncate text-body-1",
                hasValue ? "text-gray-800" : "text-gray-400",
              )}
            >
              {multiselect ? placeholder : (value ?? placeholder)}
            </span>
          )}
        </div>

        <CaretIcon
          className={cn(
            "size-6 shrink-0 transition-transform",
            caretColor,
            active && "rotate-180",
          )}
          aria-hidden
        />
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
}

/** Caret Down (24px). active 시 180° 회전 → ▲ */
function CaretIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 닫기(x) 아이콘 */
function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="m4 4 8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
