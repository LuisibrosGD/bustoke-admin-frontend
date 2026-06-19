'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui';
import type { Reclamo } from '@/infrastructure/domain/types';
import { getAgenciaById } from '@/infrastructure/mock/data';

const estColor: Record<string, string> = {
  abierto: 'bg-red-100 text-red-800 border-transparent',
  en_proceso: 'bg-amber-100 text-amber-800 border-transparent',
  resuelto: 'bg-emerald-100 text-emerald-800 border-transparent',
};

export const reclamosColumns: ColumnDef<Reclamo>[] = [
  { accessorKey: 'motivo', header: 'Motivo', cell: ({ row }) => <span className="font-medium">{row.getValue('motivo')}</span> },
  { accessorKey: 'detalle', header: 'Detalle', cell: ({ row }) => <span className="truncate max-w-xs block">{row.getValue('detalle')}</span> },
  {
    id: 'agencia',
    header: 'Agencia',
    cell: ({ row }) => {
      const a = getAgenciaById(row.original.idAgencia);
      return <span>{a?.razonSocial ?? row.original.idAgencia}</span>;
    },
  },
  { accessorKey: 'estado', header: 'Estado', cell: ({ row }) => <Badge variant="outline" className={estColor[row.getValue('estado') as string]}>{row.getValue('estado')}</Badge> },
  { accessorKey: 'fechaCreacion', header: 'Fecha', cell: ({ row }) => <span>{new Date(row.getValue('fechaCreacion')).toLocaleDateString('es-PE')}</span> },
];
