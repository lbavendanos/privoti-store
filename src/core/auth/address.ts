import useSWR from 'swr'
import { useCallback, useMemo } from 'react'
import { api, ApiError } from '@/lib/http'

export interface Address {
  id: number
  first_name: string
  last_name: string
  phone: string
  address1: string
  address2: string
  district: string
  city: string
  state: string
  default: boolean
  user_id: number
}

export type Addresses = Address[]

export type AddressResponse = { address?: Address } & ApiError

export function useAddresses(
  config: Parameters<typeof useSWR<Addresses>>[2] = {},
) {
  const { data, mutate, ...rest } = useSWR<Addresses>(
    '/api/auth/addresses',
    (url: string) =>
      api
        .get<{ data: Addresses }>(url)
        .then(({ data: response }) => response.data),
    config,
  )

  const addresses = useMemo(() => data || [], [data])

  const setAddresses = useCallback(
    (addresses: Addresses) => {
      mutate(addresses)
    },
    [mutate],
  )

  const addAddress = useCallback(
    async (address: Address): Promise<AddressResponse> => {
      try {
        const {
          data: { data: addressAdded },
        } = await api.post<{ data: Address }>('/api/auth/addresses', address)

        setAddresses([...addresses, addressAdded])

        return { address: addressAdded }
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [addresses, setAddresses],
  )

  const updateAddress = useCallback(
    async (address: Address): Promise<AddressResponse> => {
      try {
        const {
          data: { data: addressUpdated },
        } = await api.put(`/api/auth/addresses/${address.id}`, address)

        setAddresses(
          addresses.map((a) =>
            a.id === addressUpdated.id ? addressUpdated : a,
          ),
        )

        return { address: addressUpdated }
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [addresses, setAddresses],
  )

  // const setDefaultAddress = useCallback(
  //   (address: Address) => {
  //     mutate(
  //       addresses.map((a) => ({
  //         ...a,
  //         default: a.id === address.id,
  //       })),
  //     )
  //   },
  //   [mutate, addresses],
  // )

  const removeAddress = useCallback(
    async (address: Address): Promise<AddressResponse> => {
      try {
        await api.delete(`/api/auth/addresses/${address.id}`)

        setAddresses(addresses.filter((a) => a.id !== address.id))

        return {}
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [addresses, setAddresses],
  )

  return {
    addresses,
    setAddresses,
    addAddress,
    updateAddress,
    // setDefaultAddress,
    removeAddress,
    mutate,
    ...rest,
  }
}
