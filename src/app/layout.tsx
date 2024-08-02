import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Separator } from '@/components/ui/separator'
import { Footer } from './_components/footer/footer'
import { cn, url } from '@/lib/utils'

import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export function generateMetadata(): Metadata {
  const appName = process.env.NEXT_PUBLIC_APP_NAME as string
  const appLocale = process.env.NEXT_PUBLIC_APP_LOCALE
  const description = `${appName} es una boutique de moda en línea de Perú para mujer. Encuentra calzado, ropa y accesorios de marcas exclusivas y modelos de edición limitada.`

  return {
    metadataBase: url(),
    title: {
      template: `%s | ${appName}`,
      default: appName,
    },
    description,
    openGraph: {
      title: {
        template: `%s | ${appName}`,
        default: appName,
      },
      description,
      url: '/',
      siteName: appName,
      locale: appLocale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const appLocale = process.env.NEXT_PUBLIC_APP_LOCALE

  return (
    <html lang={appLocale} suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <main className="grow">{children}</main>
        <div className="container">
          <Separator />
        </div>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
