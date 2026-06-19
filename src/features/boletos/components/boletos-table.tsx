'use client';

import { useMemo, useState } from 'react';
import { Input, Spinner } from '@/components/ui';
import { SearchIcon, Ticket } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table/data-table';
import { useRepository } from '@/infrastructure/hooks';
import { MockRepository } from '@/infrastructure/repositories';
import { MOCK_BOLETOS } from '@/infrastructure/mock/data';
import type { Boleto } from '@/infrastructure/domain/types';
import { boletosColumns } from './boletos-columns';
import { DataTableEmpty } from '@/components/ui/data-table/data-table-empty';

class BoletoRepository extends MockRepository<Boleto> {
  constructor() {
    super(MOCK_BOLETOS);
  }
}

const boletoRepository = new BoletoRepository();

export function BoletosTable() {
  const { data, isLoading, error } = useRepository(boletoRepository);
  const [s, setS] = useState('');

  const f = useMemo(() => {
    if (!s) return data;
    const l = s.toLowerCase();
    return data.filter((b) => b.codigoQr.toLowerCase().includes(l));
  }, [data, s]);

  if (error) {
    return <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Error: {error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner className="size-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar boleto..." className="pl-9" value={s} onChange={(e) => setS(e.target.value)} />
      </div>
      <DataTable
        columns={boletosColumns}
        data={f}
        emptyElement={
          <DataTableEmpty
            icon={<Ticket className="size-8 text-muted-foreground" />}
            title="Sin boletos"
            description={s ? 'No se encontraron boletos con ese criterio de búsqueda.' : 'Aún no hay boletos emitidos.'}
          />
        }
      />
    </div>
  );
}
