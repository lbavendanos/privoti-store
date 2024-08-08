export function Orders() {
  return (
    <div className="flex h-full flex-col gap-y-4">
      <h2 className="text-lg font-semibold uppercase text-foreground">
        Pedidos
      </h2>
      <div className="flex flex-col space-y-1">
        <h3 className="text-base font-semibold text-foreground">
          Aún no hay pedidos
        </h3>
        <p className="text-sm text-muted-foreground">
          Su historial de pedidos y envíos aparecerán aquí.
        </p>
      </div>
    </div>
  )
}
