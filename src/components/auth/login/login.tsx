import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LoginForm } from './login-form'
import { RegisterFooter } from '../register/register-footer'

export interface LoginProps extends React.ComponentPropsWithoutRef<'div'> {
  onForgotPasswordClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  onRegisterClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function Login({
  onForgotPasswordClick,
  onRegisterClick,
  ...props
}: LoginProps) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME

  return (
    <Card {...props}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Iniciar sesión</CardTitle>
        <CardDescription className="text-center">
          Tu cuenta para todo lo relacionado con {appName}.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <LoginForm onForgotPasswordClick={onForgotPasswordClick} />
      </CardContent>
      <CardFooter className="justify-center">
        <RegisterFooter onClick={onRegisterClick} />
      </CardFooter>
    </Card>
  )
}
