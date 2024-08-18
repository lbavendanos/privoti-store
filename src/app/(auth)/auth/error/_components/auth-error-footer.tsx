'use client'

import { useAuth } from '@/core/auth'
import { Skeleton } from '@/components/ui/skeleton'
import { LoginFooter } from '@/components/auth/login/login-footer'
import { RegisterFooter } from '@/components/auth/register/register-footer'

export function AuthErrorFooter() {
  const { isLoading, check } = useAuth()

  if (isLoading) return <AuthErrorFooterFallback />
  if (check) return null

  return (
    <div className="mt-6 space-y-1 text-center">
      <LoginFooter />
      <RegisterFooter />
    </div>
  )
}

function AuthErrorFooterFallback() {
  return (
    <div className="mt-6 flex flex-col items-center gap-y-1">
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  )
}
