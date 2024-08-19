import type { ApiError } from '@/lib/http'
import useSWR from 'swr'
import { useCallback, useMemo } from 'react'
import { api } from '@/lib/http'

export interface User {
  id: number
  first_name: string
  last_name: string
  dob?: string
  phone?: string
  email: string
  email_verified_at?: string
  updated_at?: string
  created_at?: string
}

export type UserResponse = { user?: User } & ApiError

export function useUser(
  config: Parameters<typeof useSWR<User | null>>[2] = {},
) {
  const { data, isLoading, mutate } = useSWR<User | null>(
    '/api/auth/user',
    (url: string) =>
      api.get<{ data: User }>(url).then(({ data: response }) => response.data),
    config,
  )

  const user = useMemo(() => data || null, [data])

  const setUser = useCallback(
    (user?: User | null, revalidate: boolean = true) => {
      mutate(user, { revalidate })
    },
    [mutate],
  )

  const updateUser = useCallback(
    async (data: {
      first_name: string
      last_name: string
      phone?: string
      dob?: string
    }): Promise<UserResponse> => {
      try {
        const {
          data: { data: user },
        } = await api.put<{ data: User }>('/api/auth/user', data)

        setUser(user)

        return { user }
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [setUser],
  )

  const updatePassword = useCallback(
    async (data: {
      current_password: string
      password?: string
    }): Promise<UserResponse> => {
      try {
        await api.post('/api/auth/user/password', data)

        return {}
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [],
  )

  const sendEmailVerificationNotification =
    useCallback(async (): Promise<UserResponse> => {
      try {
        await api.post('/api/auth/user/email/notification')

        return {}
      } catch (error: any) {
        return api.handleError(error)
      }
    }, [])

  const sendEmailChangeVerificationNotification = useCallback(
    async (data: { email: string }): Promise<UserResponse> => {
      try {
        await api.post('/api/auth/user/email/new/notification', data)

        return {}
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [],
  )

  return {
    isLoading,
    user,
    setUser,
    updateUser,
    updatePassword,
    sendEmailVerificationNotification,
    sendEmailChangeVerificationNotification,
  }
}
