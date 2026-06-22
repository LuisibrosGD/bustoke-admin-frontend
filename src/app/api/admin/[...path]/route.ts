import { getServerSession } from 'next-auth';
import { authOptions } from '@/features/auth/infraestructure/auth.options';
import { ENV_URL_API } from '@/lib/constants/environments';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params, 'GET');
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params, 'POST');
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params, 'PUT');
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params, 'PATCH');
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await params, 'DELETE');
}

async function proxy(req: NextRequest, params: { path: string[] }, method: string) {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;

  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const path = params.path.join('/');
  const search = req.nextUrl.search;
  const trailing = req.nextUrl.pathname.endsWith('/') ? '/' : '';
  const url = `${ENV_URL_API}/${path}${trailing}${search}`;

  const body = method === 'GET' || method === 'HEAD' ? undefined : await req.text();

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  });

  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
