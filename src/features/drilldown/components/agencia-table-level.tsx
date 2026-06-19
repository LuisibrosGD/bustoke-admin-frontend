'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useAgencias } from '../application/use-entity-data';
import {
  DataTable,
  DataTableEmpty,
  Input,
  Badge,
  Button,
  Skeleton,
} from '@/components/ui';
import { SearchIcon, XIcon, ArrowRight, Pencil, Eye } from 'lucide-react';
import type { Agencia } from '@/infrastructure/domain/types';
import type { ColumnDef } from '@tanstack/react-table';

const estadoVariant: Record<string, 'success' | 'danger' | 'warning' | 'neutral'> = {
  activa: 'success',
  suspendida: 'warning',
};

export function AgenciaTableLevel() {
  const [search, setSearch] = useState('');
  const { data, isLoading, error } = useAgencias();

  const filtered = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter(
      (a) =>
        a.razonSocial.toLowerCase().includes(lower) ||
        a.ruc.includes(lower)
    );
  }, [search, data]);

  const columns = useMemo<ColumnDef<Agencia>[]>(
    () => [
      {
        id: 'expand',
        header: '',
        cell: ({ row }) => (
          <Link href={`/agencias/${row.original.id}/flota`}>
            <Button variant="ghost" size="icon" className="size-8" title="Ver flota">
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        ),
      },
      {
        accessorKey: 'razonSocial',
        header: 'Razón Social',
        cell: ({ row }) => (
          <span className="font-medium">{row.getValue('razonSocial')}</span>
        ),
      },
      { accessorKey: 'ruc', header: 'RUC' },
      {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ row }) => (
          <Badge
            variant={estadoVariant[row.getValue('estado') as string] ?? 'neutral'}
          >
            {row.getValue('estado')}
          </Badge>
        ),
      },
      {
        id: 'acciones',
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Link href={`/agencias/${row.original.id}`}>
              <Button variant="ghost" size="icon" className="size-8" title="Ver detalle">
                <Eye className="size-4" />
              </Button>
            </Link>
            <Link href={`/agencias/${row.original.id}/editar`}>
              <Button variant="ghost" size="icon" className="size-8" title="Editar">
                <Pencil className="size-4" />
              </Button>
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50/50 shadow-sm p-6">
        <DataTableEmpty
          title="Error al cargar"
          description={error}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-wrap gap-3 p-4 border-b border-neutral-100">
          <div className="relative flex-1 max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Buscar por RUC o razón social..."
              className="pl-9 border-neutral-200 bg-neutral-50/50 focus:bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {search && (
            <Button variant="ghost" size="sm" onClick={() => setSearch('')}>
              <XIcon className="size-4 mr-1" /> Limpiar
            </Button>
          )}
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          emptyElement={
            <DataTableEmpty
              title="Sin resultados"
              description="No se encontraron agencias."
            />
          }
        />
      </div>

    </div>
  );
}
