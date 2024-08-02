import type { VariantProps } from 'class-variance-authority'
import { MenuItem } from './menu-item'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const MENU_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/collection', label: 'Colecciones' },
  { href: '/contact', label: 'Contacto' },
]

const menuListVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
})

interface MenuListProps
  extends React.ComponentPropsWithoutRef<'nav'>,
    VariantProps<typeof menuListVariants> {
  onSelection?: () => void
}

export function MenuList({
  orientation = 'horizontal',
  onSelection,
  className,
  ...props
}: MenuListProps) {
  return (
    <nav
      {...props}
      className={cn(menuListVariants({ orientation }), className)}
    >
      {MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.href}
          href={item.href}
          variant={orientation}
          onClick={onSelection}
        >
          {item.label}
        </MenuItem>
      ))}
    </nav>
  )
}
