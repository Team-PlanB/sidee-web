export type {
  UpdateStep1Request,
  UpdateStep2Request,
  UpdateStep3Request,
  NicknameAvailabilityResponse,
} from "./api/dto";
export type { OnboardingState } from "./api/onboardingApi";
export {
  checkNicknameAvailability,
  updateOnboardingStep1,
  updateOnboardingStep2,
  updateOnboardingStep3,
} from "./api/onboardingApi";
export { onboardingKeys } from "./api/queryKeys";
export {
  useNicknameAvailability,
  useCheckNicknameAvailability,
  useUpdateOnboardingStep1,
  useUpdateOnboardingStep2,
  useUpdateOnboardingStep3,
} from "./api/queries";
export { default as OnboardingModal } from "./ui/OnboardingModal";
export type { OnboardingModalProps } from "./ui/OnboardingModal";
