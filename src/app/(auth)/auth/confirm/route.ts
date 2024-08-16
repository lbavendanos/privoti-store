import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { api } from '@/lib/http'
import { url } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const cookieStore = cookies()

  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/'

  if (type === 'verify-email') {
    const id = searchParams.get('id')
    const token = searchParams.get('token')
    const expires = searchParams.get('expires')
    const signature = searchParams.get('signature')

    if (id && token && expires && signature) {
      try {
        await api.get(`/verify-email/${id}/${token}`, {
          params: { expires, signature },
          cookies: cookieStore,
          headers: {
            Cookie: cookieStore
              .getAll()
              .map((c) => `${c.name}=${c.value}`)
              .join('; '),
          },
        })
      } catch (error: any) {
        return NextResponse.redirect(url(`/auth/error?type=${type}`))
      }
    }
  }

  if (type === 'verify-new-email') {
    const id = searchParams.get('id')
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    const expires = searchParams.get('expires')
    const signature = searchParams.get('signature')

    if (id && email && token && expires && signature) {
      try {
        await api.get(`/api/auth/user/email/verify/${id}/${email}/${token}`, {
          params: { expires, signature },
          cookies: cookieStore,
          headers: {
            Origin: url().origin,
            Referer: url().toString(),
            Cookie: cookieStore
              .getAll()
              .map((c) => `${c.name}=${c.value}`)
              .join('; '),
          },
        })
      } catch (error: any) {
        return NextResponse.redirect(url(`/auth/error?type=${type}`))
      }
    }
  }

  return NextResponse.redirect(url(next))
}
