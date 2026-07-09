export type {
  Project,
  ProjectAuthor,
  TechStackItem,
} from "./model/types";
export { mockProjects } from "./model/mock";
export type { RecommendedProject } from "./model/recommended";
export { mockRecommended } from "./model/recommended";

// 서버 응답 DTO
export type {
  ProjectTechStackItem,
  ProjectAuthorCard,
  ProjectAuthorDetail,
  ProjectPositionCard,
  ProjectRecruitmentDetail,
  ProjectReferenceLinkDetail,
  ProjectCard,
  ProjectDetail,
  ProjectListResult,
  LikeResult,
} from "./model/types";
// 요청 DTO / 파라미터
export type {
  CreateProjectTechStack,
  CreateProjectRecruitment,
  CreateProjectReferenceLink,
  CreateProjectStatus,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectListStatus,
  ProjectListParams,
} from "./api/dto";
// api
export {
  getProjects,
  getRecommendedProjects,
  getProject,
  getRelatedProjects,
  createProject,
  updateProject,
  deleteProject,
  closeProject,
  likeProject,
  unlikeProject,
} from "./api/projectApi";
export { projectKeys } from "./api/queryKeys";
