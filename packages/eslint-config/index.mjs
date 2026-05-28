import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * admin/user 앱이 공유하는 기본 ESLint(flat) 설정.
 * 앱별 eslint.config.mjs 에서 spread 하여 사용하고, 무시 경로 등은 앱에서 덧붙인다.
 */
const sideeConfig = [...nextVitals, ...nextTs];

export default sideeConfig;
