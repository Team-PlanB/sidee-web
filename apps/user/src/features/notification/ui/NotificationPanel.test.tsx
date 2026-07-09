import { fireEvent, render, screen } from "@testing-library/react";
import { truncateTitle } from "@/entities/notification";
import NotificationPanel from "./NotificationPanel";
import { mockNotifications } from "../model/mock";

const NOW = Date.UTC(2026, 6, 9, 12, 0, 0);

function renderPanel(onClose = jest.fn()) {
  render(
    <NotificationPanel
      notifications={mockNotifications(NOW)}
      now={NOW}
      onClose={onClose}
    />,
  );
  return onClose;
}

describe("NotificationPanel", () => {
  it("헤더와 닫기 버튼을 렌더하고, 닫기 클릭 시 onClose 를 호출한다", () => {
    const onClose = renderPanel();
    expect(screen.getByRole("dialog", { name: "알림" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "닫기" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("30일이 지난 알림은 노출하지 않는다", () => {
    renderPanel();
    // 40일 전 항목(id 5)의 제목
    expect(screen.queryByText("오래된 알림")).not.toBeInTheDocument();
    // 30일 이내 항목 4개가 리스트로 보인다
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("안읽음 항목은 Blue/50 배경으로 강조한다", () => {
    renderPanel();
    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveClass("bg-blue-50"); // id 1: readAt=null
    expect(items[2]).toHaveClass("bg-white"); // id 3: 읽음
  });

  it("상대 시간을 표기한다", () => {
    renderPanel();
    expect(screen.getByText("1분 전")).toBeInTheDocument();
    expect(screen.getByText("어제")).toBeInTheDocument();
    expect(screen.getByText("2일 전")).toBeInTheDocument();
  });

  it("제목이 15자를 넘으면 말줄임하고 툴팁으로 전체 제목을 노출한다", () => {
    renderPanel();
    const longTitle = mockNotifications(NOW)[1].title;
    // 툴팁에는 잘리지 않은 전체 제목이 담긴다
    expect(screen.getByRole("tooltip")).toHaveTextContent(longTitle);
    // 화면에 보이는 제목은 15자 + 말줄임
    expect(screen.getByText(truncateTitle(longTitle))).toBeInTheDocument();
  });

  it("노출할 알림이 없으면 빈 상태 문구를 보여준다", () => {
    render(<NotificationPanel notifications={[]} now={NOW} onClose={jest.fn()} />);
    expect(screen.getByText("새로운 알림이 없어요")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
