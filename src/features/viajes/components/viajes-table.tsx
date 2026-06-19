'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useViajes } from '@/features/drilldown/application/use-entity-data';
import { Input, Button, DataTable, DataTableEmpty, Skeleton } from '@/components/ui';
import { SearchIcon, XIcon, Eye } from 'lucide-react';
import { viajesColumns } from './viajes-columns';
import type { Viaje } from '@/infrastructure/domain/types';

export function ViajesTable() {
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useViajes();

  const filtered = useMemo(() => {
    if (!search) return data;
    const l = search.toLowerCase();
    return data.filter((v) => v.fechaHoraSalida.includes(l) || v.idRuta.toLowerCase().includes(l) || v.estado.includes(l));
  }, [search, data]);

  const columnsWithActions = useMemo(() => [
    ...viajesColumns,
    {
      id: 'acciones' as const,
      header: 'Acciones',
      cell: ({ row }: { row: { original: Viaje } }) => (
        <div className="flex items-center gap-1">
          <Link href={`/viajes/${row.original.id}`}>
            <Button variant="ghost" size="icon" className="size-8" title="Ver detalle">
              <Eye className="size-4" />
            </Button>
          </Link>
        </div>
      ),
    },
  ], []);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm p-6">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50/50 shadow-sm p-6">
        <DataTableEmpty title="Error al cargar" description={error} />
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-wrap gap-3 p-4 border-b border-neutral-100">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <Input placeholder="Buscar viaje..." className="pl-9 border-neutral-200 bg-neutral-50/50 focus:bg-white" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {search && <Button variant="ghost" size="sm" onClick={() => setSearch('')}><XIcon className="size-4 mr-1" /> Limpiar</Button>}
        </div>
        <DataTable columns={columnsWithActions} data={filtered} />
      </div>

    </>
  );
}
