import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "./button";

describe("shadcn Button", () => {
  it("children 텍스트를 렌더링한다", () => {
    render(<Button>확인</Button>);
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("기본값은 variant=default / size=default (primary 배경)", () => {
    render(<Button>버튼</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    expect(button).toHaveClass("h-9", "px-4", "py-2");
  });

  it("data-slot 속성을 노출한다", () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
  });

  it("variant=destructive: destructive 배경", () => {
    render(<Button variant="destructive">삭제</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });

  it("variant=outline: 보더 + background", () => {
    render(<Button variant="outline">버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass("border", "bg-background");
  });

  it("variant=secondary: secondary 배경", () => {
    render(<Button variant="secondary">버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "bg-secondary",
      "text-secondary-foreground",
    );
  });

  it("size=sm / lg / icon 레이아웃을 적용한다", () => {
    const { rerender } = render(<Button size="sm">버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-8");

    rerender(<Button size="lg">버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-10");

    rerender(
      <Button size="icon" aria-label="아이콘">
        i
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("size-9");
  });

  it("asChild로 자식 요소(링크)로 렌더링한다", () => {
    render(
      <Button asChild>
        <a href="/next">이동</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "이동" });
    expect(link).toHaveAttribute("href", "/next");
    expect(link).toHaveClass("bg-primary");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("className을 병합한다 (충돌 시 사용자 클래스 우선)", () => {
    render(<Button className="w-full bg-secondary">버튼</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("w-full", "bg-secondary");
    expect(button).not.toHaveClass("bg-primary");
  });

  it("disabled 상태를 전달한다", () => {
    render(<Button disabled>버튼</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("onClick 핸들러가 호출된다", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>버튼</Button>);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("buttonVariants: variant 클래스 문자열을 생성한다", () => {
    expect(buttonVariants({ variant: "ghost" })).toContain("hover:bg-accent");
    expect(buttonVariants({ variant: "link" })).toContain("text-primary");
  });
});
