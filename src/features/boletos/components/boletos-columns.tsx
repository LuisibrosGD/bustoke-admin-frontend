'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui';
import type { Boleto } from '@/infrastructure/domain/types';
import { getPasajeroById, getViajeById } from '@/infrastructure/mock/data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const estadoColors: Record<string, string> = {
  activo: 'bg-emerald-100 text-emerald-800 border-transparent',
  cancelado: 'bg-red-100 text-red-800 border-transparent',
};

const estadoLabels: Record<string, string> = {
  activo: 'Activo',
  cancelado: 'Cancelado',
};

export const boletosColumns: ColumnDef<Boleto>[] = [
  {
    id: 'codigo',
    header: 'Código QR',
    cell: ({ row }) => <span className="font-mono font-medium text-xs">{row.original.codigoQr}</span>,
  },
  {
    accessorKey: 'idPasajero',
    header: 'Pasajero',
    cell: ({ row }) => {
      const p = getPasajeroById(row.original.idPasajero);
      return p ? `${p.nombres} ${p.apellidoPaterno} ${p.apellidoMaterno}` : row.original.idPasajero;
    },
  },
  {
    id: 'viaje',
    header: 'Viaje',
    cell: ({ row }) => {
      const v = getViajeById(row.original.idViaje);
      if (!v) return row.original.idViaje;
      return (
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            {format(new Date(v.fechaHoraSalida), 'dd/MM/yyyy HH:mm', { locale: es })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'precioFinal',
    header: 'Monto',
    cell: ({ row }) => `S/ ${Number(row.getValue('precioFinal')).toFixed(2)}`,
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      const estado = row.getValue('estado') as string;
      return (
        <Badge variant="outline" className={estadoColors[estado] ?? ''}>
          {estadoLabels[estado] ?? estado}
        </Badge>
      );
    },
  },
];
