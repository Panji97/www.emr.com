import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const token = request.cookies.get('access_token')

    const staticFileRegex = /\.(css|js|jpg|jpeg|png|gif|ico|svg|ttf|woff|woff2)$/

    if (staticFileRegex.test(pathname)) return NextResponse.next()

    if (
        !token &&
        !(
            pathname.startsWith('/auth/login') ||
            pathname.startsWith('/auth/register') ||
            pathname.startsWith('/auth/forgot-password') ||
            pathname.startsWith('/auth/reset-password')
        )
    ) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/:path*']
}
