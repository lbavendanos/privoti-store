'use client'

import type { Address } from '@/core/auth/address'
import isMobilePhone from 'validator/es/lib/isMobilePhone'
import { z } from 'zod'
import { useCallback, useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useAddresses } from '@/core/auth/address'
import { NAME_REGEX } from '@/lib/regex'
import { CITIES } from './address-city'
import { DISTRICTS } from './address-district'
import { STATES } from './address-state'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

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
  phone: z
    .string({
      required_error: 'El celular es requerido.',
      invalid_type_error: 'El celular debe ser una cadena.',
    })
    .trim()
    .min(1, { message: 'Debes introducir un celular' })
    .max(15, { message: 'El celular debe tener maximo 15 dígitos.' })
    .refine(
      (value) =>
        isMobilePhone(value, process.env.NEXT_PUBLIC_APP_LOCALE as any),
      { message: 'El celular es incorrecto.' },
    ),
  address1: z
    .string({
      required_error: 'La dirección es requerida.',
      invalid_type_error: 'La dirección debe ser una cadena.',
    })
    .trim()
    .min(1, { message: 'Debes introducir una dirección' }),
  address2: z
    .string({
      required_error: 'La referencia es requerida.',
      invalid_type_error: 'La referencia debe ser una cadena.',
    })
    .trim()
    .optional(),
  state: z
    .string({
      required_error: 'El departamento es requerido.',
      invalid_type_error: 'El departamento debe ser una cadena.',
    })
    .trim()
    .min(1, { message: 'Debes seleccionar un departamento' }),
  city: z
    .string({
      required_error: 'El provincia es requerido.',
      invalid_type_error: 'El provincia debe ser una cadena.',
    })
    .trim()
    .min(1, { message: 'Debes seleccionar un provincia' }),
  district: z
    .string({
      required_error: 'El distrito es requerido.',
      invalid_type_error: 'El distrito debe ser una cadena.',
    })
    .trim()
    .min(1, { message: 'Debes seleccionar un distrito' }),
})

type FormValues = z.infer<typeof FormSchema>

export const ADDRESS_FORM_ADD_MODE = 'add'
export const ADDRESS_FORM_EDIT_MODE = 'edit'
export type AddressFormMode =
  | typeof ADDRESS_FORM_ADD_MODE
  | typeof ADDRESS_FORM_EDIT_MODE

interface AddressesFormProps {
  mode: AddressFormMode
  address?: Address | null
  onSuccess?: () => void
}

export function AddressForm({ mode, address, onSuccess }: AddressesFormProps) {
  const { addAddress, updateAddress } = useAddresses()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const [openState, setOpenState] = useState(false)
  const [openCity, setOpenCity] = useState(false)
  const [openDistrict, setOpenDistrict] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: address?.first_name || '',
      last_name: address?.last_name || '',
      phone: address?.phone || '',
      address1: address?.address1 || '',
      address2: address?.address2 || '',
      state: address?.state || '',
      city: address?.city || '',
      district: address?.district || '',
    },
  })

  const handleSubmit = useCallback(
    (data: FormValues) => {
      startTransition(async () => {
        const { error } =
          mode === ADDRESS_FORM_ADD_MODE
            ? await addAddress(data as Address)
            : await updateAddress({ ...(data as Address), id: address?.id! })

        if (error) {
          toast({
            variant: 'destructive',
            description: error,
          })

          return
        }

        toast({
          description:
            mode === ADDRESS_FORM_ADD_MODE
              ? 'Su dirección ha sido agregada correctamente.'
              : 'Su dirección ha sido actualizada correctamente.',
        })

        form.reset()
        onSuccess?.()
      })
    },
    [form, mode, address, toast, addAddress, updateAddress, onSuccess],
  )

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
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
          name="address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección *</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referencia *</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departamento *</FormLabel>
              <Select
                open={openState}
                onOpenChange={setOpenState}
                defaultValue={field.value}
                value={field.value}
                onValueChange={(e) => {
                  field.onChange(e)

                  form.setValue('city', '')
                  form.setValue('district', '')
                }}
              >
                <FormControl>
                  <SelectTrigger
                    onClick={() => setOpenState(true)}
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    <SelectValue placeholder="Seleccione un departamento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {STATES.map((state) => (
                    <SelectItem key={state.inei} value={state.name}>
                      {capitalize(state.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provincia *</FormLabel>
              <Select
                open={openCity}
                onOpenChange={setOpenCity}
                defaultValue={field.value}
                value={field.value}
                disabled={!form.getValues('state')}
                onValueChange={(e) => {
                  field.onChange(e)

                  form.setValue('district', '')
                }}
              >
                <FormControl>
                  <SelectTrigger
                    onClick={() => setOpenCity(true)}
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    <SelectValue placeholder="Seleccione una provincia" />
                  </SelectTrigger>
                </FormControl>
                {form.watch('state') && (
                  <SelectContent>
                    {CITIES[form.getValues('state') as keyof typeof CITIES].map(
                      (city) => (
                        <SelectItem key={city.inei} value={city.name}>
                          {capitalize(city.name)}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                )}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distrito *</FormLabel>
              <Select
                open={openDistrict}
                onOpenChange={setOpenDistrict}
                defaultValue={field.value}
                value={field.value}
                disabled={!form.getValues('city')}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger
                    onClick={() => setOpenDistrict(true)}
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    <SelectValue placeholder="Seleccione un distrito" />
                  </SelectTrigger>
                </FormControl>
                {form.watch('city') && (
                  <SelectContent>
                    {DISTRICTS[
                      form.getValues('city') as keyof typeof DISTRICTS
                    ].map((district) => (
                      <SelectItem key={district.inei} value={district.name}>
                        {capitalize(district.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Label htmlFor="country">País</Label>
          <Input id="country" type="text" value="Perú" readOnly={true} />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular *</FormLabel>
              <FormControl>
                <Input type="tel" autoComplete="tel" {...field} />
              </FormControl>
              <FormDescription>
                Solo te llamaremos si tenemos alguna duda sobre tu pedido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mb-6 mt-2 flex flex-col gap-y-2">
          <Button type="submit" aria-disabled={isPending} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === ADDRESS_FORM_ADD_MODE ? 'Agregar' : 'Guardar'} dirección
          </Button>
          {mode === ADDRESS_FORM_EDIT_MODE && address && !address.default && (
            <AddressDefaultButton address={address} onSuccess={onSuccess} />
          )}
          {mode === ADDRESS_FORM_EDIT_MODE && address && !address.default && (
            <AddressDeleteButton address={address} onSuccess={onSuccess} />
          )}
        </div>
      </form>
    </Form>
  )
}

function AddressDefaultButton({
  address,
  onSuccess,
}: {
  address: Address
  onSuccess?: () => void
}) {
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const handleDefault = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      startTransition(async () => {
        // const { data, success } = await setDefaultAddressAction(address.id)
        //
        // if (!success) {
        //   toast({
        //     variant: 'destructive',
        //     title: 'Uh oh! Algo salió mal.',
        //     description: 'Hubo un problema con su solicitud.',
        //   })
        //
        //   return
        // }
        //
        // if (data) {
        //   setDefaultAddress(data)
        // }
        //
        // toast({
        //   description: 'Se ha establecido su dirección predeterminada.',
        // })
        //
        // onSuccess?.()
      })
    },
    [
      // toast, setDefaultAddress, onSuccess, address
    ],
  )

  return (
    <Button
      type="button"
      variant="outline"
      aria-disabled={isPending}
      disabled={isPending}
      onClick={handleDefault}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Establecer como predeterminada
    </Button>
  )
}

function AddressDeleteButton({
  address,
  onSuccess,
}: {
  address: Address
  onSuccess?: () => void
}) {
  const { removeAddress } = useAddresses()
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      startTransition(async () => {
        await removeAddress(address)

        toast({
          description: 'Su dirección ha sido eliminada correctamente.',
        })

        onSuccess?.()
      })
    },
    [address, toast, removeAddress, onSuccess],
  )

  return (
    <Button
      type="button"
      variant="outline"
      aria-disabled={isPending}
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Eliminar dirección
    </Button>
  )
}
