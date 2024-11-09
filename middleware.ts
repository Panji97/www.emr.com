import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const staticFileRegex = /\.(css|js|jpg|jpeg|png|gif|ico|svg|ttf|woff|woff2)$/

    if (staticFileRegex.test(pathname)) return NextResponse.next()

    const token = request.cookies.get('access_token')

    const isAuthPath =
        pathname.startsWith('/auth/login') ||
        pathname.startsWith('/auth/register') ||
        pathname.startsWith('/auth/forgot-password') ||
        pathname.startsWith('/auth/reset-password')

    if (!token && !isAuthPath) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (pathname.startsWith('/auth/login')) return NextResponse.next()

    if (pathname.startsWith('/auth/access')) return NextResponse.next()

    const menuCookie = request.cookies.get('menu')

    if (menuCookie) {
        const menu = JSON.parse(menuCookie.value)

        const extractToValues = (items: any[]) => {
            let toValues: string[] = []

            items.forEach((item) => {
                if (item.to) {
                    toValues.push(item.to)
                }
                if (item.items && item.items.length > 0) {
                    toValues = toValues.concat(extractToValues(item.items))
                }
            })

            return toValues
        }

        const allToValues = menu.flatMap((section: any) => extractToValues(section.items))

        if (!allToValues.includes(pathname)) {
            return NextResponse.redirect(new URL('/auth/access', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/:path*']
}
