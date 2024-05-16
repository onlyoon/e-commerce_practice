import { cn } from "@/lib/utils"
import { ReactNode } from "react";


// 레이아웃 및 자식 컴포넌트 배치를 위한 컴포넌트.
const MaxWidthWrapper = ({ className, children }: {
  className?: string
  // ReactNode를 children Props로 받아서 JSX에서 올바르게 보여질 수 있도록 한다.
  children: ReactNode
}) => {
  // cn함수 활용시 재사용되는 className들을 하나로 합친 문자열로 만들어, 다른 요소들의 className과 겹치지 않는다.
  return <div className={cn("h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
    {children}
  </div>
};

export default MaxWidthWrapper

// tailwind CSS 클래스명 특징

// h-full w-full <-- 높이 최대 너비 최대
// max-w-screen-xl <-- 최대 너비 제한
// md:px-20 <-- 중간 뷰포트 가로 넘을시 padding_x-axis 5rem 적용
// px2.5 <-- padding_x-axis 0.625rem 적용