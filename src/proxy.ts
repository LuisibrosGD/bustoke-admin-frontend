import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { PATHS } from '@/lib/constants/paths';

import { ENV_NEXTAUTH_SECRET } from '@/lib/constants/environments';

function hasActiveSession(token: Awaited<ReturnType<typeof getToken>> | null) {
  if (!token || typeof token === 'string') return false;
  if (token.error === 'RefreshAccessTokenError') return false;

  if (typeof token.accessToken !== 'string' || !token.accessToken) {
    return false;
  }

  return true;
}

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: ENV_NEXTAUTH_SECRET });
    const isAuth = hasActiveSession(token);
    const isAuthPage =
      req.nextUrl.pathname.startsWith(PATHS.signInPage) ||
      req.nextUrl.pathname.startsWith(PATHS.recoverEmailPage) ||
      req.nextUrl.pathname.startsWith(PATHS.emailReviewPage) ||
      req.nextUrl.pathname.startsWith(PATHS.resetPasswordPage);

    if (isAuthPage) {
      if (isAuth && !req.nextUrl.searchParams.has('error')) {
        return NextResponse.redirect(
          new URL(PATHS.dashboardPage, req.url)
        );
      }
      return null;
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(
          `${PATHS.signInPage}?callbackUrl=${encodeURIComponent(from)}`,
          req.url
        )
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/agencias/:path*',
    '/flota/:path*',
    '/rutas/:path*',
    '/viajes/:path*',
    '/reclamos/:path*',
    '/suscripciones/:path*',
    '/soporte/:path*',
    '/dashboard/:path*',
    '/iniciar-sesion',
    '/recuperar-correo',
  ],
};
