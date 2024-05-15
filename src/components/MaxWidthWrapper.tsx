import { cn } from "@/lib/utils"
import { ReactNode } from "react";


// 레이아웃 및 자식 컴포넌트 배치를 위한 컴포넌트.
const MaxWidthWrapper = ({ className, children }: {
  className?: string
  // ReactNode를 children Props로 받아서 JSX에서 올바르게 보여질 수 있도록 한다.
  children: ReactNode
}) => {
  return <div className={cn("h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
    {children}
  </div>
};

export default MaxWidthWrapper