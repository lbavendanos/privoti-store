'use client'

import { z } from 'zod'
import { useCallback, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth'
import { NAME_REGEX } from '@/lib/regex'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Loader2 } from 'lucide-react'

const FormSchema = z.object({
  first_name: z
    .string({
      required_error: 'El nombre es requerido.',
      invalid_type_error: 'El nombre debe ser una cadena.',
    })
    .trim()
    .min(1, { message: 'Debes introducir un nombre' })
    .regex(NAME_REGEX, {
      message: 'El nombre es incorrecto.',
    }),
  last_name: z
    .string({
      required_error: 'El apellido es requerido.',
      invalid_type_error: 'El apellido debe ser una cadena.',
    })
    .trim()
    .min(1, { message: 'Debes introducir un apellido' })
    .regex(NAME_REGEX, {
      message: 'El apellido es incorrecto.',
    }),
  email: z
    .string({
      required_error: 'El email es requerido.',
      invalid_type_error: 'El email debe ser una cadena.',
    })
    .trim()
    .toLowerCase()
    .min(1, { message: 'Debes introducir un email' })
    .email({ message: 'Email inválido.' }),
  password: z
    .string({
      required_error: 'La contraseña es requerida.',
      invalid_type_error: 'La contraseña debe ser una cadena.',
    })
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
  password_confirmation: z
    .string({
      required_error: 'La contraseña es requerida.',
      invalid_type_error: 'La contraseña debe ser una cadena.',
    })
    .optional(),
})

type FormValues = z.infer<typeof FormSchema>

export interface RegisterFormProps
  extends React.ComponentPropsWithoutRef<'form'> {}

export function RegisterForm({ ...props }: RegisterFormProps) {
  const { register } = useAuth()
  const { toast } = useToast()

  const router = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const handleSubmit = useCallback(
    (data: FormValues) => {
      startTransition(async () => {
        const { error } = await register(data)

        if (error) {
          toast({
            variant: 'destructive',
            description: error,
          })

          return
        }

        toast({
          title: 'Gracias por registrarte.',
          description:
            'Verifique su correo electrónico para continuar con el proceso de inicio de sesión.',
        })

        if (pathname.startsWith('/register')) {
          router.push('/')
        }
      })
    },
    [router, pathname, register, toast],
  )

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
        {...props}
      >
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre *</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="given-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido *</FormLabel>
              <FormControl>
                <Input type="text" autoComplete="family-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@ejemplo.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña *</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="********"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña *</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="********"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2 w-full"
          aria-disabled={isPending}
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear cuenta
        </Button>
      </form>
    </Form>
  )
}
