"use client"
// 클라이언트 컴포넌트 설정
// next.js는 서버 사이드 렌더링을 하기 때문에 브라우저에서 렌더링 되는 것을 따로 관리하기 위해 사용

import { HTMLAttributes, useEffect, useRef, useState } from "react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import Phone from "./Phone"
import { useInView } from 'framer-motion'
import { cn } from "@/lib/utils"


const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
]

// 입력받은 배열을 여러 하위 배열로 분할하는 함수
// jpg 묶음의 PHONES를 배열로 받고, 3 숫자를 받는다.
function splitArray<T>(array: Array<T>, num: number) {

  // result의 인덱스 타입을 Array<T>로 지정해 이중 배열 추론
  const result: Array<Array<T>> = []
  //
  for (let i = 0; i < array.length; i++) {
    // 0 % 3 = 0 , 1 % 3 = 1 , 2 % 3 = 2 , 3 % 3 = 0 , 4 % 3 = 1 , 5 % 3 = 2
    const index = i % num
    // 결과값 0, 1, 2에 따라 넣는 공간 생성
    if (!result[index]) {
      result[index] = []
    }
    // 0, 1, 2에 따라 array의 인덱스 삽입
    result[index].push(array[i])
  }

  return result;
};

// 받아온 reviews를 수직으로 스크롤되도록 해주는 함수
function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  // 스크롤 애니메이션 속도
  msPerPixel = 0
}: {
  reviews: string[]
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}) {
  // <div>에 접근
  const columnRef = useRef<HTMLDivElement | null>(null)
  // 현재 높이 상태
  const [columnHeight, setColumnHeight] = useState(0)
  // 컴포넌트의 높이에 따라 속도 변경
  const duration = `${columnHeight * msPerPixel}ms`

  // 컴포넌트가 마운트될 시 한 번 실행
  useEffect(() => {
    if (!columnRef.current) return
    // ResizeObserver을 통해 컴포넌트의 높이를 모니터링
    const resizeObserver = new window.ResizeObserver(() => {
      // 현재 컴포넌트의 HTML요소의 높이가 0이 아니면 컴포넌트의 높이를 가져오세요
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })


    // 현재 컴포넌트의 높이를 모니터링
    resizeObserver.observe(columnRef.current)

    return () => {
      // 컴포넌트가 언마운트 된 이후 disconnect
      // 메모리 누수 방지
      resizeObserver.disconnect()
    }
  }, [])

  // animate-marquee로 수직 스크롤
  // duration <-- 각 Column간 서로 다른 속도
  return <div ref={columnRef} className={cn("animate-marquee space-y-8 py-4", className)} style={{ '--marquee-duration': duration } as React.CSSProperties}>
    {/* reviews를 2배의 크기로 붙여 애니메이션 반복의 끝에 이상이 없게 만든다. */}
    {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
      <Review key={reviewIndex} className={reviewClassName?.(reviewIndex % reviews.length)} imgSrc={imgSrc} />
    ))}
  </div>
}

// ReviewProps는 <div> 요소의 모든 속성들을 상속받는다.
interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string
}


function Review({ imgSrc, className, ...props }: ReviewProps) {
  // 첫 렌더링시 시간 지연을 통해 서로 다르게 등장한다.
  const POSSIBLE_ANIMATION_DELAYS = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"]

  const animationDelay = POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)]

  return <div className={cn("animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5", className)} style={{ animationDelay }} {...props}>
    <Phone imgSrc={imgSrc} />
  </div>
}


const ReviewGrid = () => {
  // <div> 접근
  const containerRef = useRef<HTMLDivElement | null>(null)
  // containerRef 요소가 화면에 40% 이상 보였을 경우 true | false
  const isInView = useInView(containerRef, { once: true, amount: 0.4 })
  // PHONE 단일 배열 이중 배열로 반환
  const columns = splitArray(PHONES, 3)
  const column1 = columns[0]
  const column2 = columns[1]
  const column3 = splitArray(columns[2], 2)

  return <div ref={containerRef} className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
    {isInView ? <>
      <ReviewColumn reviews={[...column1, ...column3.flat(), ...column2]} reviewClassName={(reviewIndex) => cn({
        "md:hidden": reviewIndex >= column1.length + column3[0].length,
        'lg:hidden': reviewIndex >= column1.length,
      })
      }
        msPerPixel={10}
      />
      <ReviewColumn
        reviews={[...column2, ...column3[1]]}
        className="hidden md:block"
        reviewClassName={(reviewIndex) => reviewIndex >= column2.length ? "lg:hidden" : ''}
        msPerPixel={15}
      />
      <ReviewColumn
        reviews={column3.flat()}
        className="hidden md:block"
        msPerPixel={10}
      />
    </> : null}
    {/* 상 하 gradient */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100"></div>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100"></div>
  </div>
};


const Reviews = () => {
  return <MaxWidthWrapper className="relative max-w-5xl">
    <img area-hidden="true" src="/what-people-are-buying.png" className="absolute select-none hidden xl:block -left-32 top-1/3" />
    <ReviewGrid />
  </MaxWidthWrapper>
};

export default Reviews;