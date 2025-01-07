import { type NextRequest, NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { decrypt } from "@lib/actions/session"

export default async function middleware(req: NextRequest) {

    // 1. check if route is protected


    const protectedRoutes = ['/admin', '/user']
    const currentPath = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(currentPath)


    /*
const protectedRoutePrefix = '/admin'
const currentPath = req.nextUrl.pathname
const isProtectedRoute = currentPath.startsWith(protectedRoutePrefix)

*/
    if (isProtectedRoute) {

        // 2.check for valid session

        const cookie = await cookies()

        const isSession = cookie.get('session')?.value

        if (!isSession) {

            // Redirect to login if no cookie is found

            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
        const session = await decrypt(isSession)

        // 3. redirect unauthed users

        if (!session?.userId) {
            return NextResponse.redirect(new URL('/login', req.nextUrl))
        }
    }

    // 4. render route
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/static|_next/image).*)',
    ],
}