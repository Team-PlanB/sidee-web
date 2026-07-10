"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, FilterChip } from "@sidee/ui";
import sunIcon from "@sidee/ui/assets/svg/sun.svg";
import moonIcon from "@sidee/ui/assets/svg/moon.svg";
import type {
  AvailabilityPreset,
  CollaborationTrait,
  CommunicationStyle,
} from "@/shared/model";
import { useUpdateOnboardingStep3 } from "../api/queries";
import type { UpdateStep3Request } from "../api/dto";
import {
  AVAILABILITY_OPTIONS,
  COLLABORATION_TRAIT_OPTIONS,
  COMMUNICATION_STYLE_OPTIONS,
  MAX_STYLES,
  MAX_TRAITS,
} from "../model/step3Options";

export interface OnboardingStep3Props {
  /** step3 저장 성공 시 (온보딩 완료) */
  onNext: () => void;
  /** 이전 단계로 */
  onPrev: () => void;
}

/**
 * 온보딩 Step3(마지막) — 협업 성향(최대 3) · 소통 성향(최대 2) · 활동 시간대(단일).
 *
 * 모두 선택 사항(skip 가능). availability 는 preset 코드 하나만 보내며
 * 서버가 주간 시간표로 확장한다. "다음으로"/"건너뛰기" 모두 step/3 을 저장한다.
 */
export default function OnboardingStep3({ onNext, onPrev }: OnboardingStep3Props) {
  const [traits, setTraits] = useState<CollaborationTrait[]>([]);
  const [styles, setStyles] = useState<CommunicationStyle[]>([]);
  const [availability, setAvailability] = useState<AvailabilityPreset | null>(
    null,
  );
  const { mutate: submitStep3, isPending } = useUpdateOnboardingStep3();

  const toggleFrom = <T,>(list: T[], value: T, max: number): T[] => {
    if (list.includes(value)) return list.filter((v) => v !== value);
    if (list.length >= max) return list;
    return [...list, value];
  };

  const submit = (body: UpdateStep3Request) =>
    submitStep3(body, { onSuccess: onNext });

  const handleNext = () =>
    submit({
      collaborationTraits: traits,
      communicationStyles: styles,
      ...(availability ? { availability } : {}),
    });

  return (
    <div className="flex w-full flex-col items-center gap-6 px-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-[22px] leading-[1.364] text-gray-800">
          나를 표현하는 키워드를 골라봐요!
        </p>
        <h2 className="text-title-2 font-bold text-gray-800">
          나는 이런 팀원이에요
        </h2>
      </div>

      {/* 협업 성향 (최대 3) */}
      <ChipGroup
        title="협업 성향"
        count={traits.length}
        max={MAX_TRAITS}
        options={COLLABORATION_TRAIT_OPTIONS}
        selected={traits}
        onToggle={(v) => setTraits((prev) => toggleFrom(prev, v, MAX_TRAITS))}
      />

      {/* 소통 성향 (최대 2) */}
      <ChipGroup
        title="소통 성향"
        count={styles.length}
        max={MAX_STYLES}
        options={COMMUNICATION_STYLE_OPTIONS}
        selected={styles}
        onToggle={(v) => setStyles((prev) => toggleFrom(prev, v, MAX_STYLES))}
      />

      {/* 활동 가능 시간대 (단일 선택) */}
      <div className="flex w-full flex-col items-center gap-4">
        <p className="text-body-1 text-gray-800">
          활동 가능한 시간을 알려주세요
        </p>
        <div
          role="radiogroup"
          aria-label="활동 가능 시간"
          className="grid w-full grid-cols-2 gap-3"
        >
          {AVAILABILITY_OPTIONS.map((opt) => {
            const checked = availability === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() =>
                  setAvailability((cur) => (cur === opt.value ? null : opt.value))
                }
                className={`flex h-[76px] cursor-pointer items-center justify-between rounded-lg border p-4 ${
                  checked
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Image
                    src={opt.period === "day" ? sunIcon : moonIcon}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6"
                  />
                  <span className="text-body-1 font-medium text-gray-800">
                    {opt.label}
                  </span>
                </span>
                <span
                  aria-hidden
                  className={`flex size-5 items-center justify-center rounded-full border-[1.5px] ${
                    checked ? "border-blue-600 bg-blue-600" : "border-gray-200"
                  }`}
                >
                  <span className="size-2 rounded-full bg-white" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 푸터 */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-2">
          <Button
            type="outlined"
            variant="secondary"
            size="l"
            onClick={onPrev}
            disabled={isPending}
            className="shrink-0"
          >
            이전
          </Button>
          <Button
            type="solid"
            variant="primary"
            size="l"
            onClick={handleNext}
            disabled={isPending}
            className="flex-1"
          >
            다음으로
          </Button>
        </div>
        <button
          type="button"
          onClick={() => submit({})}
          disabled={isPending}
          className="cursor-pointer py-2 text-label-1 font-medium text-gray-800"
        >
          건너뛰기
        </button>
      </div>
    </div>
  );
}

/** 카운터가 붙은 선택 칩 그룹 (협업/소통 성향 공용) */
function ChipGroup<T extends string>({
  title,
  count,
  max,
  options,
  selected,
  onToggle,
}: {
  title: string;
  count: number;
  max: number;
  options: { value: T; label: string }[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  const full = count >= max;
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-body-1 font-medium text-gray-800">
        {title} {count}/{max}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <FilterChip
              key={opt.value}
              size="medium"
              selected={isSelected}
              disabled={!isSelected && full}
              onClick={() => onToggle(opt.value)}
            >
              {opt.label}
            </FilterChip>
          );
        })}
      </div>
    </div>
  );
}
