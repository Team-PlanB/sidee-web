/**
 * 백엔드 `ErrorResponseDto` 와 1:1 대응하는 에러 객체.
 * httpClient 가 2xx 가 아닌 응답을 만나면 이 에러를 throw 한다.
 * `code`(SCREAMING_SNAKE_CASE)로 분기/i18n, `message`로 사용자 노출 문구를 만든다.
 */
export class ApiError extends Error {
  readonly statusCode: number;
  /** 머신 readable 에러 코드 (FE 분기/i18n용). 서버가 없으면 undefined */
  readonly code?: string;
  /** HTTP error label (e.g. "Bad Request") */
  readonly error?: string;
  /** 요청 경로 */
  readonly path?: string;
  /** ISO 8601 timestamp */
  readonly timestamp?: string;
  /** validation 에러 등 여러 메시지일 수 있음 */
  readonly messages: string[];

  constructor(statusCode: number, body: unknown, fallbackMessage: string) {
    const dto = (body ?? {}) as Record<string, unknown>;
    const rawMessage = dto.message;
    const messages = Array.isArray(rawMessage)
      ? rawMessage.map(String)
      : rawMessage != null
        ? [String(rawMessage)]
        : [fallbackMessage];

    super(messages[0] ?? fallbackMessage);
    this.name = "ApiError";
    this.statusCode = typeof dto.statusCode === "number" ? dto.statusCode : statusCode;
    this.code = typeof dto.code === "string" ? dto.code : undefined;
    this.error = typeof dto.error === "string" ? dto.error : undefined;
    this.path = typeof dto.path === "string" ? dto.path : undefined;
    this.timestamp = typeof dto.timestamp === "string" ? dto.timestamp : undefined;
    this.messages = messages;
  }

  /** 401 — 인증 만료/누락 */
  get isUnauthorized(): boolean {
    return this.statusCode === 401;
  }

  /** 409 — 충돌 (닉네임 중복 등) */
  get isConflict(): boolean {
    return this.statusCode === 409;
  }
}
