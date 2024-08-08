import { AccountLogoutButton } from './../account-logout-button'
import { Info } from './info/info'

export function Profile() {
  return (
    <div className="flex h-full flex-col gap-y-4">
      <h2 className="text-lg font-semibold uppercase text-foreground">
        Perfil
      </h2>
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
