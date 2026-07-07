import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("Sidee 라벨을 가진 img 로 렌더링한다", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: "Sidee" })).toBeInTheDocument();
  });

  it("className / aria-label 을 전달한다", () => {
    render(<Logo className="h-[30px] w-auto" aria-label="홈" />);
    const svg = screen.getByRole("img", { name: "홈" });
    expect(svg).toHaveClass("h-[30px]", "w-auto");
  });
});
