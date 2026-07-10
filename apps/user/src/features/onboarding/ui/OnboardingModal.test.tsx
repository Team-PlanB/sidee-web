import { fireEvent, render, screen } from "@testing-library/react";
import OnboardingModal from "./OnboardingModal";

jest.mock("./OnboardingStep1", () => ({
  __esModule: true,
  default: () => <div data-testid="onboarding-step1" />,
}));

describe("OnboardingModal", () => {
  it("open=false 이면 렌더되지 않는다", () => {
    render(<OnboardingModal open={false} onClose={jest.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("open=true 이면 다이얼로그와 step1 을 렌더한다", () => {
    render(<OnboardingModal open onClose={jest.fn()} />);
    expect(screen.getByRole("dialog", { name: "온보딩" })).toBeInTheDocument();
    expect(screen.getByTestId("onboarding-step1")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onClose 를 호출한다", () => {
    const onClose = jest.fn();
    render(<OnboardingModal open onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
