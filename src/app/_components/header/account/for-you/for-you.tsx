import { Card, CardContent } from '@/components/ui/card'

export function ForYou() {
  return (
    <div className="flex h-full flex-col gap-y-4">
      <h2 className="text-lg font-semibold uppercase text-foreground">
        Bienvenido
      </h2>
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
