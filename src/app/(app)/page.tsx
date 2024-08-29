import { Suspense } from 'react'
import { HomeEmailVerifyAlert } from './_components/home-email-verify-alert'

export default function HomePage() {
  return (
    <div className="container my-6 md:my-10 lg:my-12">
      <section className="grid grid-cols-12 items-center gap-6">
        <div className="col-span-12">Home Page</div>
      </section>
      <Suspense fallback={null}>
        <HomeEmailVerifyAlert />
      </Suspense>
    </div>
  )
}
