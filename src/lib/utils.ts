// clsx로 입력받은 값들을 하나의 문자열로 합치며
import { type ClassValue, clsx } from "clsx";
// tailwind-merge로 클래스들을 합칠 때의 중복이나 충돌을 처리한다.
import { twMerge } from "tailwind-merge";

// cn 함수를 활용하면 동적인 스타일 적용이 가능해진다.
// className을 결정하기 위해 사용하는 함수이다.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
