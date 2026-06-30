import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * sidee 타이포그래피 토큰(`text-body-1`, `text-label-2` …)을 font-size 그룹으로 등록한다.
 * 등록하지 않으면 tailwind-merge 가 이들을 text-color 로 오인해 `text-white` 같은
 * 실제 색 클래스와 충돌시켜 삭제해버린다.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-1",
            "title-1",
            "title-2",
            "title-3",
            "heading-1",
            "heading-2",
            "headline",
            "body-1",
            "body-2",
            "label-1",
            "label-2",
            "caption-1",
            "caption-2",
          ],
        },
      ],
    },
  },
});

/** className 머지 유틸 (clsx + tailwind-merge). 충돌 시 뒤 클래스가 이긴다. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
