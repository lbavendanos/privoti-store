import { useCallback, useTransition } from 'react'
import { useAuth } from '@/lib/auth'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { SheetDescription } from '@/components/ui/sheet'
import { AccountLogoutButton } from './account-logout-button'
import { Loader2 } from 'lucide-react'

function AccountResendEmailButton() {
  const { resendEmailVerification } = useAuth()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const handleResendEmail = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      startTransition(async () => {
        const { error } = await resendEmailVerification()

        if (error) {
          toast({
            variant: 'destructive',
            description: error,
          })

          return
        }

        toast({
          description:
            'Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionó durante el registro.',
        })
      })
    },
    [resendEmailVerification, toast],
  )

  return (
    <Button
      type="button"
      variant="default"
      size="lg"
      className="w-full"
      aria-disabled={isPending}
      disabled={isPending}
      onClick={handleResendEmail}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Reenviar correo de verificación
    </Button>
  )
}

export function AccountVerifyEmail() {
  return (
    <div className="flex min-h-full w-full flex-col justify-center">
      <div className="space-y-4">
        <div className="flex flex-col space-y-1">
          <h3 className="text-center text-base font-semibold text-foreground">
            Gracias por registrarte!
          </h3>
          <SheetDescription className="text-center">
            Antes de comenzar, ¿podría verificar su dirección de correo
            electrónico haciendo clic en el enlace que le acabamos de enviar por
            correo electrónico? Si no recibió el correo electrónico, con gusto
            le enviaremos otro.
          </SheetDescription>
        </div>
        <div className="space-y-2">
          <AccountResendEmailButton />
          <AccountLogoutButton />
        </div>
      </div>
    </div>
  )
}
