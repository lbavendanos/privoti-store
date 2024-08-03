import { Menu } from './menu/menu'
import { Logo } from './logo/logo'
import { Search } from './search/search'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-4 lg:py-3">
        <section className="grid grid-cols-12 items-center gap-6">
          <div className="col-span-12">
            <div className="relative flex flex-row items-center gap-x-2 lg:gap-x-4">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Logo />
              </div>
              <Menu />
              <div className="flex w-full flex-row items-center justify-end gap-x-2 lg:gap-x-4">
                <div className="mr-auto flex items-center lg:mr-0">
                  <Search />
                </div>
                {/* <Account /> */}
                {/* <Cart /> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </header>
  )
}
