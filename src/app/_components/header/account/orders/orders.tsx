import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export function Orders() {
  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle className="uppercase">Pedidos</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col space-y-1">
        <h3 className="text-base font-semibold text-foreground">
          Aún no hay pedidos
        </h3>
        <SheetDescription>
          Su historial de pedidos y envíos aparecerán aquí.
        </SheetDescription>
      </div>
    </div>
  )
}
