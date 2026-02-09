import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* =======================
   PROTECTED ROUTES CONFIG
   ======================= 
   Add routes here that require authentication.
   Supports exact paths and patterns with wildcards.
*/

const protectedRoutes = [
    "/dashboard",
    "/dashboard/:path*",
    "/become-instructor-form",
    "/instructor-dashboard",
    "/instructor-dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/settings",
    "/my-courses",
    "/my-courses/:path*",
    "/wishlist",
    "/cart",
    "/checkout",
];

/* =======================
   ADMIN ROUTES CONFIG
   ======================= 
   Routes that admin users CAN access.
   Admin users will be BLOCKED from all other routes.
*/

const adminRoutes = [
    "/admin",
    "/admin/:path*",
];

/* =======================
   AUTH ROUTES
   =======================
   Routes that authenticated users should NOT access.
   They will be redirected to home page.
*/

const authRoutes = [
    "/sign-in",
    "/sign-up",
    "/verify-otp",
];

/* =======================
   ROUTE MATCHING HELPER
   ======================= */

function matchRoute(pathname: string, patterns: string[]): boolean {
    for (const pattern of patterns) {
        // Handle wildcard patterns like /path/:path*
        if (pattern.includes(":path*")) {
            const basePattern = pattern.replace("/:path*", "");
            if (pathname === basePattern || pathname.startsWith(basePattern + "/")) {
                return true;
            }
        }
        // Exact match
        else if (pathname === pattern) {
            return true;
        }
    }
    return false;
}

/* =======================
   TOKEN REFRESH HELPER
   ======================= */

interface RefreshResponse {
    accessToken: string;
    user?: {
        id: string;
        email: string;
        username: string;
        role?: "USER" | "ADMIN" | "INSTRUCTOR";
    };
}

async function refreshAccessToken(request: NextRequest): Promise<RefreshResponse | null> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        console.error("❌ NEXT_PUBLIC_API_URL not configured");
        return null;
    }

    try {
        // Forward cookies from the incoming request to the refresh endpoint
        const response = await fetch(`${apiUrl}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Forward cookies from the original request
                Cookie: request.headers.get("cookie") || "",
            },
            credentials: "include",
        });

        if (!response.ok) {
            console.log("🔄 Refresh token expired or invalid");
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Token refresh failed:", error);
        return null;
    }
}

/* =======================
   MIDDLEWARE
   ======================= */

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip static files and API routes
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Check route types
    const isProtectedRoute = matchRoute(pathname, protectedRoutes);
    const isAuthRoute = matchRoute(pathname, authRoutes);
    const isAdminRoute = matchRoute(pathname, adminRoutes);

    // Get access token and role from cookies
    const accessToken = request.cookies.get("accessToken")?.value;
    const userRoleCookie = request.cookies.get("userRole")?.value;

    // DEBUG: Log request info
    console.log("🔍 [Proxy] Path:", pathname);
    console.log("🔍 [Proxy] AccessToken cookie:", accessToken ? "EXISTS" : "MISSING");
    console.log("🔍 [Proxy] UserRole cookie:", userRoleCookie || "MISSING");

    // Determine authentication status and role
    let isAuthenticated = !!accessToken;
    let userRole: string | undefined = userRoleCookie;

    // If no role cookie, try to decode role from access token
    if (!userRole && accessToken) {
        try {
            const payload = JSON.parse(atob(accessToken.split(".")[1]));
            userRole = payload.role;
            console.log("🔍 [Proxy] Role from JWT:", userRole);
        } catch {
            // Invalid token format
        }
    }

    // 🚨 IMPORTANT: Server-side refresh CANNOT work for cross-origin cookies!
    // The refreshToken cookie is set for the backend domain (onrender.com),
    // so it's NOT accessible from the frontend's server (vercel.app).
    // Token refresh must happen CLIENT-SIDE where the browser can send cookies.

    // Just check if we have an accessToken - if not, user needs to login client-side
    if (!isAuthenticated) {
        console.log("⚠️ [Proxy] No accessToken - user may need to refresh client-side");
    }

    // ==========================================
    // ADMIN USER RESTRICTIONS
    // Admin users can ONLY access /admin routes
    // ==========================================
    if (isAuthenticated && userRole === "ADMIN") {
        // If admin is trying to access a non-admin route, redirect to /admin
        if (!isAdminRoute && !isAuthRoute) {
            console.log("🔒 [Proxy] Admin trying to access non-admin route, redirecting to /admin");
            return NextResponse.redirect(new URL("/admin", request.url));
        }
    }

    // Handle admin routes - require admin role
    if (isAdminRoute) {
        if (!isAuthenticated) {
            const signInUrl = new URL("/sign-in", request.url);
            signInUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(signInUrl);
        }
        if (userRole !== "ADMIN") {
            // Not admin, redirect to home
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // Handle auth routes - redirect authenticated users away
    if (isAuthRoute && isAuthenticated) {
        const redirectUrl = userRole === "ADMIN" ? "/admin" : "/";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Handle protected routes - redirect unauthenticated users to sign-in
    if (isProtectedRoute && !isAuthenticated) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

/* =======================
   MATCHER CONFIG
   =======================
   Define which paths this middleware should run on.
   Using a matcher improves performance by skipping static files.
*/

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files (images, etc.)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|images|icons|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.gif$).*)",
    ],
};
