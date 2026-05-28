import { defineConfig, globalIgnores } from "eslint/config";
import sidee from "@sidee/eslint-config";

const eslintConfig = defineConfig([
  ...sidee,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
