import { z } from "zod";

/**
 * 클라이언트(브라우저)에 노출되는 환경변수 스키마.
 * Next 는 `NEXT_PUBLIC_` 접두사 변수만 클라이언트 번들에 인라인한다.
 * 새 변수는 여기에 추가하고, 코드에서는 `process.env` 대신 이 `env` 객체를 사용한다.
 */
const clientEnvSchema = z.object({
  // 백엔드 API baseURL. 미설정 시 staging 으로 폴백한다.
  NEXT_PUBLIC_API_BASE_URL: z.url().default("https://staging-api.sidee.co.kr"),
});

const parsed = clientEnvSchema.safeParse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

if (!parsed.success) {
  console.error("환경변수 검증 실패:", parsed.error.issues);
  throw new Error("환경변수 검증에 실패했습니다. .env 설정을 확인하세요.");
}

export const env = parsed.data;
