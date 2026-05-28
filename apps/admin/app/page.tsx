import { Button } from "@sidee/ui";

export default function AdminHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-semibold">Sidee 관리자</h1>
      <p className="text-foreground/60">@sidee/ui 공유 컴포넌트 확인용</p>
      <Button>시작하기</Button>
    </main>
  );
}
