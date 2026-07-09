import { fireEvent, render, screen } from "@testing-library/react";
import ProfileMenu from "./ProfileMenu";

const mockLogout = jest.fn();
jest.mock("../api/mutations", () => ({
  useLogout: () => ({ mutate: mockLogout, isPending: false }),
}));

beforeEach(() => mockLogout.mockClear());

describe("ProfileMenu", () => {
  it("마이페이지/대시보드/로그아웃 항목을 렌더한다", () => {
    render(<ProfileMenu onClose={jest.fn()} />);
    expect(screen.getByRole("menuitem", { name: "마이페이지" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "대시보드" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "로그아웃" })).toBeInTheDocument();
  });

  it("마이페이지/대시보드는 아직 비활성화 상태다", () => {
    render(<ProfileMenu onClose={jest.fn()} />);
    expect(screen.getByRole("menuitem", { name: "마이페이지" })).toBeDisabled();
    expect(screen.getByRole("menuitem", { name: "대시보드" })).toBeDisabled();
    expect(screen.getByRole("menuitem", { name: "로그아웃" })).toBeEnabled();
  });

  it("로그아웃 클릭 시 logout 뮤테이션과 onClose 를 호출한다", () => {
    const onClose = jest.fn();
    render(<ProfileMenu onClose={onClose} />);
    fireEvent.click(screen.getByRole("menuitem", { name: "로그아웃" }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
