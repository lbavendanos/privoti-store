import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'

export interface RegisterFooterProps extends Omit<LinkProps, 'href'> {}

export function RegisterFooter(props: RegisterFooterProps) {
  return (
    <CardDescription>
      ¿Aún no tienes cuenta?{' '}
      <Button variant="link" className="h-fit w-fit p-0" asChild>
        <Link href="/register" {...props}>
          Regístrate gratis
        </Link>
      </Button>
    </CardDescription>
  )
}
