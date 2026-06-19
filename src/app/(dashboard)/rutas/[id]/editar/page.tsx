'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { Separator } from '@/components/ui/separator/separator';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { getRutaById, getTerminalById, getAgenciaById } from '@/infrastructure/mock/data';

export default function EditarRutaPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const ruta = getRutaById(params.id);

  const [submitting, setSubmitting] = useState(false);

  if (!ruta) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Ruta no encontrada
      </div>
    );
  }

  const agencia = getAgenciaById(ruta.idAgencia);
  const terminalOrigen = getTerminalById(ruta.idTerminalOrigen);
  const terminalDestino = getTerminalById(ruta.idTerminalDestino);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Ruta actualizada correctamente');
      router.push(`/rutas/${params.id}`);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon-sm" asChild>
          <Link href={`/rutas/${params.id}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Editar Ruta</h1>
          <p className="text-sm text-muted-foreground">Modifica los datos de la ruta</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">Trayecto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Terminal Origen</Label>
              <p className="text-sm text-neutral-700">{terminalOrigen?.nombre ?? ruta.idTerminalOrigen}</p>
            </div>
            <div className="space-y-2">
              <Label>Terminal Destino</Label>
              <p className="text-sm text-neutral-700">{terminalDestino?.nombre ?? ruta.idTerminalDestino}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">Detalles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tarifaBase">Tarifa Base (S/)</Label>
              <Input id="tarifaBase" type="number" step="0.01" defaultValue={String(ruta.tarifaBase)} />
            </div>
            <div className="space-y-2">
              <Label>Agencia</Label>
              <p className="text-sm text-neutral-700">{agencia?.razonSocial ?? '—'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href={`/rutas/${params.id}`}>Cancelar</Link>
        </Button>
        <Button type="submit" disabled={submitting}>
          <Save className="size-4" />
          {submitting ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
}
