import { render, screen } from "@testing-library/react";
import { AppLogo } from "./AppLogo";

describe("AppLogo", () => {
  it("Sidee 라벨을 가진 img 로 렌더링한다", () => {
    render(<AppLogo />);
    expect(screen.getByRole("img", { name: "Sidee" })).toBeInTheDocument();
  });

  it("className 을 전달한다", () => {
    render(<AppLogo className="size-full" />);
    expect(screen.getByRole("img", { name: "Sidee" })).toHaveClass("size-full");
  });
});
