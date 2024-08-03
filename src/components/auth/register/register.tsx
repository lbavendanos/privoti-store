import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RegisterForm } from './register-form'
import { LoginFooter } from '../login/login-footer'

export interface RegisterProps extends React.ComponentPropsWithoutRef<'div'> {
  onLoginClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function Register({ onLoginClick, ...props }: RegisterProps) {
  return (
    <Card {...props}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">Crear cuenta</CardTitle>
        <CardDescription className="text-center">
          Cree su cuenta y obtenga lo mejor de los productos.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RegisterForm />
      </CardContent>
      <CardFooter className="justify-center">
        <LoginFooter onClick={onLoginClick} />
      </CardFooter>
    </Card>
  )
}
