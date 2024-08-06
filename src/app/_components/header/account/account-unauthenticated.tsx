'use client'

import { useCallback, useEffect, useState } from 'react'
import { Login } from '@/components/auth/login/login'
import { Register } from '@/components/auth/register/register'
import { Forgot } from '@/components/auth/password/forgot/forgot'
// import { useAccountSheet } from './account-sheet'

export function AccountUnauthenticated() {
  // const { close } = useAccountSheet()

  const [showLogin, setShowLogin] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleLoginClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()

      setShowLogin(true)
      setShowRegister(false)
      setShowForgotPassword(false)
    },
    [],
  )

  const handleRegisterClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()

      setShowLogin(false)
      setShowRegister(true)
      setShowForgotPassword(false)
    },
    [],
  )

  const handleForgotPasswordClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()

      setShowRegister(false)
      setShowLogin(false)
      setShowForgotPassword(true)
    },
    [],
  )

  const handleForgotSuccess = useCallback(
    () => {
      // close?.()
    },
    [
      // close
    ],
  )

  return (
    <div className="flex min-h-full w-full flex-col justify-center">
      {showLogin && (
        <Login
          className="border-0 shadow-none"
          onRegisterClick={handleRegisterClick}
          onForgotPasswordClick={handleForgotPasswordClick}
        />
      )}
      {showRegister && (
        <Register
          className="border-0 shadow-none"
          onLoginClick={handleLoginClick}
        />
      )}
      {showForgotPassword && (
        <Forgot
          className="border-0 shadow-none"
          onSuccess={handleForgotSuccess}
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
        />
      )}
    </div>
  )
}
