import { Card, CardContent } from '@/components/ui/card'
import { SheetHeader, SheetTitle } from '@/components/ui/sheet'

export function ForYou() {
  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle className="uppercase">Bienvenido</SheetTitle>
      </SheetHeader>
      <div className="flex flex-col space-y-1">
        <h3 className="text-base font-semibold text-foreground">
          Visto recientemente
        </h3>
        <div className="no-scrollbar relative -mx-6 flex snap-x snap-mandatory flex-row items-start justify-start gap-x-2 overflow-hidden overflow-x-auto [&>div:first-child]:ml-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="snap-center">
              <CardContent className="p-0">
                <div className="h-24 w-24 bg-accent"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
