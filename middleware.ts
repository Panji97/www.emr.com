import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const token = request.cookies.get('access_token')

    // Regex untuk file-file statis
    const staticFileRegex = /\.(css|js|jpg|jpeg|png|gif|ico|svg|ttf|woff|woff2)$/

    // Penanganan file statis
    if (staticFileRegex.test(pathname)) return NextResponse.next()

    // Pengecekan untuk akses halaman otentikasi
    if (
        token &&
        (pathname.startsWith('/auth/login') ||
            pathname.startsWith('/auth/register') ||
            pathname.startsWith('/auth/forgot-password') ||
            pathname.startsWith('/auth/reset-password'))
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // Redirect ke halaman login jika tidak ada token
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
