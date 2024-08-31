import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ResetForm } from './reset-form'

export function Reset() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-center text-2xl">
          Crea tu nueva contraseña
        </CardTitle>
        <CardDescription className="text-center">
          Crea una contraseña nueva. Después de crear tu contraseña,
          permanecerás conectado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetForm />
      </CardContent>
    </Card>
  )
}
