import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const isWww = host.startsWith('www.')

  const url = new URL(request.url)

  if (!isWww && !host.includes('localhost')) {
    url.host = `www.${host}`
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  if (url.protocol === 'http:' && !host.includes('localhost')) {
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}
