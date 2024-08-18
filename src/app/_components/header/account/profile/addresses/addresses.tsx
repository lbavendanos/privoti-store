'use client'

import type { Address } from '@/core/auth/address'
import type { AddressFormMode } from './address-form'
import { useMemo, useState } from 'react'
import { useAddresses } from '@/core/auth/address'
import { isTrue } from '@/lib/utils'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Check, MapPin } from 'lucide-react'
import { Address as AddressPanel } from './address'
import { ADDRESS_FORM_ADD_MODE, ADDRESS_FORM_EDIT_MODE } from './address-form'

const ADDRESS_LIMIT = 5

function AddressesContent() {
  const { addresses } = useAddresses({ suspense: true })

  const availableAddresses = useMemo(
    () => ADDRESS_LIMIT - (addresses ? addresses.length : 0),
    [addresses],
  )

  const [address, setAddress] = useState<Address | null>(null)
  const [mode, setMode] = useState<AddressFormMode>(ADDRESS_FORM_ADD_MODE)
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-sm text-muted-foreground">
        {availableAddresses > 0 ? (
          <>
            Te {availableAddresses > 1 ? 'quedan' : 'queda'}{' '}
            <strong>
              {availableAddresses}{' '}
              {availableAddresses > 1
                ? 'direcciones disponibles'
                : 'dirección disponible'}
            </strong>
          </>
        ) : (
          'Alcanzaste el límite de direcciones'
        )}
      </p>
      <div className="flex h-full flex-col gap-y-2">
        {addresses && addresses.length > 0 && (
          <div className="flex flex-col gap-y-2.5">
            {addresses.map((address) => (
              <Button
                key={address.id}
                variant="outline"
                size="sm"
                className="relative h-24 justify-start"
                aria-label="Abrir dirección"
                onClick={() => {
                  setMode(ADDRESS_FORM_EDIT_MODE)
                  setAddress(address)
                  setOpen(true)
                }}
              >
                {isTrue(address.default) && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    <Check />
                  </span>
                )}
                <div className="flex flex-col items-start gap-y-1">
                  <span className="mb-1 text-sm font-medium leading-none">
                    {address.first_name} {address.last_name}
                  </span>
                  <span className="text-xs leading-none text-muted-foreground">
                    {address.address1}
                    {address.address2 && ` - ${address.address2}`}
                  </span>
                  <span className="text-xs leading-none text-muted-foreground">
                    {address.district}, {address.city}, {address.state}
                  </span>
                  <span className="text-xs leading-none text-muted-foreground">
                    {address.phone}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        )}
        {addresses && addresses.length < 5 && (
          <Button
            variant="outline"
            size="lg"
            aria-label="Abrir agregar dirección"
            onClick={() => {
              setMode(ADDRESS_FORM_ADD_MODE)
              setAddress(null)
              setOpen(true)
            }}
          >
            Agregar dirección
          </Button>
        )}
        <AddressPanel
          mode={mode}
          address={address}
          open={open}
          onOpenChange={(value) => {
            setOpen(value)
            setAddress(null)
          }}
        />
      </div>
    </div>
  )
}

function AddressesContentFallback() {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton className="h-4 w-[200px]" />
      <div className="flex flex-col gap-y-2.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex h-24 flex-col justify-center rounded-md border border-input px-3"
          >
            <div className="flex flex-col gap-y-1">
              <Skeleton className="mb-1 h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Addresses() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-12 justify-start"
        aria-label="Abrir direcciones"
        onClick={() => setOpen(true)}
      >
        <MapPin className="mr-2 h-6 w-6" />
        <span>Direcciones</span>
      </Button>
      {open && (
        <div className="absolute right-0 top-0 z-10 h-full w-full bg-background p-6">
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row items-center gap-x-1.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-fit w-fit p-0"
                onClick={() => setOpen(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold uppercase text-foreground">
                Direcciones
              </h2>
            </div>
            <Suspense fallback={<AddressesContentFallback />}>
              <AddressesContent />
            </Suspense>
          </div>
        </div>
      )}
    </>
  )
}
