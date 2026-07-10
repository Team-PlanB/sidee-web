import { render, screen } from "@testing-library/react";
import AuthComplete from "./AuthComplete";

const replace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
}));

const mutate = jest.fn();
jest.mock("@/features/auth", () => ({
  useRefresh: () => ({ mutate }),
}));

jest.mock("@/features/onboarding", () => ({
  OnboardingModal: () => <div data-testid="onboarding-modal" />,
}));

/** onboardingCompletedAt 을 지정한 refresh 성공 응답 */
const successWith = (onboardingCompletedAt: string | null) =>
  (_vars: unknown, opts: { onSuccess: (data: unknown) => void }) =>
    opts.onSuccess({ user: { onboardingCompletedAt } });

beforeEach(() => {
  replace.mockClear();
  mutate.mockReset();
});

describe("AuthComplete", () => {
  it("마운트 시 refresh 를 1회 호출한다", () => {
    render(<AuthComplete />);
    expect(mutate).toHaveBeenCalledTimes(1);
  });

  it("온보딩을 이미 완료한 사용자는 홈으로 이동한다", () => {
    mutate.mockImplementation(successWith("2026-01-01T00:00:00Z"));
    render(<AuthComplete />);
    expect(replace).toHaveBeenCalledWith("/");
    expect(screen.queryByTestId("onboarding-modal")).not.toBeInTheDocument();
  });

  it("처음 가입한(온보딩 미완료) 사용자는 온보딩 모달을 띄운다", () => {
    mutate.mockImplementation(successWith(null));
    render(<AuthComplete />);
    expect(screen.getByTestId("onboarding-modal")).toBeInTheDocument();
    expect(replace).not.toHaveBeenCalled();
  });

  it("refresh 실패 시에도 홈으로 이동한다", () => {
    mutate.mockImplementation((_vars, opts) => opts.onError());
    render(<AuthComplete />);
    expect(replace).toHaveBeenCalledWith("/");
  });

  it("진행 중 로딩 문구를 노출한다", () => {
    render(<AuthComplete />);
    expect(screen.getByText("로그인 중이에요…")).toBeInTheDocument();
  });
});
