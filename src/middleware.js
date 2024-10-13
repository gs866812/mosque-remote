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
      // console.log('Token verified successfully');
      return NextResponse.next(); // Token is valid, allow access
    } catch (error) {
      console.log('Token verification failed:', error.message); // Log verification errors
      if (url.pathname.startsWith('/admin'))  {
        url.pathname = '/login';
        url.searchParams.set('redirect', req.nextUrl.pathname);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next(); // Allow access to non-protected pages
}

export const config = {
  matcher: ['/admin'], // Define protected routes here
};
