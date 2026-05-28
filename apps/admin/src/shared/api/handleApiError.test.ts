import { handleApiError } from "./handleApiError";

describe("handleApiError", () => {
  it("에러를 받아도 throw 하지 않는다", () => {
    expect(() => handleApiError(new Error("boom"))).not.toThrow();
  });

  it("비프로덕션 환경에서 콘솔에 에러를 출력한다", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    handleApiError(new Error("boom"));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
