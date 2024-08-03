import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ShoppingBag } from 'lucide-react'

export function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-fit w-fit p-0"
          aria-label="Abrir carrito"
        >
          <ShoppingBag className="h-6 w-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="items-center justify-center">
          <Button
            variant="link"
            className="w-fit text-base font-semibold uppercase"
            asChild
          >
            <a href="#">Carrito de compras</a>
          </Button>
        </SheetHeader>
        <SheetDescription className="text-center">
          ¡Tu carrito está vacío! vamos a arreglar eso
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
