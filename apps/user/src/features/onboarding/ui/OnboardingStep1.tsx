"use client";

import { useState } from "react";
import { Button, TextField } from "@sidee/ui";
import type { Intent } from "@/shared/model";
import {
  useCheckNicknameAvailability,
  useUpdateOnboardingStep1,
} from "../api/queries";

const INTENT_OPTIONS: { value: Intent; label: string }[] = [
  { value: "STARTER", label: "팀원을 모아 프로젝트를 시작하고 싶어요." },
  { value: "JOINER", label: "진행 중인 프로젝트에 팀원으로 참여할래요." },
  { value: "EXPLORER", label: "일단 둘러볼게요." },
];

const NICKNAME_MIN = 2;
const NICKNAME_MAX = 15;
const NICKNAME_HINT = "2~15자, 띄어쓰기 없이 입력해 주세요.";

export interface OnboardingStep1Props {
  /** step1 저장 성공 시 다음 단계로 */
  onNext: () => void;
}

/**
 * 온보딩 Step1 — 경험(intent) 선택 + 닉네임 입력.
 *
 * - 다음 버튼 활성: intent 선택 + 닉네임 클라이언트 검증 통과(2~15자, 띄어쓰기 없음).
 * - 클릭 시: 서버 `nickname/availability` 를 먼저 호출 → available 이면 step1 저장 후 다음,
 *   아니면 중복 에러를 표시한다(길이/공백 에러는 클라, 중복 에러는 서버).
 */
export default function OnboardingStep1({ onNext }: OnboardingStep1Props) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [nickname, setNickname] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const checkAvailability = useCheckNicknameAvailability();
  const { mutate: submitStep1, isPending: isSubmitting } =
    useUpdateOnboardingStep1();

  // ── 클라이언트 검증 ──────────────────────────────────
  const hasWhitespace = /\s/.test(nickname);
  const lengthValid =
    nickname.length >= NICKNAME_MIN && nickname.length <= NICKNAME_MAX;
  const clientValid = lengthValid && !hasWhitespace;

  const clientError =
    nickname.length === 0
      ? null
      : hasWhitespace
        ? "띄어쓰기는 사용할 수 없어요."
        : !lengthValid
          ? "2~15자로 입력해 주세요."
          : null;

  const busy = checkAvailability.isPending || isSubmitting;
  const canSubmit = intent != null && clientValid && !busy;

  const invalid = clientError != null || serverError != null;
  const helperText = clientError ?? serverError ?? NICKNAME_HINT;

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setServerError(null); // 입력 변경 시 서버 에러 초기화
  };

  const handleSubmit = () => {
    if (intent == null || !canSubmit) return;
    setServerError(null);
    checkAvailability.mutate(nickname, {
      onSuccess: ({ available }) => {
        if (!available) {
          setServerError("이미 사용 중인 닉네임이에요.");
          return;
        }
        submitStep1({ intent, nickname }, { onSuccess: onNext });
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 px-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-[22px] leading-[1.364] text-gray-800">반가워요</p>
        <h2 className="text-title-2 font-bold text-gray-800">
          사이디에서 어떤 경험을 하고싶나요?
        </h2>
      </div>

      <div
        role="radiogroup"
        aria-label="경험 선택"
        className="flex w-full flex-col gap-3"
      >
        {INTENT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-4 has-[:checked]:border-blue-600"
          >
            <input
              type="radio"
              name="onboarding-intent"
              value={opt.value}
              checked={intent === opt.value}
              onChange={() => setIntent(opt.value)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className="flex size-5 items-center justify-center rounded-full border-[1.5px] border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-600"
            >
              <span className="size-2 rounded-full bg-white" />
            </span>
            <span className="text-body-1 font-medium text-gray-800">
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      <TextField
        label="닉네임"
        required
        placeholder="닉네임을 입력해 주세요."
        value={nickname}
        maxLength={NICKNAME_MAX}
        onChange={(e) => handleNicknameChange(e.target.value)}
        invalid={invalid}
        helperText={helperText}
      />

      <Button
        type="solid"
        variant="primary"
        size="l"
        className="w-full"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        다음으로
      </Button>
    </div>
  );
}
