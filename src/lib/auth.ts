import type { ApiError } from './http'
import useSWR from 'swr'
import { api } from './http'
import { useCallback, useMemo } from 'react'

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

export type AuthResponse = { user?: User } & ApiError

export function useAuth() {
  const {
    data: user,
    isLoading,
    mutate,
  } = useSWR<User | null>(
    '/api/auth/user',
    (url: string) =>
      api.get<{ data: User }>(url).then(({ data: response }) => response.data),
    {
      shouldRetryOnError: false,
      onError: () => {
        setUser(null, false)
      },
    },
  )

  const check = useMemo(() => !!user, [user])

  const setUser = useCallback(
    (user?: User | null, revalidate: boolean = true) => {
      mutate(user, { revalidate })
    },
    [mutate],
  )

  const csrf = useCallback(() => api.get('/sanctum/csrf-cookie'), [])

  const register = useCallback(
    async (data: {
      first_name: string
      last_name: string
      email: string
      password: string
      password_confirmation?: string
    }): Promise<AuthResponse> => {
      await csrf()

      try {
        const {
          data: { data: user },
        } = await api.post<{ data: User }>('/register', data)

        setUser(user)

        return { user }
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [csrf, setUser],
  )

  const login = useCallback(
    async (data: {
      email: string
      password: string
      remember: boolean
    }): Promise<AuthResponse> => {
      await csrf()

      try {
        const {
          data: { data: user },
        } = await api.post<{ data: User }>('/login', data)

        setUser(user)

        return { user }
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [csrf, setUser],
  )

  const sendResetEmail = useCallback(
    async (data: { email: string }): Promise<AuthResponse> => {
      await csrf()

      try {
        await api.post('/forgot-password', data)

        return {}
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [csrf],
  )

  const resetPassword = useCallback(
    async (data: {
      token: string
      email: string
      password: string
      password_confirmation?: string
    }): Promise<AuthResponse> => {
      await csrf()

      try {
        const {
          data: { data: user },
        } = await api.post('/reset-password', data)

        setUser(user)

        return { user }
      } catch (error: any) {
        return api.handleError(error)
      }
    },
    [csrf, setUser],
  )

  const resendEmailVerification =
    useCallback(async (): Promise<AuthResponse> => {
      try {
        await api.post('/email/verification-notification')

        return {}
      } catch (error: any) {
        return api.handleError(error)
      }
    }, [])

  const logout = useCallback(async (): Promise<AuthResponse> => {
    try {
      await api.post('/logout')

      setUser(null)

      return {}
    } catch (error: any) {
      return api.handleError(error)
    }
  }, [setUser])

  return {
    isLoading,
    user,
    setUser,
    check,
    register,
    login,
    sendResetEmail,
    resetPassword,
    resendEmailVerification,
    logout,
  }
}
