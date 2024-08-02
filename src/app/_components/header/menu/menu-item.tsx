import type { VariantProps } from 'class-variance-authority'
import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const menuItemVariants = cva('no-underline', {
  variants: {
    variant: {
      horizontal:
        'rounded-md px-3 py-2 text-sm transition-colors duration-150 hover:bg-accent hover:text-accent-foreground',
      vertical: 'px-0 py-2 text-base',
    },
  },
  defaultVariants: {
    variant: 'horizontal',
  },
})

export interface MenuItemProps
  extends LinkProps,
    VariantProps<typeof menuItemVariants> {
  className?: string
  children?: React.ReactNode
}

export function MenuItem({
  variant = 'horizontal',
  className,
  ...props
}: MenuItemProps) {
  return (
    <Link {...props} className={cn(menuItemVariants({ variant }), className)} />
  )
}
