import { render, screen } from "@testing-library/react";
import { IconButton } from "./IconButton";

const Icon = () => <svg data-testid="icon" />;

describe("IconButton (아이콘 버튼)", () => {
  it("아이콘 children을 렌더링하고 aria-label로 접근 가능하다", () => {
    render(
      <IconButton aria-label="닫기">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "닫기" })).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("기본값은 solid / primary / size m 이다", () => {
    render(
      <IconButton aria-label="닫기">
        <Icon />
      </IconButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-blue-600", "text-white", "rounded-full");
    expect(button).toHaveClass("size-10", "p-2.5");
  });

  it("size s: 32x32, 패딩 7px", () => {
    render(
      <IconButton aria-label="닫기" size="s">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("size-8", "p-[7px]");
  });

  it("size l: 48x48, 패딩 12px", () => {
    render(
      <IconButton aria-label="닫기" size="l">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("size-12", "p-3");
  });

  it("네이티브 type 기본값은 button이다", () => {
    render(
      <IconButton aria-label="닫기">
        <Icon />
      </IconButton>,
    );
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("onClick 핸들러가 호출된다", () => {
    const onClick = jest.fn();
    render(
      <IconButton aria-label="닫기" onClick={onClick}>
        <Icon />
      </IconButton>,
    );
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
