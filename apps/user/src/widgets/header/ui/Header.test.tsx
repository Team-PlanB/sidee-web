import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("banner 랜드마크와 홈 로고 링크를 렌더링한다", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sidee/ })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("'팀원 모집하기' 버튼은 로그인 여부와 무관하게 항상 있다", () => {
    const { rerender } = render(<Header isLoggedIn={false} />);
    expect(
      screen.getByRole("button", { name: "팀원 모집하기" }),
    ).toBeInTheDocument();
    rerender(<Header isLoggedIn />);
    expect(
      screen.getByRole("button", { name: "팀원 모집하기" }),
    ).toBeInTheDocument();
  });

  describe("미로그인", () => {
    it("로그인/회원가입 버튼을 노출하고, 알림/프로필은 없다", () => {
      render(<Header isLoggedIn={false} />);
      expect(
        screen.getByRole("button", { name: "로그인/회원가입" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "알림" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "프로필" }),
      ).not.toBeInTheDocument();
    });

    it("'팀원 모집하기' / '로그인/회원가입' 클릭 콜백이 호출된다", () => {
      const onRecruitClick = jest.fn();
      const onAuthClick = jest.fn();
      render(
        <Header
          isLoggedIn={false}
          onRecruitClick={onRecruitClick}
          onAuthClick={onAuthClick}
        />,
      );
      screen.getByRole("button", { name: "팀원 모집하기" }).click();
      screen.getByRole("button", { name: "로그인/회원가입" }).click();
      expect(onRecruitClick).toHaveBeenCalledTimes(1);
      expect(onAuthClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("로그인", () => {
    it("알림/프로필 버튼을 노출하고, 로그인/회원가입은 없다", () => {
      render(<Header isLoggedIn />);
      expect(screen.getByRole("button", { name: "알림" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "프로필" }),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "로그인/회원가입" }),
      ).not.toBeInTheDocument();
    });

    it("알림 존재 시 배지를 표시하고, 없으면 표시하지 않는다", () => {
      const { rerender } = render(<Header isLoggedIn hasNotification />);
      expect(screen.getByTestId("notification-badge")).toBeInTheDocument();
      expect(screen.getByText("읽지 않은 알림")).toBeInTheDocument();

      rerender(<Header isLoggedIn hasNotification={false} />);
      expect(
        screen.queryByTestId("notification-badge"),
      ).not.toBeInTheDocument();
    });

    it("알림/프로필 클릭 콜백이 호출된다", () => {
      const onNotificationClick = jest.fn();
      const onProfileClick = jest.fn();
      render(
        <Header
          isLoggedIn
          onNotificationClick={onNotificationClick}
          onProfileClick={onProfileClick}
        />,
      );
      screen.getByRole("button", { name: "알림" }).click();
      screen.getByRole("button", { name: "프로필" }).click();
      expect(onNotificationClick).toHaveBeenCalledTimes(1);
      expect(onProfileClick).toHaveBeenCalledTimes(1);
    });
  });
});
