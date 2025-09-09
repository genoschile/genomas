import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@lib/actions/session";
import { Roles } from "@/lib/types/global";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./lib/api/auth/auth";

export default async function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const pathname = req.nextUrl.pathname;
  const lang = req.headers.get("accept-language")?.split(",")[0] || "es";

  const segments = pathname.split("/");
  const currentPath = "/" + segments.slice(1).join("/");
  const res = NextResponse.next();

  // 🌍 Idioma no soportado
  if (lang === "ch") {
    return new NextResponse("Chino no soportado", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  // 🚫 No aplicar auth a rutas API públicas
  if (
    currentPath.startsWith("/api/auth") ||
    currentPath.startsWith("/api/public")
  ) {
    return res;
  }

  // 🌐 CORS permitido solo para ciertos orígenes
  const allowedOrigins = ["http://localhost:3002", "https://varandcode.com"];
  const origin = req.headers.get("origin") || "";

  if (allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT,OPTIONS"
    );
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }

  // ✅ Respuesta para OPTIONS (preflight)
  if (req.method === "OPTIONS" && currentPath.startsWith("/api/")) {
    return new NextResponse(null, { status: 200, headers: res.headers });
  }

  // 🔓 Rutas públicas
  const publicRoutes = ["/", "/login", "/register", "/about"];
  const isPublicRoute = publicRoutes.some((route) =>
    currentPath.startsWith(route)
  );
  if (isPublicRoute) return res;

  // 🔐 Verificamos el access token
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (accessToken) {
    try {
      verifyAccessToken(accessToken);
    } catch (err) {
      // Si el access token es inválido o expiró, probamos el refresh token
      const refreshToken = req.cookies.get("refreshToken")?.value;

      if (!refreshToken) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      try {
        const payload = verifyRefreshToken(refreshToken) as {
          id: string;
          email: string;
        };

        // Generamos un nuevo access token
        const newAccessToken = generateAccessToken({
          id: payload.id,
          email: payload.email,
        });

        // Clonamos la respuesta y agregamos el nuevo header Authorization
        const response = NextResponse.next();
        response.headers.set("Authorization", `Bearer ${newAccessToken}`);

        return response;
      } catch {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  } else {
    // No hay access token → probamos refresh token
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const payload = verifyRefreshToken(refreshToken) as {
        id: string;
        email: string;
      };
      const newAccessToken = generateAccessToken({
        id: payload.id,
        email: payload.email,
      });

      const response = NextResponse.next();
      response.headers.set("Authorization", `Bearer ${newAccessToken}`);
      return response;
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 🔐 Verificación de roles en rutas específicas
  const roleProtectedPrefixes: { prefix: string; role: Roles }[] = [
    { prefix: "/admin", role: "admin" },
    { prefix: "/user", role: "user" },
  ];

  const matchingRoute = roleProtectedPrefixes.find(({ prefix }) =>
    currentPath.startsWith(prefix)
  );

  if (matchingRoute) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const session = await decrypt(sessionCookie);

    // if (session.role !== matchingRoute.role) {
    //   return NextResponse.redirect(new URL("/403", req.url)); // No autorizado
    // }
  }

  return res;
}

// Aplica a todo excepto archivos estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
