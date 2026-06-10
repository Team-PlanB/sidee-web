import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button (텍스트 버튼)", () => {
  it("children 텍스트를 렌더링한다", () => {
    render(<Button>시작하기</Button>);
    expect(screen.getByRole("button", { name: "시작하기" })).toBeInTheDocument();
  });

  it("기본값은 solid / primary / size m 이다", () => {
    render(<Button>버튼</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-600", "text-white", "rounded-full");
    expect(button).toHaveClass("h-10", "px-4", "gap-1", "text-body-2");
  });

  it("size s: 높이 32px, 좌우 패딩 14px, gap 4px, label-2 타이포", () => {
    render(<Button size="s">버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "h-8",
      "px-[14px]",
      "gap-1",
      "text-label-2",
    );
  });

  it("size l: 높이 48px, 좌우 패딩 24px, gap 6px, body-1 타이포", () => {
    render(<Button size="l">버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "h-12",
      "px-6",
      "gap-1.5",
      "text-body-1",
    );
  });

  it("네이티브 type 기본값은 button이다", () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("htmlType으로 네이티브 type을 지정할 수 있다", () => {
    render(<Button htmlType="submit">제출</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("className을 병합한다", () => {
    render(<Button className="w-full">버튼</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full");
    expect(button).toHaveClass("bg-blue-600");
  });

  it("onClick 핸들러가 호출된다", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>버튼</Button>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled 상태를 전달한다", () => {
    render(<Button disabled>버튼</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
