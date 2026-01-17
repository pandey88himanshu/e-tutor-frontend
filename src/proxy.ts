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

    // Check if route is protected
    const isProtectedRoute = matchRoute(pathname, protectedRoutes);
    const isAuthRoute = matchRoute(pathname, authRoutes);

    // If route doesn't need auth handling, continue
    if (!isProtectedRoute && !isAuthRoute) {
        return NextResponse.next();
    }

    // Get access token from cookies (set by the client after login)
    // Note: Since you store accessToken in localStorage (client-side only),
    // we'll need to check via a cookie that we set during login
    const accessToken = request.cookies.get("accessToken")?.value;

    // DEBUG: Log all cookies
    console.log("🔍 [Proxy] Path:", pathname);
    console.log("🔍 [Proxy] AccessToken cookie:", accessToken ? "EXISTS" : "MISSING");
    console.log("🔍 [Proxy] All cookies:", request.cookies.getAll().map(c => c.name));

    // If we have an access token, user is authenticated
    let isAuthenticated = !!accessToken;

    // If no access token, try to refresh using the refresh token cookie
    if (!isAuthenticated) {
        console.log("🔄 [Proxy] No accessToken, attempting refresh...");
        const refreshResult = await refreshAccessToken(request);

        if (refreshResult?.accessToken) {
            console.log("✅ [Proxy] Refresh succeeded, got new token");
            isAuthenticated = true;

            // Create response and set the new access token cookie
            const response = isAuthRoute
                ? NextResponse.redirect(new URL("/", request.url))
                : NextResponse.next();

            // Set the new access token as a cookie
            response.cookies.set("accessToken", refreshResult.accessToken, {
                httpOnly: false, // Allow client-side access
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 15, // 15 minutes (match your access token expiry)
                path: "/",
            });

            return response;
        }
    }

    // Handle auth routes (sign-in, sign-up) - redirect authenticated users away
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Handle protected routes - redirect unauthenticated users to sign-in
    if (isProtectedRoute && !isAuthenticated) {
        const signInUrl = new URL("/sign-in", request.url);
        // Store the original URL to redirect back after login
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
