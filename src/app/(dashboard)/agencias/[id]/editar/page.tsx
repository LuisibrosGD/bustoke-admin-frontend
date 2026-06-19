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
import { getAgenciaById } from '@/infrastructure/mock/data';
import type { EstadoAgencia } from '@/infrastructure/domain/types';

const estados: { value: EstadoAgencia; label: string }[] = [
  { value: 'activa', label: 'Activa' },
  { value: 'suspendida', label: 'Suspendida' },
];

export default function EditarAgenciaPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const agencia = getAgenciaById(params.id);

  const [estado, setEstado] = useState<EstadoAgencia>(agencia?.estado ?? 'activa');
  const [submitting, setSubmitting] = useState(false);

  if (!agencia) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Agencia no encontrada
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success('Agencia actualizada correctamente');
      router.push(`/agencias/${params.id}`);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon-sm" asChild>
          <Link href={`/agencias/${params.id}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Editar Agencia</h1>
          <p className="text-sm text-muted-foreground">Modifica los datos de la agencia</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-8">
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">Información General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="razonSocial">Razón Social</Label>
              <Input id="razonSocial" defaultValue={agencia.razonSocial} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ruc">RUC</Label>
              <Input id="ruc" defaultValue={agencia.ruc} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">Datos Bancarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="banco">Banco</Label>
              <Input id="banco" defaultValue={agencia.bancoNombre ?? ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numeroCuenta">N° Cuenta</Label>
              <Input id="numeroCuenta" defaultValue={agencia.numeroCuenta ?? ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuentaCci">CCI</Label>
              <Input id="cuentaCci" defaultValue={agencia.cuentaCci ?? ''} />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-base font-semibold text-neutral-900">Estado</h2>
          <div className="flex flex-wrap gap-2">
            {estados.map((e) => (
              <button
                key={e.value}
                type="button"
                onClick={() => setEstado(e.value)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                  estado === e.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href={`/agencias/${params.id}`}>Cancelar</Link>
        </Button>
        <Button type="submit" disabled={submitting}>
          <Save className="size-4" />
          {submitting ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  );
}
