import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@lib/actions/session";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Lista de orígenes permitidos (incluye localhost para desarrollo)
  const allowedOrigins = ["http://localhost:3000", "https://varandcode.com"];
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

  // Manejar preflight (OPTIONS request)
  if (req.method === "OPTIONS" && req.nextUrl.pathname.startsWith("/api/")) {
    return new NextResponse(null, { status: 200, headers: res.headers });
  }

  // Proteger rutas específicas
  const protectedRoutes = ["/admin", "/user"];
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const cookie = await cookies();
    const isSession = cookie.get("session")?.value;

    if (!isSession) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    const session = await decrypt(isSession);

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  }

  return res;
}

// 🔹 Aplicar middleware a todas las rutas excepto archivos estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
