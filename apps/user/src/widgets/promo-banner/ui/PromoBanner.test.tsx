import { render, screen } from "@testing-library/react";
import PromoBanner from "./PromoBanner";

describe("PromoBanner", () => {
  it("배너 영역(region)을 렌더한다", () => {
    render(<PromoBanner />);
    expect(screen.getByRole("region", { name: /배너/ })).toBeInTheDocument();
  });

  it("blue-900 배경과 rounded 서피스를 가진다", () => {
    render(<PromoBanner />);
    expect(screen.getByRole("region", { name: /배너/ })).toHaveClass(
      "bg-blue-900",
      "rounded-[15px]",
    );
  });

  it("children 을 렌더한다", () => {
    render(
      <PromoBanner>
        <p>프로모션</p>
      </PromoBanner>,
    );
    expect(screen.getByText("프로모션")).toBeInTheDocument();
  });
});
