'use client'

import { useState } from 'react'
import { MENU_ITEMS } from './menu-config'
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
import { Menu } from 'lucide-react'
import { Logo } from '../logo/logo'
import Link from 'next/link'

export function MenuMobile() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME

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
          <VisuallyHidden>
            <SheetTitle>{appName} menú</SheetTitle>
            <SheetDescription>
              Seleccione una opción para navegar en el sitio.
            </SheetDescription>
          </VisuallyHidden>
          <Logo onClick={() => setOpen(false)} />
        </SheetHeader>
        <nav className="mt-4 flex flex-col">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-0 py-2 text-base no-underline"
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
