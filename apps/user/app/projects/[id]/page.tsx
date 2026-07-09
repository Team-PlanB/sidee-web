import { ProjectDetailView } from "@/views/project-detail";

/**
 * 프로젝트 상세 라우트. 현재는 목업 데이터로 렌더한다.
 * 백엔드 연동 시 params.id 로 useProject(id) 조회 → VM 매핑으로 교체한다.
 */
export default function ProjectDetailPage() {
  return <ProjectDetailView />;
}
