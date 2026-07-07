import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

/**
 * PromoBanner — 홈 상단 히어로 배너 (Figma: Rectangle 240649602).
 *
 * Blue/900 서피스 · 1440×360 · rounded-15. 내부 콘텐츠(카피/이미지)는 아직
 * 스펙 미정이라 children 슬롯으로 열어둔다.
 */
export type PromoBannerProps = {
  children?: ReactNode;
  className?: string;
};

export default function PromoBanner({ children, className }: PromoBannerProps) {
  return (
    <section
      aria-label="배너"
      className={cn(
        "h-[360px] w-full overflow-hidden rounded-[15px] bg-blue-900",
        className,
      )}
    >
      {children}
    </section>
  );
}
