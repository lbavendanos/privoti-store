import type { Address } from '@/core/auth/address'
import type { AddressFormMode } from './address-form'
import { ADDRESS_FORM_ADD_MODE } from './address-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { AddressForm } from './address-form'

interface AddressProps {
  mode: AddressFormMode
  address?: Address | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Address({
  mode,
  address,
  open = false,
  onOpenChange,
}: AddressProps) {
  if (!open) return null

  return (
    <div className="absolute right-0 top-0 h-full w-full bg-background p-6">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row items-center gap-x-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-fit w-fit p-0"
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold uppercase text-foreground">
            {mode === ADDRESS_FORM_ADD_MODE
              ? 'Agregar dirección'
              : 'Editar dirección'}
          </h2>
        </div>
        <AddressForm
          mode={mode}
          address={address}
          onSuccess={() => onOpenChange(false)}
        />
      </div>
    </div>
  )
}
