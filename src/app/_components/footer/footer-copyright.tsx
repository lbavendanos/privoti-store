export function FooterCopyright() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME
  const year = new Date().getFullYear()

  return (
    <p className="text-xs uppercase text-muted-foreground">
      © {year} {appName} Todos los derechos reservados
    </p>
  )
}
