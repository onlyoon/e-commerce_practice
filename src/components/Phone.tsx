import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";


// HTML <div> 태그의 속성을 활용하기 위해 인터페이스 활용
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
  dark?: boolean
}

// 다른 이미지와 겹쳐서 스마트폰의 이미지를 보여주는 컴포넌트
const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
  return (
    <div className={cn("relative pointer-events-none z-50 overflow-hidden", className)}
      {...props} >
      <img src={dark ? '/phone-template-dark-edges.png' : '/phone-template-white-edges.png'} className="pointer-events-none z-50 select-none" alt="phone image" />
      <div className="absolute -z-10 inset-0">
        {/* 받아온 이미지를 absolute로 해서 겹쳐서 보여준다. */}
        <img src={imgSrc} className="object-cover" alt="overlaying phone image" />
      </div>
    </div>
  )
};

export default Phone;