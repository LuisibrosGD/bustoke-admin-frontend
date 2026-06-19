import { serverHttpClient } from '@/lib/http/server-http-client';
import { reportEndpoints } from './reports.endpoints';
import type { ReportPayload, ReportQuery } from '../domain/reports.types';

export async function getReportAction(slug: string, query: ReportQuery): Promise<ReportPayload> {
  const response = await serverHttpClient.get<ReportPayload>(reportEndpoints.list(slug), {
    params: query,
  });
  return response.data;
}
