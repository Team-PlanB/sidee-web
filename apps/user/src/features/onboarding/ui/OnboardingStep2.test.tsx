import { fireEvent, render, screen } from "@testing-library/react";
import OnboardingStep2 from "./OnboardingStep2";
import { MOCK_SKILLS } from "../model/step2Options";
import { useUpdateOnboardingStep2 } from "../api/queries";

jest.mock("../api/queries");

const mockUpdateStep2 = useUpdateOnboardingStep2 as jest.Mock;
const submit = jest.fn();

beforeEach(() => {
  submit.mockReset();
  mockUpdateStep2.mockReturnValue({ mutate: submit, isPending: false });
});

const clickBtn = (name: string) =>
  fireEvent.click(screen.getByRole("button", { name }));

describe("OnboardingStep2", () => {
  it("역할 4개와 스킬 안내, 이전/다음으로/건너뛰기 버튼을 렌더한다", () => {
    render(<OnboardingStep2 onNext={jest.fn()} onPrev={jest.fn()} />);
    expect(
      screen.getByText("어떤 역할로 함께하고 싶은가요?"),
    ).toBeInTheDocument();
    ["기획", "디자인", "개발", "마케팅"].forEach((r) =>
      expect(screen.getByRole("button", { name: r })).toBeInTheDocument(),
    );
    expect(
      screen.getByText("보유하고 있는 기술 스택을 선택해 주세요. (최대 10개)"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "이전" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음으로" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "건너뛰기" })).toBeInTheDocument();
  });

  it("역할은 복수 선택(토글)된다", () => {
    render(<OnboardingStep2 onNext={jest.fn()} onPrev={jest.fn()} />);
    const dev = screen.getByRole("button", { name: "개발" });
    expect(dev).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(dev);
    expect(dev).toHaveAttribute("aria-pressed", "true");
  });

  it("스킬은 최대 10개까지만 선택할 수 있다", () => {
    render(<OnboardingStep2 onNext={jest.fn()} onPrev={jest.fn()} />);
    MOCK_SKILLS.slice(0, 10).forEach((skill) => clickBtn(skill));
    // 11번째 미선택 칩은 비활성화된다
    expect(screen.getByRole("button", { name: MOCK_SKILLS[10] })).toBeDisabled();
    // 이미 선택된 칩은 여전히 눌러서 해제 가능
    expect(screen.getByRole("button", { name: MOCK_SKILLS[0] })).toBeEnabled();
  });

  it("다음으로 클릭 시 선택한 역할/스킬로 step2 를 저장한다", () => {
    const onNext = jest.fn();
    render(<OnboardingStep2 onNext={onNext} onPrev={jest.fn()} />);
    clickBtn("개발");
    clickBtn("React");
    clickBtn("다음으로");
    expect(submit).toHaveBeenCalledWith(
      { roles: ["DEVELOPER"], skills: ["React"] },
      expect.objectContaining({ onSuccess: onNext }),
    );
  });

  it("건너뛰기 클릭 시 빈 값으로 step2 를 호출하고 다음으로 넘어간다", () => {
    const onNext = jest.fn();
    render(<OnboardingStep2 onNext={onNext} onPrev={jest.fn()} />);
    clickBtn("건너뛰기");
    expect(submit).toHaveBeenCalledWith(
      {},
      expect.objectContaining({ onSuccess: onNext }),
    );
  });

  it("이전 클릭 시 onPrev 를 호출한다", () => {
    const onPrev = jest.fn();
    render(<OnboardingStep2 onNext={jest.fn()} onPrev={onPrev} />);
    clickBtn("이전");
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
