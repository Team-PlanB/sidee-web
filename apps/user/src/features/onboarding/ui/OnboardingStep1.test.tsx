import { fireEvent, render, screen } from "@testing-library/react";
import OnboardingStep1 from "./OnboardingStep1";
import {
  useCheckNicknameAvailability,
  useUpdateOnboardingStep1,
} from "../api/queries";

jest.mock("../api/queries");

const mockCheck = useCheckNicknameAvailability as jest.Mock;
const mockUpdateStep1 = useUpdateOnboardingStep1 as jest.Mock;
const checkMutate = jest.fn();
const submit = jest.fn();

beforeEach(() => {
  checkMutate.mockReset();
  submit.mockReset();
  mockCheck.mockReturnValue({ mutate: checkMutate, isPending: false });
  mockUpdateStep1.mockReturnValue({ mutate: submit, isPending: false });
});

const selectIntent = () =>
  fireEvent.click(screen.getByText("일단 둘러볼게요."));
const typeNickname = (value: string) =>
  fireEvent.change(screen.getByLabelText(/닉네임/), { target: { value } });
const nextButton = () => screen.getByRole("button", { name: "다음으로" });

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
    expect(nextButton()).toBeDisabled();
  });

  it("경험 미선택이면 유효한 닉네임이어도 다음 버튼이 비활성이다", () => {
    render(<OnboardingStep1 onNext={jest.fn()} />);
    typeNickname("홍길동");
    expect(nextButton()).toBeDisabled();
  });

  it("닉네임 길이(2~15자)와 띄어쓰기는 클라이언트에서 막는다", () => {
    render(<OnboardingStep1 onNext={jest.fn()} />);
    selectIntent();

    typeNickname("가"); // 1자
    expect(screen.getByText("2~15자로 입력해 주세요.")).toBeInTheDocument();
    expect(nextButton()).toBeDisabled();

    typeNickname("홍 길동"); // 공백 포함
    expect(screen.getByText("띄어쓰기는 사용할 수 없어요.")).toBeInTheDocument();
    expect(nextButton()).toBeDisabled();

    // availability 를 호출하지 않았다
    expect(checkMutate).not.toHaveBeenCalled();
  });

  it("클릭 시 availability 를 호출하고 available=true 면 step1 을 저장한다", () => {
    checkMutate.mockImplementation((_nickname, opts) =>
      opts.onSuccess({ available: true }),
    );
    const onNext = jest.fn();
    render(<OnboardingStep1 onNext={onNext} />);

    selectIntent();
    typeNickname("홍길동");
    expect(nextButton()).toBeEnabled();
    fireEvent.click(nextButton());

    expect(checkMutate).toHaveBeenCalledWith("홍길동", expect.anything());
    expect(submit).toHaveBeenCalledWith(
      { intent: "EXPLORER", nickname: "홍길동" },
      expect.objectContaining({ onSuccess: onNext }),
    );
  });

  it("available=false 면 서버 중복 에러를 표시하고 step1 을 저장하지 않는다", () => {
    checkMutate.mockImplementation((_nickname, opts) =>
      opts.onSuccess({ available: false }),
    );
    render(<OnboardingStep1 onNext={jest.fn()} />);

    selectIntent();
    typeNickname("중복닉");
    fireEvent.click(nextButton());

    expect(screen.getByText("이미 사용 중인 닉네임이에요.")).toBeInTheDocument();
    expect(submit).not.toHaveBeenCalled();
  });
});
