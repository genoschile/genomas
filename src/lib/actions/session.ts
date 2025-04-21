'use server'
import 'server-only'

import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { JWT_SECRET } from '@Config/env';

const key = new TextEncoder().encode(JWT_SECRET)

const cookie = {
    name: 'session',
    options: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax' as 'lax' | 'strict' | 'none',
        path: '/'
    },
    duration: 24 * 60 * 60 * 1000
}

export async function encrypt(payload: CustomJwtSessionClaims): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(key);
  }
  
export async function decrypt(session: string) {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256']
        })

        return payload as { userId: number | string }

    } catch (error) {
        return null
    }
}

export async function createSession(userId: string | null | number) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({
        userId: "123",
        metadata: {
          role: "admin",
        },
      });

    const isCookie = await cookies()

    isCookie.set(cookie.name, session, {
        ...cookie.options,
        expires
    })

    return "/admin"
}

type Session = {
    userId: String | number;
};
export async function verifySession(): Promise<Session | undefined> {

    const cookiep = (await cookies()).get(cookie.name)?.value

    if (!cookiep) return

    const session = await decrypt(cookiep)

    if (!session?.userId) {
        redirect('/login')
    }

    return { userId: session.userId }
}

export async function verifySessionClient() {
    const cookiep = (await cookies()).get(cookie.name)?.value

    if (!cookiep) return

    const session = await decrypt(cookiep)

    return session
}

export async function deleteSession() {

    const isCookie = await cookies()

    isCookie.delete(cookie.name)
}