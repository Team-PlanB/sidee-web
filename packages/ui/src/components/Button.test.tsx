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

  it("텍스트는 Bold 굵기를 사용한다", () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass("font-bold");
  });

  it("포인터 커서를 사용한다", () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole("button")).toHaveClass("cursor-pointer");
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

  it("solid / error: 배경 Red600, 텍스트 white", () => {
    render(
      <Button type="solid" variant="error">
        삭제
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-error", "text-white");
  });

  describe("outlined: 배경 white + 1px 보더", () => {
    it("primary: 보더/텍스트 Blue600", () => {
      render(
        <Button type="outlined" variant="primary">
          버튼
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveClass(
        "bg-white",
        "inset-ring",
        "inset-ring-blue-600",
        "text-blue-600",
      );
    });

    it("secondary: 보더 Gray200, 텍스트 Blue600", () => {
      render(
        <Button type="outlined" variant="secondary">
          버튼
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveClass(
        "bg-white",
        "inset-ring",
        "inset-ring-gray-200",
        "text-blue-600",
      );
    });

    it("assistive: 보더 Gray200, 텍스트 Gray800", () => {
      render(
        <Button type="outlined" variant="assistive">
          버튼
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveClass(
        "bg-white",
        "inset-ring",
        "inset-ring-gray-200",
        "text-gray-800",
      );
    });

    it("error: 보더/텍스트 Red600", () => {
      render(
        <Button type="outlined" variant="error">
          버튼
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveClass(
        "bg-white",
        "inset-ring",
        "inset-ring-error",
        "text-error",
      );
    });

    it("errorSecondary: 보더 Gray200, 텍스트 Red600", () => {
      render(
        <Button type="outlined" variant="errorSecondary">
          버튼
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveClass(
        "bg-white",
        "inset-ring",
        "inset-ring-gray-200",
        "text-error",
      );
    });

    it("outlined도 size 레이아웃은 solid와 동일하다", () => {
      render(
        <Button type="outlined" variant="primary" size="s">
          버튼
        </Button>,
      );
      expect(screen.getByRole("button")).toHaveClass("h-8", "px-[14px]");
    });
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

  it("asChild: 자식 요소(링크)로 렌더링하고 스타일을 입힌다", () => {
    render(
      <Button asChild>
        <a href="/start">시작</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "시작" });
    expect(link).toHaveAttribute("href", "/start");
    expect(link).toHaveClass("bg-blue-600", "rounded-full");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("asChild가 아니면 data-slot=button을 노출한다", () => {
    render(<Button>버튼</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button");
  });
});
