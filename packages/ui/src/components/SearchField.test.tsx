import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { SearchField } from "./SearchField";

describe("SearchField", () => {
  it("기본 placeholder를 가진 search input을 렌더링한다", () => {
    render(<SearchField />);
    const input = screen.getByPlaceholderText("검색어를 입력해주세요");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "search");
  });

  it("placeholder를 덮어쓸 수 있다", () => {
    render(<SearchField placeholder="이름 검색" />);
    expect(screen.getByPlaceholderText("이름 검색")).toBeInTheDocument();
  });

  it("input ref를 forward한다 (react-hook-form 호환)", () => {
    const ref = createRef<HTMLInputElement>();
    render(<SearchField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("공통 스타일: white 배경, gray-200 보더, rounded-full", () => {
    render(<SearchField />);
    const container = screen.getByPlaceholderText("검색어를 입력해주세요")
      .parentElement as HTMLElement;
    expect(container).toHaveClass(
      "bg-white",
      "border",
      "border-gray-200",
      "rounded-full",
    );
  });

  it("input 텍스트는 Body1 + gray-800, placeholder는 gray-400", () => {
    render(<SearchField />);
    expect(screen.getByPlaceholderText("검색어를 입력해주세요")).toHaveClass(
      "text-body-1",
      "text-gray-800",
      "placeholder:text-gray-400",
    );
  });

  describe("Size", () => {
    it("L: 높이 48px, padding 12/16", () => {
      render(<SearchField size="l" />);
      const container = screen.getByPlaceholderText("검색어를 입력해주세요")
        .parentElement as HTMLElement;
      expect(container).toHaveClass("h-12", "px-4", "py-3");
    });

    it("M: 높이 40px, padding 8/12", () => {
      render(<SearchField size="m" />);
      const container = screen.getByPlaceholderText("검색어를 입력해주세요")
        .parentElement as HTMLElement;
      expect(container).toHaveClass("h-10", "px-3", "py-2");
    });
  });

  describe("Active=OFF (기본)", () => {
    it("gap 4px, 검색 아이콘 gray-400, trailing 미표시", () => {
      render(<SearchField trailing={<span data-testid="clear" />} />);
      const container = screen.getByPlaceholderText("검색어를 입력해주세요")
        .parentElement as HTMLElement;
      expect(container).toHaveClass("gap-1");
      expect(container.querySelector("svg")).toHaveClass("text-gray-400");
      expect(screen.queryByTestId("clear")).not.toBeInTheDocument();
    });
  });

  describe("Active=ON", () => {
    it("gap 8px, 검색 아이콘 gray-800", () => {
      render(<SearchField active />);
      const container = screen.getByPlaceholderText("검색어를 입력해주세요")
        .parentElement as HTMLElement;
      expect(container).toHaveClass("gap-2");
      expect(container.querySelector("svg")).toHaveClass("text-gray-800");
    });

    it("active일 때 trailing(지우기) 슬롯을 표시한다", () => {
      render(<SearchField active trailing={<span data-testid="clear" />} />);
      expect(screen.getByTestId("clear")).toBeInTheDocument();
    });
  });

  it("className을 컨테이너에 병합한다", () => {
    render(<SearchField className="max-w-xs" />);
    const container = screen.getByPlaceholderText("검색어를 입력해주세요")
      .parentElement as HTMLElement;
    expect(container).toHaveClass("max-w-xs", "bg-white");
  });
});
