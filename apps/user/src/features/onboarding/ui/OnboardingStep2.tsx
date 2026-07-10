"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Button, FilterChip } from "@sidee/ui";
import plannerIcon from "@sidee/ui/assets/svg/planner.svg";
import designerIcon from "@sidee/ui/assets/svg/designer.svg";
import developerIcon from "@sidee/ui/assets/svg/developer.svg";
import marketerIcon from "@sidee/ui/assets/svg/marketer.svg";
import type { Role } from "@/shared/model";
import { useUpdateOnboardingStep2 } from "../api/queries";
import { MAX_SKILLS, MOCK_SKILLS, ROLE_OPTIONS } from "../model/step2Options";

const ROLE_ICON: Record<Role, StaticImageData> = {
  PLANNER: plannerIcon,
  DESIGNER: designerIcon,
  DEVELOPER: developerIcon,
  MARKETER: marketerIcon,
};

export interface OnboardingStep2Props {
  /** step2 저장 성공 시 다음 단계로 */
  onNext: () => void;
  /** 이전 단계로 */
  onPrev: () => void;
}

/**
 * 온보딩 Step2 — 역할(복수 선택) + 기술 스택(최대 10개) 선택.
 *
 * 두 값 모두 선택 사항(skip 가능)이라 "건너뛰기"도 제공한다.
 * "다음으로"/"건너뛰기" 모두 `PATCH /onboarding/step/2` 를 호출해 진행 단계를 저장한다.
 * (디자인은 온보딩-3 화면을 사용하지만 엔드포인트는 step/2 로 호출)
 */
export default function OnboardingStep2({ onNext, onPrev }: OnboardingStep2Props) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const { mutate: submitStep2, isPending } = useUpdateOnboardingStep2();

  const skillsFull = skills.length >= MAX_SKILLS;

  const toggleRole = (role: Role) =>
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );

  const toggleSkill = (skill: string) =>
    setSkills((prev) => {
      if (prev.includes(skill)) return prev.filter((s) => s !== skill);
      if (prev.length >= MAX_SKILLS) return prev;
      return [...prev, skill];
    });

  const submit = (body: { roles?: Role[]; skills?: string[] }) =>
    submitStep2(body, { onSuccess: onNext });

  return (
    <div className="flex w-full flex-col items-center gap-6 px-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-[22px] leading-[1.364] text-gray-800">
          본업과 달라도 괜찮아요, 새로운 경험을 해보세요!
        </p>
        <h2 className="text-title-2 font-bold text-gray-800">
          어떤 역할로 함께하고 싶은가요?
        </h2>
      </div>

      {/* 역할 2×2 (복수 선택) */}
      <div role="group" aria-label="역할 선택" className="grid w-full grid-cols-2 gap-3">
        {ROLE_OPTIONS.map((opt) => {
          const selected = roles.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={selected}
              onClick={() => toggleRole(opt.value)}
              className={`flex h-[140px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border ${
                selected
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <Image
                src={ROLE_ICON[opt.value]}
                alt=""
                width={88}
                height={88}
                className="size-[88px]"
              />
              <span className="text-body-1 font-medium text-gray-800">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 기술 스택 (최대 10개) */}
      <div className="flex w-full flex-col items-center gap-4">
        <p className="text-body-1 text-gray-800">
          보유하고 있는 기술 스택을 선택해 주세요. (최대 {MAX_SKILLS}개)
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {MOCK_SKILLS.map((skill) => {
            const selected = skills.includes(skill);
            return (
              <FilterChip
                key={skill}
                size="medium"
                selected={selected}
                disabled={!selected && skillsFull}
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </FilterChip>
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
            onClick={() => submit({ roles, skills })}
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
