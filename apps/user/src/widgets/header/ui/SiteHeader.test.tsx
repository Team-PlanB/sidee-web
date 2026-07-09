import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { useAuthStore } from "@/features/auth";
import SiteHeader from "./SiteHeader";

/** 로그인 상태 + QueryClient(로그아웃 뮤테이션용) 로 렌더 */
function renderLoggedIn() {
  useAuthStore.setState({ accessToken: "token" });
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <SiteHeader />
    </QueryClientProvider>,
  );
}

describe("SiteHeader", () => {
  afterEach(() => {
    useAuthStore.setState({ accessToken: null, user: null });
  });

  it("로그인 상태에서 알림(종) 클릭 시 알림 패널이 열린다", () => {
    renderLoggedIn();
    fireEvent.click(screen.getByRole("button", { name: "알림" }));
    expect(screen.getByRole("dialog", { name: "알림" })).toBeInTheDocument();
  });

  it("로그인 상태에서 프로필 클릭 시 프로필 메뉴(로그아웃 포함)가 열린다", () => {
    renderLoggedIn();
    fireEvent.click(screen.getByRole("button", { name: "프로필" }));
    expect(
      screen.getByRole("menu", { name: "프로필 메뉴" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", { name: "로그아웃" }),
    ).toBeInTheDocument();
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
