'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui';
import type { TicketSoporte } from '@/infrastructure/domain/types';
import { getAgenciaById } from '@/infrastructure/mock/data';

const estColor: Record<string, string> = { abierto: 'bg-red-100 text-red-800', en_revision: 'bg-amber-100 text-amber-800', resuelto: 'bg-emerald-100 text-emerald-800' };

export const soporteColumns: ColumnDef<TicketSoporte>[] = [
  { accessorKey: 'asunto', header: 'Asunto', cell: ({ row }) => <span className="font-medium">{row.getValue('asunto')}</span> },
  {
    id: 'agencia',
    header: 'Agencia',
    cell: ({ row }) => {
      const a = getAgenciaById(row.original.idAgencia);
      return <span>{a?.razonSocial ?? row.original.idAgencia}</span>;
    },
  },
  { accessorKey: 'estado', header: 'Estado', cell: ({ row }) => <Badge className={estColor[row.getValue('estado') as string]}>{row.getValue('estado')}</Badge> },
  { accessorKey: 'fechaCreacion', header: 'Fecha', cell: ({ row }) => <span>{new Date(row.getValue('fechaCreacion')).toLocaleDateString('es-PE')}</span> },
];
