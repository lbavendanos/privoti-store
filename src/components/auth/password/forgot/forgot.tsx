import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ForgotForm } from './forgot-form'
import { RegisterFooter } from '../../register/register-footer'
import { LoginFooter } from '../../login/login-footer'

export interface ForgotProps extends React.ComponentPropsWithoutRef<'div'> {
  onSuccess?: () => void
  onLoginClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onRegisterClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function Forgot({
  onSuccess,
  onLoginClick,
  onRegisterClick,
  ...props
}: ForgotProps) {
  return (
    <Card {...props}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">
          ¿Olvidaste tu contraseña?
        </CardTitle>
        <CardDescription className="text-center">
          Proporciona la dirección de correo electrónico de tu cuenta para
          recibir un correo electrónico y restablecer tu contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotForm onSuccess={onSuccess} />
      </CardContent>
      <CardFooter className="flex-col justify-center gap-1">
        <RegisterFooter onClick={onRegisterClick} />
        <LoginFooter onClick={onLoginClick} />
      </CardFooter>
    </Card>
  )
}
