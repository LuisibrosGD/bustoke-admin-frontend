'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui';
import type { Viaje } from '@/infrastructure/domain/types';
import { getRutaById, getBusById, getTerminalById } from '@/infrastructure/mock/data';

const estColor: Record<string, string> = {
  programado: 'bg-blue-100 text-blue-800 border-transparent',
  en_curso: 'bg-emerald-100 text-emerald-800 border-transparent',
  finalizado: 'bg-gray-100 text-gray-700 border-transparent',
  cancelado: 'bg-red-100 text-red-800 border-transparent',
};

const estLabel: Record<string, string> = {
  programado: 'Programado',
  en_curso: 'En curso',
  finalizado: 'Finalizado',
  cancelado: 'Cancelado',
};

export const viajesColumns: ColumnDef<Viaje>[] = [
  {
    accessorKey: 'fechaHoraSalida',
    header: 'Salida',
    cell: ({ row }) => new Date(row.getValue('fechaHoraSalida')).toLocaleString('es-PE'),
  },
  {
    id: 'ruta',
    header: 'Ruta',
    cell: ({ row }) => {
      const ruta = getRutaById(row.original.idRuta);
      if (!ruta) return row.original.idRuta;
      const origen = getTerminalById(ruta.idTerminalOrigen);
      const destino = getTerminalById(ruta.idTerminalDestino);
      return <span>{origen?.nombre ?? '?'} → {destino?.nombre ?? '?'}</span>;
    },
  },
  {
    id: 'bus',
    header: 'Bus',
    cell: ({ row }) => {
      const bus = getBusById(row.original.idBus);
      return <span>{bus?.placa ?? row.original.idBus}</span>;
    },
  },
  { accessorKey: 'rampaEmbarque', header: 'Rampa' },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      const v = row.getValue<string>('estado');
      return <Badge variant="outline" className={estColor[v]}>{estLabel[v] || v}</Badge>;
    },
  },
];
