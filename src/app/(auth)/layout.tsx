export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="flex grow flex-col justify-center">{children}</main>
}
