'use client'

import { useState } from 'react'
import { User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AccountUnauthenticated } from './account-unauthenticated'

export function Account() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <AccountUnauthenticated />
      </SheetContent>
    </Sheet>
  )
}
