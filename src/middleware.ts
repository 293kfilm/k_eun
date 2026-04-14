import { NextRequest, NextResponse } from 'next/server';

/**
 * Basic Auth middleware.
 * Only activates when APP_USERNAME and APP_PASSWORD env vars are set.
 * In local development without these vars, auth is skipped.
 */
export function middleware(request: NextRequest) {
  const username = process.env.APP_USERNAME;
  const password = process.env.APP_PASSWORD;

  // If auth is not configured, skip
  if (!username || !password) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic' && encoded) {
      try {
        const decoded = atob(encoded);
        const [user, pass] = decoded.split(':');
        if (user === username && pass === password) {
          return NextResponse.next();
        }
      } catch {
        // fall through to 401
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="AI Video Prompt Studio"',
    },
  });
}

export const config = {
  // Protect everything except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
