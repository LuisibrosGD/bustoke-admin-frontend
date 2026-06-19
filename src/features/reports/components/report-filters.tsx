'use client';

import { GlobalCombobox } from '@/components/shared';
import { Button, Input } from '@/components/ui';
import { PATHS } from '@/lib/constants/paths';
import { SearchIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ReportQuery } from '../domain';
import {
  REPORT_FILTER_KEYS_BY_SLUG,
  REPORT_FILTERS,
  ReportFilterKey,
} from './report-filter-config';

interface ReportFiltersProps {
  query: ReportQuery;
  slug: string;
}

export function ReportFilters({ query, slug }: ReportFiltersProps) {
  const filterKeys = REPORT_FILTER_KEYS_BY_SLUG[slug] ?? [];
  const [comboboxValues, setComboboxValues] = useState<
    Partial<Record<ReportFilterKey, string>>
  >(() =>
    filterKeys.reduce<Partial<Record<ReportFilterKey, string>>>((acc, key) => {
      const filter = REPORT_FILTERS[key];

      if (filter.options) {
        acc[key] = query[key] ?? '';
      }

      return acc;
    }, {})
  );

  return (
    <form
      action={PATHS.reportDetailPage(slug)}
      method="get"
      className="rounded-lg border bg-card p-4 shadow-sm"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        <label className="space-y-1.5 text-sm font-medium">
          <span className="block">Desde</span>
          <Input type="date" name="from" defaultValue={query.from} />
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          <span className="block">Hasta</span>
          <Input type="date" name="to" defaultValue={query.to} />
        </label>
        {filterKeys.map((key) => {
          const filter = REPORT_FILTERS[key];
          return (
            <div key={key} className="space-y-1.5 text-sm font-medium">
              <label htmlFor={`report-filter-${key}`} className="block">
                {filter.label}
              </label>
              {filter.options ? (
                <>
                  <GlobalCombobox
                    id={`report-filter-${key}`}
                    items={filter.options}
                    value={comboboxValues[key] ?? ''}
                    onChange={(value) =>
                      setComboboxValues((current) => ({
                        ...current,
                        [key]: value,
                      }))
                    }
                    placeholder={filter.placeholder}
                  />
                  <input
                    type="hidden"
                    name={filter.key}
                    value={comboboxValues[key] ?? ''}
                  />
                </>
              ) : (
                <Input
                  id={`report-filter-${key}`}
                  name={filter.key}
                  defaultValue={query[filter.key]}
                  placeholder={filter.placeholder}
                />
              )}
            </div>
          );
        })}
        <label className="space-y-1.5 text-sm font-medium">
          <span className="block">Filas por página</span>
          <select
            name="limit"
            defaultValue={query.limit ?? '30'}
            className="border-input bg-background h-11 w-full rounded-md border px-[14px] py-[10px] text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>
      <input type="hidden" name="page" value="1" />
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="submit">
          <SearchIcon className="size-4" />
          Aplicar filtros
        </Button>
        <Button asChild type="button" variant="outline">
          <Link href={PATHS.reportDetailPage(slug)}>
            <XIcon className="size-4" />
            Limpiar
          </Link>
        </Button>
      </div>
    </form>
  );
}
