import {
  PageSearchParams,
  ReportDetailHeader,
  ReportFilters,
  ReportResultsSection,
  buildExportHref,
  parseReportQuery,
} from '@/features/reports/components';
import {
  REPORTS,
  getReportBySlug,
  getReportTitle,
} from '@/features/reports/domain';
import { getReportAction } from '@/features/reports/infrastructure/reports.actions';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PageSearchParams>;
}

export function generateStaticParams() {
  return REPORTS.map((report) => ({ slug: report.slug }));
}

export default async function ReportDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const report = getReportBySlug(slug);

  if (!report) {
    notFound();
  }

  const query = parseReportQuery(resolvedSearchParams);
  const data = await getReportAction(slug, query);
  const title = getReportTitle(report);

  return (
    <div className="space-y-6">
      <ReportDetailHeader
        exportHref={buildExportHref(slug, query)}
        report={report}
        title={title}
      />
      <ReportFilters query={query} slug={slug} />
      <ReportResultsSection data={data} query={query} slug={slug} />
    </div>
  );
}
