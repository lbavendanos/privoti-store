import type { User, UserResponse } from './user'
import { useCallback, useMemo } from 'react'
import { useUser } from './user'
import { api } from '@/lib/http'

export function useAuth() {
  const { user, setUser, ...rest } = useUser({
    shouldRetryOnError: false,
    onError: () => {
      setUser(null, false)
    },
  })

  const check = useMemo(() => !!user, [user])

  const csrf = useCallback(() => api.get('/sanctum/csrf-cookie'), [])

  const register = useCallback(
    async (data: {
      first_name: string
      last_name: string
      email: string
      password: string
      password_confirmation?: string
    }): Promise<UserResponse> => {
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
    }): Promise<UserResponse> => {
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
    async (data: { email: string }): Promise<UserResponse> => {
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
    }): Promise<UserResponse> => {
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
    useCallback(async (): Promise<UserResponse> => {
      try {
        await api.post('/email/verification-notification')

        return {}
      } catch (error: any) {
        return api.handleError(error)
      }
    }, [])

  const logout = useCallback(async (): Promise<UserResponse> => {
    try {
      await api.post('/logout')

      setUser(null)

      return {}
    } catch (error: any) {
      return api.handleError(error)
    }
  }, [setUser])

  return {
    user,
    check,
    register,
    login,
    sendResetEmail,
    resetPassword,
    resendEmailVerification,
    logout,
    ...rest,
  }
}
