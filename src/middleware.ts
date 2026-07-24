import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const isWww = host.startsWith('www.')

  if (!isWww && !host.includes('localhost')) {
    const url = new URL(request.url)
    url.host = `www.${host}`
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
