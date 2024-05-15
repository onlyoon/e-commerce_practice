import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
// CSS-in-JS 라이브러리
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// cva 함수를 활용하여 버튼 컴포넌트의 다양한 스타일 변형을 관리하는 함수
const buttonVariants = cva(
	// 버튼은 인라인이며 중앙에 콘텐츠가 들어가고 focus일때의 동작 지시 및 disabled일때의 동작 지시를 정의한다.
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		// 다양한 버튼의 스타일 변경 정의
		variants: {
			// 버튼의 형태는 총 6가지가 있다. default | destructive | outline | secondary | ghost | link
			// 버튼의 형태에 따른 스타일을 정의한다.
			variant: {
				default:
					"bg-primary text-primary-foreground shadow hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			// 버튼의 형태에 따라 서로 다른 사이즈를 정의한다.
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		// 버튼이 일반 생성되었을 때, 기본 값을 정의한다.
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
)

// ButtonProps는 React.ButtonHTMLAttributes와 VariantProps를 상속한다.
export interface ButtonProps
	// React.ButtonHTMLAttributes <-- HTML <button>요소에 사용할 수 있는 모든 속성 적용
	// <HTMLButtonElement> 제네릭을 통해 <button>요소의 속성에 대한 타입 정의
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
	VariantProps<typeof buttonVariants> {

	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button"
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button, buttonVariants }
