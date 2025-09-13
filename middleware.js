import { NextResponse } from 'next/server';

export function middleware(request) {
  // Bloqueia acesso ao admin em produção
  if (process.env.NODE_ENV === 'production' && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};