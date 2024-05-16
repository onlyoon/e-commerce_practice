import { LucideProps } from 'lucide-react'

// LucideProps와 같은 타입을 지니는 Icon 모음집
const Icons = {
  // Icons.underline 이중 물결모양의 아이콘
  underline: (props: LucideProps) => (
    <svg {...props} viewBox='0 0 687 155'>
      <g
        stroke='currentColor'
        strokeWidth='7'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path
          d='M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'
          opacity='.3'></path>
        <path d='M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'></path>
      </g>
    </svg>
  ),
}

export default Icons;