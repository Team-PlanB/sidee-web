import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 모노레포 공유 패키지를 Next 가 트랜스파일하도록 지정
  transpilePackages: ["@sidee/ui"],
};

export default nextConfig;
