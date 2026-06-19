'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui';
import { SearchIcon } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table/data-table';
import { suscripcionesColumns } from './suscripciones-columns';
import type { Suscripcion } from '@/infrastructure/domain/types';

interface Props { data: Suscripcion[] }

export function SuscripcionesTable({ data }: Props) {
  const [s, setS] = useState('');
  const f = useMemo(() => {
    if (!s) return data;
    const l = s.toLowerCase();
    return data.filter((x) => x.idPlan.includes(l) || x.estadoCobro.includes(l) || x.idAgencia.includes(l));
  }, [data, s]);
  return (<div className="space-y-4"><div className="relative max-w-sm"><SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Buscar suscripción..." className="pl-9" value={s} onChange={(e) => setS(e.target.value)} /></div><DataTable columns={suscripcionesColumns} data={f} /></div>);
}
