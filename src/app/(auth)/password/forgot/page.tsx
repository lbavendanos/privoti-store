import { Forgot } from '@/components/auth/password/forgot/forgot'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '¿Olvidaste tu contraseña?',
}

export default function ForgotPage() {
  return (
    <section className="container my-6 h-full md:my-10 lg:my-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5">
          <Forgot />
        </div>
      </div>
    </section>
  )
}
