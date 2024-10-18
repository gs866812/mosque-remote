import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Convert the JWT_SECRET from your .env file into a Uint8Array for `jose` to use.
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
  const token = req.cookies.get('authToken')?.value; // Get the auth token from cookies

  const url = req.nextUrl.clone();

  if (!token) {
    // Redirect user to login page if token is missing and the path is protected
    if (url.pathname.startsWith('/admin')) {
      url.pathname = '/login';
      url.searchParams.set('redirect', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  } else {
    try {
      // Verify the token using jose
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next(); // Token is valid, allow access
    } catch (error) {
      if (url.pathname.startsWith('/admin')) {
        url.pathname = '/login';
        url.searchParams.set('redirect', req.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next(); // Allow access to non-protected pages
}

export const config = {
  matcher: ['/admin/:path*'], // Protect all routes under /admin
};
