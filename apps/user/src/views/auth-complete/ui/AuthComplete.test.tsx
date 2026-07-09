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

beforeEach(() => {
  replace.mockClear();
  mutate.mockReset();
});

describe("AuthComplete", () => {
  it("마운트 시 refresh 를 1회 호출한다", () => {
    render(<AuthComplete />);
    expect(mutate).toHaveBeenCalledTimes(1);
  });

  it("refresh 성공 시 홈으로 이동한다", () => {
    mutate.mockImplementation((_vars, opts) => opts.onSuccess());
    render(<AuthComplete />);
    expect(replace).toHaveBeenCalledWith("/");
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
