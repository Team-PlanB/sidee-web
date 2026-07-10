"use client";

import { useEffect, useState } from "react";
import { Button, TextField } from "@sidee/ui";
import type { Intent } from "@/shared/model";
import {
  useNicknameAvailability,
  useUpdateOnboardingStep1,
} from "../api/queries";

const INTENT_OPTIONS: { value: Intent; label: string }[] = [
  { value: "STARTER", label: "팀원을 모아 프로젝트를 시작하고 싶어요." },
  { value: "JOINER", label: "진행 중인 프로젝트에 팀원으로 참여할래요." },
  { value: "EXPLORER", label: "일단 둘러볼게요." },
];

const NICKNAME_MIN = 2;
const NICKNAME_MAX = 15;
const NICKNAME_DEBOUNCE_MS = 300;

export interface OnboardingStep1Props {
  /** step1 저장 성공 시 다음 단계로 */
  onNext: () => void;
}

/**
 * 온보딩 Step1 — 경험(intent) 선택 + 닉네임 입력.
 * 닉네임은 디바운스 후 중복확인(useNicknameAvailability)하고,
 * intent 선택 + 유효/사용가능 닉네임일 때만 다음으로 진행한다.
 */
export default function OnboardingStep1({ onNext }: OnboardingStep1Props) {
  const [intent, setIntent] = useState<Intent | null>(null);
  const [nickname, setNickname] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(nickname), NICKNAME_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [nickname]);

  const lengthValid =
    nickname.length >= NICKNAME_MIN && nickname.length <= NICKNAME_MAX;
  const debouncedValid =
    debounced.length >= NICKNAME_MIN && debounced.length <= NICKNAME_MAX;

  const availability = useNicknameAvailability(debounced, {
    enabled: debouncedValid,
  });
  const available = availability.data?.available;

  const { mutate: submitStep1, isPending } = useUpdateOnboardingStep1();

  const invalid = lengthValid && available === false;
  const helperText =
    !lengthValid
      ? "2~15자로 입력해 주세요."
      : available === false
        ? "이미 사용 중인 닉네임이에요."
        : available === true
          ? "사용할 수 있는 닉네임이에요."
          : "닉네임 중복을 확인하고 있어요.";

  const canSubmit =
    intent != null && lengthValid && available === true && !isPending;

  const handleSubmit = () => {
    if (intent == null || !canSubmit) return;
    submitStep1({ intent, nickname }, { onSuccess: onNext });
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
        onChange={(e) => setNickname(e.target.value)}
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
        다음
      </Button>
    </div>
  );
}
