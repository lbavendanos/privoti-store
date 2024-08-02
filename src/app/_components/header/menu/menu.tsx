import { MenuMobile } from './menu-mobile'
import { MenuDesktop } from './menu-desktop'

export function Menu() {
  return (
    <div className="flex items-center">
      <div className="flex lg:hidden">
        <MenuMobile />
      </div>
      <div className="hidden lg:block">
        <MenuDesktop />
      </div>
    </div>
  )
}
