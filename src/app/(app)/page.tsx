import { HomeEmailVerifyAlert } from './components/home-email-verify-alert'

export default function HomePage() {
  return (
    <div className="container my-6 md:my-10 lg:my-12">
      <section className="grid grid-cols-12 items-center gap-6">
        <div className="col-span-12">Home Page</div>
      </section>
      <HomeEmailVerifyAlert />
    </div>
  )
}
