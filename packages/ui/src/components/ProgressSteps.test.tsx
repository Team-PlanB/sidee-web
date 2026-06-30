import { render, screen } from "@testing-library/react";
import { ProgressSteps } from "./ProgressSteps";

const steps = (c: HTMLElement) =>
  Array.from(c.querySelectorAll('[data-slot="step"]'));

describe("ProgressSteps", () => {
  it("totalCount만큼 스텝을 렌더링한다", () => {
    const { container } = render(
      <ProgressSteps totalCount={4} currentStep={1} />,
    );
    expect(steps(container)).toHaveLength(4);
  });

  it("연결선 세그먼트는 2×total 개다", () => {
    const { container } = render(
      <ProgressSteps totalCount={3} currentStep={1} />,
    );
    const divider = container.querySelector('[data-slot="progress-divider"]')!;
    expect(divider.children).toHaveLength(6);
  });

  it("role=group 과 단계 aria-label 을 가진다", () => {
    render(<ProgressSteps totalCount={3} currentStep={2} />);
    expect(screen.getByRole("group")).toHaveAttribute(
      "aria-label",
      "단계 2 / 3",
    );
  });

  describe("스텝 상태 (currentStep=2, total=3)", () => {
    it("완료 스텝은 체크 아이콘, current/future는 숫자", () => {
      const { container } = render(
        <ProgressSteps totalCount={3} currentStep={2} />,
      );
      const [s1, s2, s3] = steps(container);
      expect(s1).toHaveAttribute("data-state", "completed");
      expect(s1.querySelector("svg")).toBeInTheDocument(); // 체크
      expect(s2).toHaveAttribute("data-state", "current");
      expect(s2).toHaveTextContent("2");
      expect(s3).toHaveAttribute("data-state", "future");
      expect(s3).toHaveTextContent("3");
    });

    it("현재 스텝 배지에 aria-current=step", () => {
      const { container } = render(
        <ProgressSteps totalCount={3} currentStep={2} />,
      );
      const current = steps(container)[1];
      expect(current.querySelector('[aria-current="step"]')).toBeInTheDocument();
    });
  });

  describe("배지 색", () => {
    it("완료/현재는 파란 배지(#0066FF), 미래는 gray-300", () => {
      const { container } = render(
        <ProgressSteps totalCount={3} currentStep={2} />,
      );
      const badge = (el: Element) => el.querySelector("div")!;
      const [s1, s2, s3] = steps(container);
      expect(badge(s1)).toHaveClass("bg-[#0066FF]");
      expect(badge(s2)).toHaveClass("bg-[#0066FF]");
      expect(badge(s3)).toHaveClass("bg-gray-300");
    });
  });

  describe("연결선 색 (total=3, current=2)", () => {
    it("완료 구간(seg1,2)은 blue-600, 이후(seg3,4)는 gray-300, 양끝은 투명", () => {
      const { container } = render(
        <ProgressSteps totalCount={3} currentStep={2} />,
      );
      const segs = Array.from(
        container.querySelector('[data-slot="progress-divider"]')!.children,
      );
      expect(segs[0]).not.toHaveClass("bg-blue-600", "bg-gray-300"); // edge
      expect(segs[1]).toHaveClass("bg-blue-600");
      expect(segs[2]).toHaveClass("bg-blue-600");
      expect(segs[3]).toHaveClass("bg-gray-300");
      expect(segs[4]).toHaveClass("bg-gray-300");
      expect(segs[5]).not.toHaveClass("bg-blue-600", "bg-gray-300"); // edge
    });
  });

  describe("라벨", () => {
    it("labels를 렌더링하고, step<=current는 blue-600 / 이후는 gray-300", () => {
      const { container } = render(
        <ProgressSteps
          totalCount={3}
          currentStep={2}
          labels={["정보", "약관", "완료"]}
        />,
      );
      const [s1, , s3] = steps(container);
      expect(screen.getByText("정보")).toHaveClass("text-blue-600");
      expect(screen.getByText("완료")).toHaveClass("text-gray-300");
      expect(s1).toHaveTextContent("정보");
      expect(s3).toHaveTextContent("완료");
    });

    it("labels가 없으면 라벨 텍스트를 렌더링하지 않는다", () => {
      const { container } = render(
        <ProgressSteps totalCount={3} currentStep={1} />,
      );
      // 배지 숫자 외 라벨 span 없음 (각 step 자식은 badge 1개뿐)
      expect(steps(container)[0].querySelectorAll("span")).toHaveLength(1);
    });
  });

  it("마지막 단계 완료(total=4, current=4): 1~3 완료(체크), 4 현재", () => {
    const { container } = render(
      <ProgressSteps totalCount={4} currentStep={4} />,
    );
    const list = steps(container);
    expect(list.slice(0, 3).every((s) => s.querySelector("svg"))).toBe(true);
    expect(list[3]).toHaveAttribute("data-state", "current");
    expect(list[3]).toHaveTextContent("4");
  });
});
