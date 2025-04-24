import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@lib/actions/session";
import { Roles } from "@/lib/types/global";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Extraer el lang
  const segments = pathname.split("/");

  const res = NextResponse.next();
  // const currentPath = req.nextUrl.pathname;

  const currentPath = "/" + segments.slice(1).join("/");

  // 1. Orígenes permitidos
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

  // 2. Manejar preflight (OPTIONS request)
  if (req.method === "OPTIONS" && currentPath.startsWith("/api/")) {
    return new NextResponse(null, { status: 200, headers: res.headers });
  }

  // 3. Rutas públicas (no requieren autenticación)
  const publicRoutes = ["/", "/login", "/register", "/about"];
  const isPublicRoute = publicRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  if (isPublicRoute) {
    return res; // no hacer nada si es pública
  }

  // 4. Rutas protegidas por prefijo + rol
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

    // Validar que exista session, userId y role
    if (!session || !session.userId || !session.metadata?.role) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Validar que el rol coincida con el requerido por la ruta
    if (session.metadata.role !== matchingRoute.role) {
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }

  return res;
}

// 5. Aplicar a todo excepto archivos estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
