import { ProjectListView } from "@/widgets/project-list";
import { PromoBanner } from "@/widgets/promo-banner";
import { RecommendedProjects } from "@/widgets/recommended-projects";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-11 px-5 py-10">
      <PromoBanner />
      <RecommendedProjects />
      <ProjectListView />
    </main>
  );
}
