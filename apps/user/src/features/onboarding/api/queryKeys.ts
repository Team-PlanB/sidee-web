export const onboardingKeys = {
  all: ["onboarding"] as const,
  nicknameAvailability: (nickname: string) =>
    [...onboardingKeys.all, "nickname-availability", nickname] as const,
};
