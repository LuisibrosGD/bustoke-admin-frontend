import { NextRequest, NextResponse } from 'next/server';
import { serverHttpClient } from '@/lib/http/server-http-client';
import { reportEndpoints } from '@/features/reports/infrastructure/reports.endpoints';
import { isAxiosError } from 'axios';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

function getHeaderValue(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const searchParams = request.nextUrl.searchParams;
  const exportParams = new URLSearchParams(searchParams);

  exportParams.delete('page');
  exportParams.delete('limit');

  try {
    const response = await serverHttpClient.get<ArrayBuffer>(
      reportEndpoints.export(slug),
      {
        params: Object.fromEntries(exportParams.entries()),
        responseType: 'arraybuffer',
      }
    );
    const contentDisposition = getHeaderValue(
      response.headers['content-disposition']
    );
    const contentType =
      getHeaderValue(response.headers['content-type']) ??
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const body = Buffer.isBuffer(response.data)
      ? response.data
      : Buffer.from(response.data);

    return new NextResponse(body, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition':
          contentDisposition ?? `attachment; filename="${slug}.xlsx"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message ??
            error.response?.data?.error ??
            'No se pudo generar el Excel.',
        },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: 'No se pudo generar el Excel.' },
      { status: 500 }
    );
  }
}
