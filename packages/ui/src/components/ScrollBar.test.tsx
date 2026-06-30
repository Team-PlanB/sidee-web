import { render } from "@testing-library/react";

import { ScrollBar } from "./ScrollBar";

const track = (c: HTMLElement) =>
  c.querySelector('[data-slot="scroll-bar"]') as HTMLElement;
const thumb = (c: HTMLElement) =>
  c.querySelector('[data-slot="scroll-thumb"]') as HTMLElement;

describe("ScrollBar", () => {
  it("트랙은 12px(w-3) + 상하 패딩(py-1)", () => {
    const { container } = render(<ScrollBar />);
    expect(track(container)).toHaveClass("w-3", "py-1", "h-full");
  });

  it("thumb 기본 스타일: gray-300, rounded-full", () => {
    const { container } = render(<ScrollBar />);
    expect(thumb(container)).toHaveClass("bg-gray-300", "rounded-full");
  });

  describe("size", () => {
    it("default: thumb 폭 6px(w-1.5)", () => {
      const { container } = render(<ScrollBar size="default" />);
      expect(thumb(container)).toHaveClass("w-1.5");
    });

    it("large: thumb 폭 10px(w-2.5)", () => {
      const { container } = render(<ScrollBar size="large" />);
      expect(thumb(container)).toHaveClass("w-2.5");
    });
  });

  describe("thumb 높이/위치", () => {
    it("기본은 트랙을 꽉 채운다 (height 100%, top 0%)", () => {
      const { container } = render(<ScrollBar />);
      expect(thumb(container)).toHaveStyle({ height: "100%", top: "0%" });
    });

    it("thumbSize/thumbOffset를 % 스타일로 반영한다", () => {
      const { container } = render(
        <ScrollBar thumbSize={30} thumbOffset={20} />,
      );
      expect(thumb(container)).toHaveStyle({ height: "30%", top: "20%" });
    });

    it("offset은 100 - size 로 클램프된다 (overflow 방지)", () => {
      const { container } = render(
        <ScrollBar thumbSize={40} thumbOffset={90} />,
      );
      // 90 → max(60)
      expect(thumb(container)).toHaveStyle({ height: "40%", top: "60%" });
    });

    it("size는 0–100으로 클램프된다", () => {
      const { container } = render(<ScrollBar thumbSize={150} />);
      expect(thumb(container)).toHaveStyle({ height: "100%" });
    });
  });

  it("className을 트랙에 병합한다", () => {
    const { container } = render(<ScrollBar className="absolute right-0" />);
    expect(track(container)).toHaveClass("absolute", "right-0", "w-3");
  });
});
