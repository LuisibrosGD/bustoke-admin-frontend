'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import { getAgenciaById, getTerminalesByAgenciaId, getDistritoById } from '@/infrastructure/mock/data';
import { DataTable, DataTableEmpty } from '@/components/ui';
import type { Terminal } from '@/infrastructure/domain/types';
import type { ColumnDef } from '@tanstack/react-table';

export default function TerminalesAgenciaPage() {
  const params = useParams<{ id: string }>();
  const agencia = getAgenciaById(params.id);
  const terminales = useMemo(() => getTerminalesByAgenciaId(params.id), [params.id]);

  const columns = useMemo<ColumnDef<Terminal>[]>(
    () => [
      {
        accessorKey: 'nombre',
        header: 'Terminal',
        cell: ({ row }) => (
          <span className="font-medium flex items-center gap-2">
            <MapPin className="size-4 text-muted-foreground shrink-0" />
            {row.getValue('nombre')}
          </span>
        ),
      },
      { accessorKey: 'direccion', header: 'Dirección' },
      {
        id: 'distrito',
        header: 'Distrito',
        cell: ({ row }) => {
          const d = getDistritoById(row.original.idDistrito);
          return <span>{d?.nombre ?? row.original.idDistrito}</span>;
        },
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="outline" size="icon-sm" asChild>
            <Link href="/agencias">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Terminales — {agencia?.razonSocial ?? 'Cargando...'}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              Terminales asociados a {agencia?.razonSocial ?? 'la agencia'}.
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <DataTable
          columns={columns}
          data={terminales}
          emptyElement={
            <DataTableEmpty
              title="Sin terminales"
              description={`${agencia?.razonSocial ?? 'La agencia'} no tiene terminales asociados.`}
            />
          }
        />
      </div>
    </div>
  );
}
