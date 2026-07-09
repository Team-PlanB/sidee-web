import { fireEvent, render, screen } from "@testing-library/react";
import LoginModal from "./LoginModal";
import { getOAuthStartUrl } from "../api/authApi";

// jsdom 은 실제 navigation 을 구현하지 않으므로 OAuth 시작 URL 생성기를
// 목으로 대체하고, 이동은 hash 로만 바꿔 클릭→provider 매핑만 검증한다.
jest.mock("../api/authApi", () => ({
  getOAuthStartUrl: jest.fn((provider: string) => `#oauth-${provider}`),
}));

const mockGetOAuthStartUrl = getOAuthStartUrl as jest.Mock;

beforeEach(() => {
  mockGetOAuthStartUrl.mockClear();
});

describe("LoginModal", () => {
  it("open=false 이면 렌더되지 않는다", () => {
    render(<LoginModal open={false} onClose={jest.fn()} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("open=true 이면 제목과 소셜 로그인 버튼을 렌더한다", () => {
    render(<LoginModal open onClose={jest.fn()} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText("Sidee에 오신 것을 환영합니다!"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Kakao 계정으로 계속하기" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Google 계정으로 계속하기" }),
    ).toBeInTheDocument();
  });

  it("X 버튼을 누르면 onClose 를 호출한다", () => {
    const onClose = jest.fn();
    render(<LoginModal open onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("딤 배경을 누르면 닫히고, 카드 내부 클릭은 닫지 않는다", () => {
    const onClose = jest.fn();
    render(<LoginModal open onClose={onClose} />);

    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("login-modal-overlay"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Esc 키를 누르면 onClose 를 호출한다", () => {
    const onClose = jest.fn();
    render(<LoginModal open onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("카카오 로그인 클릭 시 kakao provider 로 OAuth 를 시작한다", () => {
    render(<LoginModal open onClose={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Kakao 계정으로 계속하기" }));
    expect(mockGetOAuthStartUrl).toHaveBeenCalledWith("kakao");
  });

  it("구글 로그인 클릭 시 google provider 로 OAuth 를 시작한다", () => {
    render(<LoginModal open onClose={jest.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "Google 계정으로 계속하기" }));
    expect(mockGetOAuthStartUrl).toHaveBeenCalledWith("google");
  });
});
