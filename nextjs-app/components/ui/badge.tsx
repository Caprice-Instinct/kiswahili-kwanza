import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-sky-500 text-white hover:bg-sky-600",
        secondary:
          "border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300",
        success:
          "border-transparent bg-emerald-500 text-white hover:bg-emerald-600",
        warning:
          "border-transparent bg-violet-500 text-white hover:bg-violet-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }