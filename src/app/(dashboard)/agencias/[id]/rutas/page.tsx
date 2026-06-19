'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { RutaTableLevel } from '@/features/drilldown/components/ruta-table-level';
import { getAgenciaById } from '@/infrastructure/mock/data';
import { ArrowLeft } from 'lucide-react';

export default function RutasAgenciaPage() {
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
              Rutas — {agencia?.razonSocial ?? 'Cargando...'}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              Conexiones operadas por {agencia?.razonSocial ?? 'la agencia'}.
            </p>
          </div>
        </div>
      </div>
      <RutaTableLevel agencyId={params.id} agencyLabel={agencia?.razonSocial ?? ''} />
    </div>
  );
}
