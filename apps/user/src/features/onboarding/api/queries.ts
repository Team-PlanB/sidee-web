"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { userKeys } from "@/entities/user";
import {
  checkNicknameAvailability,
  updateOnboardingStep1,
  updateOnboardingStep2,
  updateOnboardingStep3,
  type OnboardingState,
} from "./onboardingApi";
import { onboardingKeys } from "./queryKeys";
import type {
  NicknameAvailabilityResponse,
  UpdateStep1Request,
  UpdateStep2Request,
  UpdateStep3Request,
} from "./dto";

/**
 * 닉네임 사용 가능 여부 조회.
 * `enabled` 로 디바운스된 유효 닉네임일 때만 호출하도록 호출부에서 제어한다.
 */
export function useNicknameAvailability(
  nickname: string,
  options?: { enabled?: boolean },
): UseQueryResult<NicknameAvailabilityResponse> {
  return useQuery({
    queryKey: onboardingKeys.nicknameAvailability(nickname),
    queryFn: ({ signal }) => checkNicknameAvailability(nickname, signal),
    enabled: (options?.enabled ?? true) && nickname.length > 0,
  });
}

/**
 * 닉네임 사용 가능 여부를 **명령형(on-demand)** 으로 확인한다.
 * CTA 클릭 시 1회 호출해 available 응답으로 다음 진행/에러를 분기할 때 쓴다.
 */
export function useCheckNicknameAvailability(): UseMutationResult<
  NicknameAvailabilityResponse,
  Error,
  string
> {
  return useMutation({
    mutationFn: (nickname: string) => checkNicknameAvailability(nickname),
  });
}

/** 온보딩 단계 성공 시 me 캐시를 갱신하는 mutation 팩토리 */
function useOnboardingStep<TBody>(
  mutationFn: (body: TBody) => Promise<OnboardingState>,
): UseMutationResult<OnboardingState, Error, TBody> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (state) => {
      queryClient.setQueryData(userKeys.me(), state);
    },
  });
}

export const useUpdateOnboardingStep1 = (): UseMutationResult<
  OnboardingState,
  Error,
  UpdateStep1Request
> => useOnboardingStep(updateOnboardingStep1);

export const useUpdateOnboardingStep2 = (): UseMutationResult<
  OnboardingState,
  Error,
  UpdateStep2Request
> => useOnboardingStep(updateOnboardingStep2);

export const useUpdateOnboardingStep3 = (): UseMutationResult<
  OnboardingState,
  Error,
  UpdateStep3Request
> => useOnboardingStep(updateOnboardingStep3);
