import { fireEvent, render, screen } from "@testing-library/react";
import OnboardingStep3 from "./OnboardingStep3";
import { useUpdateOnboardingStep3 } from "../api/queries";
import {
  COLLABORATION_TRAIT_OPTIONS,
  COMMUNICATION_STYLE_OPTIONS,
} from "../model/step3Options";

jest.mock("../api/queries");

const mockUpdateStep3 = useUpdateOnboardingStep3 as jest.Mock;
const submit = jest.fn();

beforeEach(() => {
  submit.mockReset();
  mockUpdateStep3.mockReturnValue({ mutate: submit, isPending: false });
});

const clickBtn = (name: string) =>
  fireEvent.click(screen.getByRole("button", { name }));

const traitLabel = (i: number) => COLLABORATION_TRAIT_OPTIONS[i].label;
const styleLabel = (i: number) => COMMUNICATION_STYLE_OPTIONS[i].label;

describe("OnboardingStep3", () => {
  it("제목 · 성향 섹션 · 시간대 · 버튼을 렌더한다", () => {
    render(<OnboardingStep3 onNext={jest.fn()} onPrev={jest.fn()} />);
    expect(screen.getByText("나는 이런 팀원이에요")).toBeInTheDocument();
    expect(screen.getByText("협업 성향 0/3")).toBeInTheDocument();
    expect(screen.getByText("소통 성향 0/2")).toBeInTheDocument();
    ["평일 오전, 낮", "평일 저녁, 밤", "주말 오전, 낮", "주말 저녁, 밤"].forEach(
      (l) =>
        expect(screen.getByRole("radio", { name: l })).toBeInTheDocument(),
    );
    expect(screen.getByRole("button", { name: "다음으로" })).toBeInTheDocument();
  });

  it("협업 성향은 최대 3개까지 선택된다", () => {
    render(<OnboardingStep3 onNext={jest.fn()} onPrev={jest.fn()} />);
    [0, 1, 2].forEach((i) => clickBtn(traitLabel(i)));
    expect(screen.getByText("협업 성향 3/3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: traitLabel(3) })).toBeDisabled();
  });

  it("소통 성향은 최대 2개까지 선택된다", () => {
    render(<OnboardingStep3 onNext={jest.fn()} onPrev={jest.fn()} />);
    [0, 1].forEach((i) => clickBtn(styleLabel(i)));
    expect(screen.getByText("소통 성향 2/2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: styleLabel(2) })).toBeDisabled();
  });

  it("활동 시간대는 단일 선택이다", () => {
    render(<OnboardingStep3 onNext={jest.fn()} onPrev={jest.fn()} />);
    const weekdayDay = screen.getByRole("radio", { name: "평일 오전, 낮" });
    const weekendDay = screen.getByRole("radio", { name: "주말 오전, 낮" });
    fireEvent.click(weekdayDay);
    expect(weekdayDay).toHaveAttribute("aria-checked", "true");
    fireEvent.click(weekendDay);
    expect(weekdayDay).toHaveAttribute("aria-checked", "false");
    expect(weekendDay).toHaveAttribute("aria-checked", "true");
  });

  it("다음으로 클릭 시 선택 값으로 step3 을 저장한다", () => {
    const onNext = jest.fn();
    render(<OnboardingStep3 onNext={onNext} onPrev={jest.fn()} />);
    clickBtn(traitLabel(1)); // EXECUTION
    clickBtn(styleLabel(1)); // ON_DEMAND
    fireEvent.click(screen.getByRole("radio", { name: "평일 저녁, 밤" }));
    clickBtn("다음으로");
    expect(submit).toHaveBeenCalledWith(
      {
        collaborationTraits: [COLLABORATION_TRAIT_OPTIONS[1].value],
        communicationStyles: [COMMUNICATION_STYLE_OPTIONS[1].value],
        availability: "WEEKDAY_NIGHT",
      },
      expect.objectContaining({ onSuccess: onNext }),
    );
  });

  it("건너뛰기 클릭 시 빈 값으로 step3 을 호출한다", () => {
    render(<OnboardingStep3 onNext={jest.fn()} onPrev={jest.fn()} />);
    clickBtn("건너뛰기");
    expect(submit).toHaveBeenCalledWith({}, expect.anything());
  });

  it("이전 클릭 시 onPrev 를 호출한다", () => {
    const onPrev = jest.fn();
    render(<OnboardingStep3 onNext={jest.fn()} onPrev={onPrev} />);
    clickBtn("이전");
    expect(onPrev).toHaveBeenCalledTimes(1);
  });
});
