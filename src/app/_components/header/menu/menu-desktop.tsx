import Link from 'next/link'
import { MENU_ITEMS } from './menu-config'

export function MenuDesktop() {
  return (
    <nav className="flex flex-row">
      {MENU_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm no-underline transition-colors duration-150 hover:bg-accent hover:text-accent-foreground"
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
