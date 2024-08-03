import type { LinkProps } from 'next/link'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'

export interface LoginFooterProps extends Omit<LinkProps, 'href'> {}

export function LoginFooter(props: LoginFooterProps) {
  return (
    <CardDescription>
      ¿Ya tiene una cuenta?{' '}
      <Button variant="link" className="h-fit w-fit p-0 text-center" asChild>
        <Link href="/login" {...props}>
          Inicia sesión
        </Link>
      </Button>
    </CardDescription>
  )
}
