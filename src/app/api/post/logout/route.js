import { serialize } from 'cookie';

export async function POST() {
  try {
    // Set cookie to expire immediately to log out the user
    const headers = new Headers({
      'Set-Cookie': serialize('authToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: -1, // Expire the cookie immediately
        path: '/',
      }),
      'Content-Type': 'application/json',
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
