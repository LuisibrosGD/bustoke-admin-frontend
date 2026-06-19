'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui';
import type { Suscripcion } from '@/infrastructure/domain/types';
import { getAgenciaById, getPlanById } from '@/infrastructure/mock/data';

const estColor: Record<string, string> = { completado: 'bg-emerald-100 text-emerald-800', pendiente: 'bg-amber-100 text-amber-800', fallido: 'bg-red-100 text-red-800', reembolsado: 'bg-gray-100 text-gray-700' };

const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

export const suscripcionesColumns: ColumnDef<Suscripcion>[] = [
  {
    id: 'agencia',
    header: 'Agencia',
    cell: ({ row }) => {
      const a = getAgenciaById(row.original.idAgencia);
      return <span>{a?.razonSocial ?? row.original.idAgencia}</span>;
    },
  },
  {
    id: 'plan',
    header: 'Plan',
    cell: ({ row }) => {
      const plan = getPlanById(row.original.idPlan);
      return <span>{plan?.nombre ?? row.original.idPlan}</span>;
    },
  },
  { accessorKey: 'montoMensual', header: 'Monto', cell: ({ row }) => <span>{formatter.format(row.getValue<number>('montoMensual'))}</span> },
  { accessorKey: 'fechaFacturacion', header: 'Facturación' },
  { accessorKey: 'estadoCobro', header: 'Estado', cell: ({ row }) => <Badge className={estColor[row.getValue('estadoCobro') as string]}>{row.getValue('estadoCobro')}</Badge> },
];
