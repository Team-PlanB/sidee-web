import { httpClient } from "@/shared/api";
import type { Me } from "@/entities/user";
import type {
  NicknameAvailabilityResponse,
  UpdateStep1Request,
  UpdateStep2Request,
  UpdateStep3Request,
} from "./dto";

/**
 * 온보딩 단계 응답 — `OnboardingStateResponseDto`.
 * `MeResponseDto` 와 동형(`{ user, profile }`)이라 entities/user 의 `Me` 를 재사용한다.
 * (user.onboardingStep / profile 의 현재까지 채워진 필드를 담는다)
 */
export type OnboardingState = Me;

/** GET /onboarding/nickname/availability — 닉네임 사용 가능 여부 */
export function checkNicknameAvailability(
  nickname: string,
  signal?: AbortSignal,
): Promise<NicknameAvailabilityResponse> {
  return httpClient.get<NicknameAvailabilityResponse>(
    "/onboarding/nickname/availability",
    { query: { nickname }, signal },
  );
}

/** PATCH /onboarding/step/1 — intent + nickname. 409 = 닉네임 중복 */
export function updateOnboardingStep1(
  body: UpdateStep1Request,
): Promise<OnboardingState> {
  return httpClient.patch<OnboardingState>("/onboarding/step/1", body);
}

/** PATCH /onboarding/step/2 — roles + skills (skip 가능) */
export function updateOnboardingStep2(
  body: UpdateStep2Request,
): Promise<OnboardingState> {
  return httpClient.patch<OnboardingState>("/onboarding/step/2", body);
}

/** PATCH /onboarding/step/3 — 협업 성향 / 소통 스타일 / 시간대 (skip 가능) */
export function updateOnboardingStep3(
  body: UpdateStep3Request,
): Promise<OnboardingState> {
  return httpClient.patch<OnboardingState>("/onboarding/step/3", body);
}
