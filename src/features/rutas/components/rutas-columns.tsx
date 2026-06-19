'use client';

import { ColumnDef } from '@tanstack/react-table';
import type { Ruta } from '@/infrastructure/domain/types';
import { getTerminalById } from '@/infrastructure/mock/data';

export const rutasColumns: ColumnDef<Ruta>[] = [
  {
    id: 'origen',
    header: 'Origen',
    cell: ({ row }) => {
      const terminal = getTerminalById(row.original.idTerminalOrigen);
      return <span>{terminal?.nombre ?? row.original.idTerminalOrigen}</span>;
    },
  },
  {
    id: 'destino',
    header: 'Destino',
    cell: ({ row }) => {
      const terminal = getTerminalById(row.original.idTerminalDestino);
      return <span>{terminal?.nombre ?? row.original.idTerminalDestino}</span>;
    },
  },
  { accessorKey: 'tarifaBase', header: 'Tarifa Base', cell: ({ row }) => `S/ ${Number(row.getValue('tarifaBase')).toFixed(2)}` },
];
