import { NextRequest, NextResponse } from 'next/server'

const accessToken = (request: NextRequest) => {
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

const accessPermission = (request: NextRequest) => {
    const menuCookie = request.cookies.get('menu')

    const menu = menuCookie ? JSON.parse(menuCookie.value) : null

    const allowedPaths = menu?.reduce(
        (acc: string[], item: any) => {
            if (item.items) {
                item.items.forEach((subItem: any) => acc.push(subItem.to))
            }
            return acc
        },
        ['/auth/access']
    )

    let pathname = request.nextUrl.pathname

    // Regex untuk file-file statis
    const staticFileRegex = /\.(css|jpg|jpeg|png|gif|ico|svg|ttf|woff|woff2)$/

    // Penanganan file statis
    if (staticFileRegex.test(pathname)) return NextResponse.next()

    // Filter path yang hanya mengandung prefix (main) dan (full-page)
    const validPathRegex = /^\/\((main|full-page)\)\//

    // Abaikan jika path tidak mengandung prefix (main) atau (full-page)
    if (!validPathRegex.test(pathname)) {
        return NextResponse.next()
    }

    // Abaikan path layout.js seperti /(main)/layout.js atau /(full-page)/layout.js
    if (pathname.includes('/layout.js')) {
        return NextResponse.next()
    }

    console.log(pathname)

    // pathname yang sampai pada logic ini hanya path yang mengandung (main) dan (full-page) saja
    if (!allowedPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/auth/access', request.url))
    }

    return NextResponse.next()
}

export function middleware(request: NextRequest) {
    let response = accessToken(request)

    if (response.status !== 200) return response

    accessPermission(request)
}

export const config = {
    matcher: ['/:path*']
}
