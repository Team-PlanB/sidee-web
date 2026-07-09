import { fireEvent, render, screen } from "@testing-library/react";
import { useAuthStore } from "@/features/auth";
import SiteHeader from "./SiteHeader";

describe("SiteHeader", () => {
  afterEach(() => {
    useAuthStore.setState({ accessToken: null, user: null });
  });

  it("로그인/회원가입 클릭 시 로그인 모달을 연다", () => {
    render(<SiteHeader />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "로그인/회원가입" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("accessToken 이 없으면 미로그인 헤더를 렌더한다", () => {
    render(<SiteHeader />);
    expect(
      screen.getByRole("button", { name: "로그인/회원가입" }),
    ).toBeInTheDocument();
  });

  it("accessToken 이 있으면 로그인 헤더를 렌더한다", () => {
    useAuthStore.setState({ accessToken: "token" });
    render(<SiteHeader />);
    expect(screen.getByRole("button", { name: "프로필" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "알림" })).toBeInTheDocument();
  });
});
