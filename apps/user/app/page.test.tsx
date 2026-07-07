import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("User Home", () => {
  it("배너 · 맞춤 추천 · 전체 프로젝트 섹션을 렌더한다", () => {
    render(<Home />);
    expect(screen.getByRole("region", { name: /배너/ })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /맞춤 추천/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "전체 프로젝트" }),
    ).toBeInTheDocument();
  });
});
