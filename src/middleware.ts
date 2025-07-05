import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@lib/actions/session";
import { Roles } from "@/lib/types/global";
import { isRateLimited } from "./lib/rate-limit";

export default async function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const pathname = req.nextUrl.pathname;
  const lang = req.headers.get("accept-language")?.split(",")[0] || "es";

  // // rate limit (evita flood o loops infinitos)
  // if (isRateLimited(ip)) {
  //   return NextResponse.redirect(new URL("/429", req.nextUrl));
  // }

  if (lang === "ch") {
    return new NextResponse("chino no soportado", {
      headers: { "Content-Type": "text/plain" },
    });
  }

  const segments = pathname.split("/");
  const res = NextResponse.next();
  const currentPath = "/" + segments.slice(1).join("/");

  // No aplicar auth ni redirecciones a /api/*
  if (currentPath.startsWith("/api/")) {
    return res;
  }

  // CORS para orígenes permitidos
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

  // OPTIONS preflight para CORS
  if (req.method === "OPTIONS" && currentPath.startsWith("/api/")) {
    return new NextResponse(null, { status: 200, headers: res.headers });
  }

  // Rutas públicas
  const publicRoutes = ["/", "/login", "/register", "/about"];
  const isPublicRoute = publicRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isPublicRoute) return res;

  // Rutas con roles
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
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const session = await decrypt(sessionCookie);

    console.log(session);
    // Aquí podrías verificar si el usuario tiene el rol adecuado, etc.
  }

  return res;
}

// Aplica a todo excepto archivos estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
