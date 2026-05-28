import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("User Home", () => {
  it("시작 안내 헤딩을 렌더한다", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /to get started/i }),
    ).toBeInTheDocument();
  });
});
