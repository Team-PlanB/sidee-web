import type {
  AvailabilityPreset,
  CollaborationTrait,
  CommunicationStyle,
} from "@/shared/model";

/** 협업 성향 최대 선택 수 (step/3 maxItems=3) */
export const MAX_TRAITS = 3;
/** 소통 성향 최대 선택 수 (step/3 maxItems=2) */
export const MAX_STYLES = 2;

/**
 * 협업/소통 성향 라벨 (더미).
 * TODO(백엔드): 실제로는 카탈로그(useCollaborationTraitCatalog / useCommunicationStyleCatalog)
 * 의 label 을 사용한다.
 */
export const COLLABORATION_TRAIT_OPTIONS: {
  value: CollaborationTrait;
  label: string;
}[] = [
  { value: "PLANNING", label: "계획적으로 움직여요" },
  { value: "EXECUTION", label: "실행력이 좋아요" },
  { value: "DECISION_MAKING", label: "결정을 잘 내려요" },
  { value: "DETAIL", label: "디테일에 강해요" },
  { value: "TEAM_MOOD", label: "팀 분위기를 살려요" },
  { value: "PROACTIVE", label: "주도적으로 나서요" },
];

export const COMMUNICATION_STYLE_OPTIONS: {
  value: CommunicationStyle;
  label: string;
}[] = [
  { value: "SHARE_PROCESS", label: "과정을 자주 공유해요" },
  { value: "ON_DEMAND", label: "필요할 때 소통해요" },
  { value: "QUIET_FOCUS", label: "조용히 집중해요" },
  { value: "DELIBERATE", label: "신중하게 말해요" },
  { value: "FEEDBACK", label: "피드백을 잘 주고받아요" },
];

/** 활동 가능 시간대 preset (단일 선택). period 로 sun/moon 아이콘을 고른다. */
export const AVAILABILITY_OPTIONS: {
  value: AvailabilityPreset;
  label: string;
  period: "day" | "night";
}[] = [
  { value: "WEEKDAY_DAY", label: "평일 오전, 낮", period: "day" },
  { value: "WEEKDAY_NIGHT", label: "평일 저녁, 밤", period: "night" },
  { value: "WEEKEND_DAY", label: "주말 오전, 낮", period: "day" },
  { value: "WEEKEND_NIGHT", label: "주말 저녁, 밤", period: "night" },
];
