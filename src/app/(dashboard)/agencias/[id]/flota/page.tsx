'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { FlotaTableLevel } from '@/features/drilldown/components/flota-table-level';
import { getAgenciaById } from '@/infrastructure/mock/data';
import { ArrowLeft } from 'lucide-react';

export default function FlotaAgenciaPage() {
  const params = useParams<{ id: string }>();
  const agencia = getAgenciaById(params.id);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="outline" size="icon-sm" asChild>
            <Link href="/agencias">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Flota — {agencia?.razonSocial ?? 'Cargando...'}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              Unidades registradas de {agencia?.razonSocial ?? 'la agencia'}.
            </p>
          </div>
        </div>
      </div>
      <FlotaTableLevel agencyId={params.id} agencyLabel={agencia?.razonSocial ?? ''} />
    </div>
  );
}
