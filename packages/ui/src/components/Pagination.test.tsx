import { render, screen, within } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  describe("type=default", () => {
    it("prev/next 와 전체 페이지 버튼을 렌더링한다", () => {
      render(<Pagination type="default" page={2} count={5} />);
      expect(screen.getByLabelText("이전 페이지")).toBeInTheDocument();
      expect(screen.getByLabelText("다음 페이지")).toBeInTheDocument();
      for (let n = 1; n <= 5; n++) {
        expect(screen.getByRole("button", { name: String(n) })).toBeVisible();
      }
      // long 전용 화살표는 없다
      expect(screen.queryByLabelText("처음 페이지")).not.toBeInTheDocument();
      expect(screen.queryByLabelText("마지막 페이지")).not.toBeInTheDocument();
    });

    it("현재 페이지에 aria-current=page 를 부여한다", () => {
      render(<Pagination type="default" page={3} count={5} />);
      const current = screen.getByRole("button", { name: "3" });
      expect(current).toHaveAttribute("aria-current", "page");
      expect(screen.getByRole("button", { name: "2" })).not.toHaveAttribute(
        "aria-current",
      );
    });

    it("페이지 클릭 시 onChange(번호) 를 호출한다", () => {
      const onChange = jest.fn();
      render(<Pagination type="default" page={2} count={5} onChange={onChange} />);
      screen.getByRole("button", { name: "4" }).click();
      expect(onChange).toHaveBeenCalledWith(4);
    });

    it("현재 페이지 클릭은 onChange 를 호출하지 않는다", () => {
      const onChange = jest.fn();
      render(<Pagination type="default" page={2} count={5} onChange={onChange} />);
      screen.getByRole("button", { name: "2" }).click();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("prev/next 가 현재 페이지 기준으로 이동시킨다", () => {
      const onChange = jest.fn();
      render(<Pagination type="default" page={3} count={5} onChange={onChange} />);
      screen.getByLabelText("이전 페이지").click();
      expect(onChange).toHaveBeenLastCalledWith(2);
      screen.getByLabelText("다음 페이지").click();
      expect(onChange).toHaveBeenLastCalledWith(4);
    });

    it("첫 페이지에서 prev 가, 마지막 페이지에서 next 가 disabled 된다", () => {
      const { rerender } = render(<Pagination type="default" page={1} count={5} />);
      expect(screen.getByLabelText("이전 페이지")).toBeDisabled();
      expect(screen.getByLabelText("다음 페이지")).not.toBeDisabled();

      rerender(<Pagination type="default" page={5} count={5} />);
      expect(screen.getByLabelText("이전 페이지")).not.toBeDisabled();
      expect(screen.getByLabelText("다음 페이지")).toBeDisabled();
    });
  });

  describe("type=empty (count=1)", () => {
    it("단일 페이지 + 양쪽 화살표 disabled", () => {
      render(<Pagination type="default" page={1} count={1} />);
      expect(screen.getByRole("button", { name: "1" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(screen.getByLabelText("이전 페이지")).toBeDisabled();
      expect(screen.getByLabelText("다음 페이지")).toBeDisabled();
    });
  });

  describe("type=long", () => {
    it("first/prev/next/last 이중 화살표를 렌더링한다", () => {
      render(<Pagination type="long" page={4} count={17} />);
      expect(screen.getByLabelText("처음 페이지")).toBeInTheDocument();
      expect(screen.getByLabelText("이전 페이지")).toBeInTheDocument();
      expect(screen.getByLabelText("다음 페이지")).toBeInTheDocument();
      expect(screen.getByLabelText("마지막 페이지")).toBeInTheDocument();
    });

    it("가운데 페이지에서 양쪽에 생략(…)이 나타난다", () => {
      const { container } = render(<Pagination type="long" page={9} count={17} />);
      const ellipses = container.querySelectorAll(
        '[data-slot="pagination-ellipsis"]',
      );
      expect(ellipses.length).toBe(2);
      // 경계(1, 17)와 현재 주변(8,9,10)은 항상 보인다
      expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "17" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "9" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("first 는 1페이지로, last 는 마지막 페이지로 이동한다", () => {
      const onChange = jest.fn();
      render(
        <Pagination type="long" page={9} count={17} onChange={onChange} />,
      );
      screen.getByLabelText("처음 페이지").click();
      expect(onChange).toHaveBeenLastCalledWith(1);
      screen.getByLabelText("마지막 페이지").click();
      expect(onChange).toHaveBeenLastCalledWith(17);
    });

    it("첫 페이지에서 first/prev, 마지막에서 next/last 가 disabled", () => {
      const { rerender } = render(<Pagination type="long" page={1} count={17} />);
      expect(screen.getByLabelText("처음 페이지")).toBeDisabled();
      expect(screen.getByLabelText("이전 페이지")).toBeDisabled();
      expect(screen.getByLabelText("다음 페이지")).not.toBeDisabled();

      rerender(<Pagination type="long" page={17} count={17} />);
      expect(screen.getByLabelText("다음 페이지")).toBeDisabled();
      expect(screen.getByLabelText("마지막 페이지")).toBeDisabled();
    });
  });

  it("nav 랜드마크로 감싼다", () => {
    render(<Pagination page={1} count={3} />);
    const nav = screen.getByRole("navigation", { name: "페이지네이션" });
    expect(within(nav).getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("className 을 병합한다", () => {
    render(<Pagination page={1} count={3} className="mt-4" />);
    expect(
      screen.getByRole("navigation", { name: "페이지네이션" }),
    ).toHaveClass("mt-4", "flex");
  });
});
