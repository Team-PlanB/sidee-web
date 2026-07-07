import type { SVGProps } from "react";
import Link from "next/link";
import { AppLogo, Button, Logo } from "@sidee/ui";

/**
 * Header — 홈 상단 글로벌 헤더 (Figma: 미로그인 / 로그인-알림).
 *
 * 상태 조합:
 *   - isLoggedIn=false : [팀원 모집하기](outlined) [로그인/회원가입](solid)
 *   - isLoggedIn=true  : [팀원 모집하기](outlined) [알림] [프로필]
 *                        hasNotification 이면 알림 아이콘에 배지 점 표시
 *
 * 좌측 로고는 홈("/") 링크. 컨텐츠는 max-w 1440 중앙 정렬(px 20), 높이 60.
 */
export type HeaderProps = {
  /** 로그인 여부. 기본 false */
  isLoggedIn?: boolean;
  /** 읽지 않은 알림 유무 (로그인 상태에서만 유효). 기본 false */
  hasNotification?: boolean;
  /** 팀원 모집하기 클릭 */
  onRecruitClick?: () => void;
  /** 로그인/회원가입 클릭 (미로그인) */
  onAuthClick?: () => void;
  /** 알림 클릭 (로그인) */
  onNotificationClick?: () => void;
  /** 프로필 클릭 (로그인) */
  onProfileClick?: () => void;
};

export default function Header({
  isLoggedIn = false,
  hasNotification = false,
  onRecruitClick,
  onAuthClick,
  onNotificationClick,
  onProfileClick,
}: HeaderProps) {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-15 max-w-[1440px] items-center justify-between px-5">
        <Link href="/" aria-label="Sidee 홈" className="flex items-center">
          <Logo className="h-[30px] w-auto" />
        </Link>

        <div
          className={`flex items-center ${isLoggedIn ? "gap-4" : "gap-5"}`}
        >
          <Button
            type="outlined"
            variant="assistive"
            size="s"
            onClick={onRecruitClick}
          >
            팀원 모집하기
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="알림"
                onClick={onNotificationClick}
                className="relative flex size-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
              >
                <AlarmIcon className="size-[18px] text-gray-800" aria-hidden />
                {hasNotification && (
                  <span
                    data-testid="notification-badge"
                    className="absolute right-[9px] top-[7px] size-1 rounded-full bg-primary-normal"
                  >
                    <span className="sr-only">읽지 않은 알림</span>
                  </span>
                )}
              </button>

              <button
                type="button"
                aria-label="프로필"
                onClick={onProfileClick}
                className="flex size-8 items-center justify-center rounded-full"
              >
                <span className="flex size-6 overflow-hidden rounded-full">
                  <AppLogo className="size-full" />
                </span>
              </button>
            </div>
          ) : (
            <Button
              type="solid"
              variant="primary"
              size="s"
              onClick={onAuthClick}
            >
              로그인/회원가입
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

/** 알림 벨 아이콘 (에셋: @sidee/ui assets/svg/alarm.svg, fill=currentColor) */
function AlarmIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14.5205 18.7861C14.6778 18.4007 15.117 18.2163 15.501 18.374C15.885 18.5319 16.0693 18.9728 15.9121 19.3584C15.2795 20.9096 13.7685 21.9999 11.9902 22C10.2118 22 8.70102 20.9096 8.06836 19.3584C7.9111 18.9728 8.09446 18.5319 8.47852 18.374C8.8625 18.2162 9.3016 18.4007 9.45898 18.7861C9.86845 19.7902 10.8428 20.4912 11.9902 20.4912C13.1375 20.4911 14.1111 19.7901 14.5205 18.7861ZM12 2C16.509 2 20.1768 5.85336 20.1768 10.5918V13.0762C21.2186 13.3378 21.9999 14.2836 22 15.4102C22 16.738 20.928 17.8251 19.6055 17.8252L19.5947 17.8145H4.39453C3.072 17.8143 2 16.7383 2 15.4004C2.00001 14.2736 2.78189 13.3182 3.83398 13.0566V10.5713C3.83406 5.85304 7.49103 2 12 2ZM11.9902 3.49902C8.31302 3.49902 5.31663 6.67783 5.31641 10.5811V13.751C5.31615 14.1631 4.97596 14.5047 4.56543 14.5049H4.39453C3.90377 14.505 3.5031 14.9074 3.50293 15.4102C3.50293 15.9131 3.90367 16.3153 4.39453 16.3154H19.585C20.0759 16.3154 20.4766 15.9132 20.4766 15.4102C20.4764 14.9073 20.0758 14.5049 19.585 14.5049H19.415C19.0044 14.5049 18.6633 14.1632 18.6631 13.751V10.5811C18.6629 6.67792 15.6673 3.49917 11.9902 3.49902Z"
        fill="currentColor"
      />
    </svg>
  );
}
