import { SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { AccountLogoutButton } from './../account-logout-button'
import { Info } from './info/info'

export function Profile() {
  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle className="uppercase">Perfil</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <Info />
          {/* <Addresses /> */}
        </div>
        <AccountLogoutButton />
      </div>
    </div>
  )
}
