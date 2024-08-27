'use client'

import { useAuth } from '@/core/auth'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { AccountUnauthenticated } from './account-unauthenticated'
import { AccountAuthenticated } from './account-authenticated'
import { AccountVerifyEmail } from './account-verify-email'

export function Account() {
  const { check, user } = useAuth()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-fit w-fit p-0"
          aria-label="Abrir cuenta"
        >
          <User className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Cuenta</SheetTitle>
            <SheetDescription>
              Usa tu cuenta para acceder a todas las funcionalidades de la app.
            </SheetDescription>
          </VisuallyHidden>
        </SheetHeader>
        {check ? (
          <>
            {user?.email_verified_at ? (
              <AccountAuthenticated />
            ) : (
              <AccountVerifyEmail />
            )}
          </>
        ) : (
          <AccountUnauthenticated />
        )}
      </SheetContent>
    </Sheet>
  )
}
