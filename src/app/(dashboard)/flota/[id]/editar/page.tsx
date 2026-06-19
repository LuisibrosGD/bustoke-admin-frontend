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
import { getBusById, getAgenciaById } from '@/infrastructure/mock/data';

export default function EditarBusPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const bus = getBusById(params.id);

  const [submitting, setSubmitting] = useState(false);

  if (!bus) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Bus no encontrado
      </div>
    );
  }

  const agencia = getAgenciaById(bus.idAgencia);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Bus actualizado correctamente');
      router.push(`/flota/${params.id}`);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon-sm" asChild>
          <Link href={`/flota/${params.id}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Editar Bus</h1>
          <p className="text-sm text-muted-foreground">Modifica los datos de la unidad</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">Identificación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="placa">Placa</Label>
              <Input id="placa" defaultValue={bus.placa} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cantidadPisos">Cantidad de Pisos</Label>
              <Input id="cantidadPisos" type="number" defaultValue={String(bus.cantidadPisos)} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">Agencia</h2>
          <div className="space-y-2">
            <Label>Agencia asignada</Label>
            <p className="text-sm text-neutral-700">{agencia?.razonSocial ?? '—'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href={`/flota/${params.id}`}>Cancelar</Link>
        </Button>
        <Button type="submit" disabled={submitting}>
          <Save className="size-4" />
          {submitting ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
}
