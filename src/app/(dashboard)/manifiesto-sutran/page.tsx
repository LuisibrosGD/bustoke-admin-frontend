'use client';

import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Badge, Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { MOCK_MANIFIESTOS_SUTRAN, getViajeById, getRutaById, getTerminalById, getBusById } from '@/infrastructure/mock/data';

const ESTADO_VARIANT: Record<string, 'info' | 'warning' | 'success' | 'danger'> = {
  enviado: 'success',
  pendiente: 'warning',
  error: 'danger',
};

interface ManifiestoDisplay {
  id: string;
  numero: string;
  fecha: string;
  origen: string;
  destino: string;
  bus: string;
  estado: string;
}

function buildManifiestos(): ManifiestoDisplay[] {
  return MOCK_MANIFIESTOS_SUTRAN.map((m) => {
    const viaje = getViajeById(m.idViaje);
    const ruta = viaje ? getRutaById(viaje.idRuta) : null;
    const tOrigen = ruta ? getTerminalById(ruta.idTerminalOrigen) : null;
    const tDestino = ruta ? getTerminalById(ruta.idTerminalDestino) : null;
    const bus = viaje ? getBusById(viaje.idBus) : null;

    const origen = tOrigen?.nombre?.split(' - ')[0] ?? ruta?.idTerminalOrigen ?? '?';
    const destino = tDestino?.nombre?.split(' - ')[0] ?? ruta?.idTerminalDestino ?? '?';

    return {
      id: m.id,
      numero: `MAN-${m.idViaje.padStart(3, '0')}-${m.fechaGeneracion.slice(0, 4)}`,
      fecha: new Date(m.fechaGeneracion).toLocaleDateString('es-PE'),
      origen,
      destino,
      bus: bus?.placa ?? '?',
      estado: m.estadoEnvio,
    };
  });
}

export default function ManifiestoSutranPage() {
  const [search, setSearch] = useState('');
  const manifiestos = buildManifiestos();

  const filtered = manifiestos.filter((m) =>
    Object.values(m).some((v) =>
      String(v).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Manifiesto SUTRAN</h1>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          Gestión de manifiestos de pasajeros para la Superintendencia de Transporte.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="relative max-w-sm mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Buscar manifiesto..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Manifiesto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Bus</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium text-neutral-900">{m.numero}</TableCell>
                <TableCell>{m.fecha}</TableCell>
                <TableCell>{m.origen}</TableCell>
                <TableCell>{m.destino}</TableCell>
                <TableCell>{m.bus}</TableCell>
                <TableCell>
                  <Badge variant={ESTADO_VARIANT[m.estado] || 'neutral'}>{m.estado}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm">
                    <Eye className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No se encontraron manifiestos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
