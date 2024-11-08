import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const accessToken = (request: NextRequest) => {
    const pathname = request.nextUrl.pathname

    const token = request.cookies.get('access_token')

    const staticFileRegex = /\.(css|js|jpg|jpeg|png|gif|ico|svg|ttf|woff|woff2)$/

    if (staticFileRegex.test(pathname)) return NextResponse.next()

    if (
        token &&
        (pathname.startsWith('/auth/login') ||
            pathname.startsWith('/auth/register') ||
            pathname.startsWith('/auth/forgot-password') ||
            pathname.startsWith('/auth/reset-password'))
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

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

    const allowedPaths = menu?.reduce((acc: string[], item: any) => {
        if (item.items) {
            item.items.forEach((subItem: any) => acc.push(subItem.to))
        }
        return acc
    }, [])

    let pathname = request.nextUrl.pathname

    const staticFileRegex = /\.(css|jpg|jpeg|png|gif|ico|svg|ttf|woff|woff2)$/

    if (staticFileRegex.test(pathname)) return NextResponse.next()

    const validPathRegex = /\/\(main\)\//

    if (!validPathRegex.test(pathname)) return NextResponse.next()

    if (pathname.includes('/layout.js')) return NextResponse.next()

    let slicePathname = ''
    if (pathname.includes('/(main)/')) slicePathname = pathname.slice(31)
    else if (pathname.includes('/(full-page)/')) slicePathname = pathname.slice(36)

    slicePathname = slicePathname.slice(0, slicePathname.lastIndexOf('/page.js'))

    const isAllowed = allowedPaths?.some((path: any) => path === slicePathname)

    if (!isAllowed) return NextResponse.redirect(new URL('/auth/access', request.url))

    return NextResponse.next()
}

export function middleware(request: NextRequest) {
    let response = accessToken(request)

    if (response.status !== 200) return response

    accessPermission(request)

    return response
}

export const config = {
    matcher: ['/:path*']
}
