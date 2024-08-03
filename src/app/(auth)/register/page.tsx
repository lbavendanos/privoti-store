import type { Metadata } from 'next'
import { Register } from '@/components/auth/register/register'

export const metadata: Metadata = {
  title: 'Crear cuenta',
}

export default function RegisterPage() {
  return (
    <section className="container my-6 h-full md:my-10 lg:my-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 xl:col-span-4 xl:col-start-5">
          <Register />
        </div>
      </div>
    </section>
  )
}
