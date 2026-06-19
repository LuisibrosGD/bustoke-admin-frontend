'use client';

import { Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { DollarSign, Clock, TrendingUp } from 'lucide-react';
import { MOCK_LIQUIDACIONES, getAgenciaById } from '@/infrastructure/mock/data';

const ESTADO_VARIANT: Record<string, 'warning' | 'success' | 'danger' | 'neutral'> = {
  pendiente: 'warning',
  completado: 'success',
  fallido: 'danger',
  reembolsado: 'neutral',
};

export default function ComisionesPage() {
  const totalPendiente = MOCK_LIQUIDACIONES
    .filter((l) => l.estadoPago === 'pendiente')
    .reduce((sum, l) => sum + l.comisionPlataforma, 0);
  const totalPagado = MOCK_LIQUIDACIONES
    .filter((l) => l.estadoPago === 'completado')
    .reduce((sum, l) => sum + l.comisionPlataforma, 0);
  const tasaPromedio = MOCK_LIQUIDACIONES.length > 0
    ? (MOCK_LIQUIDACIONES.reduce((sum, l) => sum + (l.comisionPlataforma / l.montoVentas * 100), 0) / MOCK_LIQUIDACIONES.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Comisiones</h1>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          Gestión de comisiones por agencia.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shrink-0">
              <Clock className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Comisiones pendientes</p>
              <p className="text-xl font-bold text-neutral-900 mt-0.5">S/ {totalPendiente.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
              <DollarSign className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Comisiones pagadas</p>
              <p className="text-xl font-bold text-neutral-900 mt-0.5">S/ {totalPagado.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
              <TrendingUp className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Tasa promedio</p>
              <p className="text-xl font-bold text-neutral-900 mt-0.5">{tasaPromedio}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agencia</TableHead>
              <TableHead>Periodo</TableHead>
              <TableHead>Monto ventas</TableHead>
              <TableHead>Comisión</TableHead>
              <TableHead>Monto a transferir</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_LIQUIDACIONES.map((l) => {
              const agencia = getAgenciaById(l.idAgencia);
              return (
                <TableRow key={l.id}>
                  <TableCell className="font-medium text-neutral-900">{agencia?.razonSocial ?? l.idAgencia}</TableCell>
                  <TableCell>{l.periodo}</TableCell>
                  <TableCell>S/ {l.montoVentas.toLocaleString()}</TableCell>
                  <TableCell>S/ {l.comisionPlataforma.toLocaleString()}</TableCell>
                  <TableCell>S/ {l.montoATransferir.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={ESTADO_VARIANT[l.estadoPago]}>{l.estadoPago}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
            {MOCK_LIQUIDACIONES.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hay liquidaciones registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
