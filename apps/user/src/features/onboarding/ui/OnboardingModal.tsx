"use client";

import { useState, type SVGProps } from "react";
import OnboardingStep1 from "./OnboardingStep1";

export interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  /** 온보딩(현재 step1) 완료 시 호출 */
  onCompleted?: () => void;
}

const TOTAL_STEPS = 3;

/**
 * 온보딩 모달 스캐폴드 (Figma: 온보딩).
 *
 * 3단계 흐름을 담는 셸. 현재는 step1(경험 선택 + 닉네임)만 구현했고,
 * step2·3 은 디자인 확정 후 추가한다(지금은 건너뛰기 자리표시).
 */
export default function OnboardingModal({
  open,
  onClose,
  onCompleted,
}: OnboardingModalProps) {
  const [step, setStep] = useState(1);

  if (!open) return null;

  const goNext = () => {
    if (step >= TOTAL_STEPS) {
      onCompleted?.();
      return;
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="온보딩"
        className="flex max-h-[90vh] w-full max-w-[500px] flex-col items-center gap-4 overflow-y-auto rounded-3xl bg-white pb-12"
      >
        <div className="flex w-full justify-end p-5">
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex size-6 cursor-pointer items-center justify-center text-gray-800"
          >
            <CloseIcon className="size-6" aria-hidden />
          </button>
        </div>

        {step === 1 ? (
          <OnboardingStep1 onNext={goNext} />
        ) : (
          // TODO(디자인): step2·3 디자인 확정 후 구현. 임시로 건너뛰기 제공.
          <div className="flex flex-col items-center gap-4 px-10 py-8 text-center">
            <p className="text-body-1 text-gray-800">
              다음 단계({step}/{TOTAL_STEPS})는 곧 제공될 예정이에요.
            </p>
            <button
              type="button"
              onClick={() => onCompleted?.()}
              className="cursor-pointer text-label-1 font-semibold text-blue-600 underline"
            >
              건너뛰고 시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
