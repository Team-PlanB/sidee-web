import { fireEvent, render, screen } from "@testing-library/react";
import OnboardingStep1 from "./OnboardingStep1";
import {
  useNicknameAvailability,
  useUpdateOnboardingStep1,
} from "../api/queries";

jest.mock("../api/queries");

const mockAvailability = useNicknameAvailability as jest.Mock;
const mockUpdateStep1 = useUpdateOnboardingStep1 as jest.Mock;
const submit = jest.fn();

beforeEach(() => {
  submit.mockClear();
  mockAvailability.mockReturnValue({ data: undefined });
  mockUpdateStep1.mockReturnValue({ mutate: submit, isPending: false });
});

describe("OnboardingStep1", () => {
  it("경험 선택지 3개와 비활성 상태의 다음 버튼을 렌더한다", () => {
    render(<OnboardingStep1 onNext={jest.fn()} />);
    expect(
      screen.getByText("팀원을 모아 프로젝트를 시작하고 싶어요."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("진행 중인 프로젝트에 팀원으로 참여할래요."),
    ).toBeInTheDocument();
    expect(screen.getByText("일단 둘러볼게요.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("경험 선택 + 사용 가능한 닉네임이면 다음 버튼이 활성화되고, 클릭 시 step1 을 저장한다", () => {
    mockAvailability.mockReturnValue({ data: { available: true } });
    const onNext = jest.fn();
    render(<OnboardingStep1 onNext={onNext} />);

    fireEvent.click(screen.getByText("일단 둘러볼게요."));
    fireEvent.change(screen.getByLabelText(/닉네임/), {
      target: { value: "홍길동" },
    });

    const next = screen.getByRole("button", { name: "다음" });
    expect(next).toBeEnabled();
    fireEvent.click(next);

    expect(submit).toHaveBeenCalledWith(
      { intent: "EXPLORER", nickname: "홍길동" },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    );
  });

  it("이미 사용 중인 닉네임이면 에러 문구와 함께 다음 버튼이 비활성화된다", () => {
    mockAvailability.mockReturnValue({ data: { available: false } });
    render(<OnboardingStep1 onNext={jest.fn()} />);

    fireEvent.click(screen.getByText("일단 둘러볼게요."));
    fireEvent.change(screen.getByLabelText(/닉네임/), {
      target: { value: "중복닉" },
    });

    expect(screen.getByText("이미 사용 중인 닉네임이에요.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });
});
