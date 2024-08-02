import { FooterCopyright } from './footer-copyright'
import { FooterSocial } from './footer-social'

export function Footer() {
  return (
    <footer className="container my-10">
      <div className="grid grid-cols-12 place-items-center items-center gap-6">
        <div className="col-span-12">
          <FooterSocial />
        </div>
        <div className="col-span-12">
          <FooterCopyright />
        </div>
      </div>
    </footer>
  )
}
