'use client';

import { useMemo, useState } from 'react';
import { Input } from '@/components/ui';
import { SearchIcon } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table/data-table';
import { soporteColumns } from './soporte-columns';
import type { TicketSoporte } from '@/infrastructure/domain/types';

interface Props { data: TicketSoporte[] }

export function SoporteTable({ data }: Props) {
  const [s, setS] = useState('');
  const f = useMemo(() => {
    if (!s) return data;
    const l = s.toLowerCase();
    return data.filter((t) => t.asunto.toLowerCase().includes(l) || t.idAgencia.includes(l));
  }, [data, s]);
  return (<div className="space-y-4"><div className="relative max-w-sm"><SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Buscar ticket..." className="pl-9" value={s} onChange={(e) => setS(e.target.value)} /></div><DataTable columns={soporteColumns} data={f} /></div>);
}
