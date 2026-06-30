import { cn } from "./utils";

describe("cn", () => {
  it("여러 클래스를 합친다", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("falsy 값은 무시한다", () => {
    expect(cn("px-2", false, null, undefined, "py-1")).toBe("px-2 py-1");
  });

  it("조건부(객체) 클래스를 적용한다", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("tailwind 충돌 클래스는 뒤의 것으로 머지한다", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("bg-primary", "bg-secondary")).toBe("bg-secondary");
  });
});
