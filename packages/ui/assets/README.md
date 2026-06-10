# @sidee/ui assets

admin / user 두 앱이 공유하는 정적 에셋.

```
assets/
├── svg/      # 아이콘·일러스트 원본 svg
└── images/   # png, jpg, webp 등 비트맵 이미지
```

## 사용법

`@sidee/ui/assets/*` 경로로 import 한다.

```tsx
import Image from "next/image";
import logo from "@sidee/ui/assets/images/logo.png";

<Image src={logo} alt="sidee" />;
```

## 규칙

- 파일명은 kebab-case (`arrow-right.svg`, `empty-state.png`).
- 한 앱에서만 쓰는 에셋은 여기 두지 않고 해당 앱의 `public/`에 둔다.
- svg를 React 컴포넌트로 쓰려면 `src/components/icons/`에 컴포넌트로 만들고
  색은 `currentColor`를 사용한다 (버튼 등의 `text-*` 색을 상속받기 위함).
