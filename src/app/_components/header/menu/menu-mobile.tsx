'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { MenuList } from './menu-list'
import { Menu } from 'lucide-react'
import { Logo } from '../logo/logo'

export function MenuMobile() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-fit w-fit p-0"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="text-center">
          <Logo onClick={() => setOpen(false)} />
        </SheetHeader>
        <MenuList
          orientation="vertical"
          className="mt-4"
          onSelection={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
