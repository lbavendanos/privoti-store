'use client'

import { useState } from 'react'
import { Detail } from './detail/detail'
import { Email } from './email/email'
import { Password } from './password/password'
import { Button } from '@/components/ui/button'
import { ArrowLeft, User } from 'lucide-react'

export function Info() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-12 justify-start"
        aria-label="Abrir datos personales"
        onClick={() => setOpen(true)}
      >
        <User className="mr-2 h-6 w-6" />
        <span>Datos personales</span>
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
                Datos personales
              </h2>
            </div>
            <div className="flex flex-col gap-y-4">
              <p className="text-sm text-muted-foreground">
                Modifica tus datos personales a continuación para que tu cuenta
                esté actualizada.
              </p>
              <div className="flex h-full flex-col gap-y-2">
                <Detail />
                <Email />
                <Password />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
