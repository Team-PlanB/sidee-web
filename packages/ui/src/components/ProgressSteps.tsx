import type { HTMLAttributes, SVGProps } from "react";
import { cn } from "../lib/cn";

/**
 * ProgressSteps — 단계 진행 표시(stepper). Figma 속성과 대응 (totalCount, currentStep).
 *
 * 각 스텝은 currentStep(1-indexed) 기준으로 상태가 갈린다:
 *  - 완료(step < current) : 파란 배지(#0066FF) + 흰 체크,  라벨 blue-600
 *  - 현재(step = current) : 파란 배지 + 흰 숫자,            라벨 blue-600
 *  - 미래(step > current) : gray-300 배지 + 흰 숫자,        라벨 gray-300
 *
 * 뒤쪽 연결선은 2×total 세그먼트(양끝 투명), 완료 구간만 blue-600.
 *
 * NOTE: 배지 파랑 `#0066FF` 는 디자인 토큰(blue-600 #3368FF)과 다른 값이라 임의값으로 둠.
 */
export type ProgressStepsProps = HTMLAttributes<HTMLDivElement> & {
  /** 전체 단계 수 */
  totalCount: number;
  /** 현재 단계 (1-indexed) */
  currentStep: number;
  /** 단계별 라벨 (length = totalCount). 없으면 라벨 미표시 */
  labels?: string[];
};

type StepState = "completed" | "current" | "future";

function stepState(step: number, currentStep: number): StepState {
  if (step < currentStep) return "completed";
  if (step === currentStep) return "current";
  return "future";
}

export function ProgressSteps({
  totalCount,
  currentStep,
  labels,
  className,
  ...props
}: ProgressStepsProps) {
  const steps = Array.from({ length: totalCount }, (_, i) => i + 1);
  const segments = Array.from({ length: totalCount * 2 }, (_, s) => s);

  return (
    <div
      data-slot="progress-steps"
      role="group"
      aria-label={`단계 ${currentStep} / ${totalCount}`}
      className={cn("relative flex h-[50px] w-full flex-col", className)}
      style={{ fontFeatureSettings: "'ss10'" }}
      {...props}
    >
      {/* 연결선 레이어 (뒤, z0) — 배지 중심 높이(top-3)에 가로선 */}
      <div
        data-slot="progress-divider"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-3 z-0 flex w-full"
      >
        {segments.map((s) => {
          const isEdge = s === 0 || s === segments.length - 1;
          // 세그먼트 s 는 step ceil(s/2) 와 그 다음 단계 사이 구간
          const filled = !isEdge && currentStep > Math.ceil(s / 2);
          return (
            <div
              key={s}
              className={cn(
                "h-[1.5px] flex-1",
                !isEdge && (filled ? "bg-blue-600" : "bg-gray-300"),
              )}
            />
          );
        })}
      </div>

      {/* 스텝 레이어 (앞, z1) */}
      <div className="relative z-[1] flex w-full items-start">
        {steps.map((step) => {
          const state = stepState(step, currentStep);
          const isBlueBadge = state !== "future";
          const isLabelActive = step <= currentStep;
          return (
            <div
              key={step}
              data-slot="step"
              data-state={state}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div
                className={cn(
                  "grid size-7 place-items-center rounded-[1000px_1000px_1000px_60px]",
                  isBlueBadge ? "bg-[#0066FF]" : "bg-gray-300",
                )}
                aria-current={state === "current" ? "step" : undefined}
              >
                {state === "completed" ? (
                  <CheckIcon className="size-4 text-white" aria-hidden />
                ) : (
                  <span
                    className={cn(
                      "text-caption-1 font-semibold text-white",
                      state === "future" &&
                        "[text-shadow:0_0_12px_rgba(0,0,0,0.12)]",
                    )}
                  >
                    {step}
                  </span>
                )}
              </div>
              {labels?.[step - 1] != null && (
                <span
                  className={cn(
                    "text-center text-label-2 font-semibold",
                    isLabelActive ? "text-blue-600" : "text-gray-300",
                  )}
                >
                  {labels[step - 1]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
