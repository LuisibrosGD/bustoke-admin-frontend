'use client';

import { useMemo, useState } from 'react';
import { Input, Spinner } from '@/components/ui';
import { SearchIcon, User } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table/data-table';
import { useRepository } from '@/infrastructure/hooks';
import { MockRepository } from '@/infrastructure/repositories';
import { MOCK_PASAJEROS } from '@/infrastructure/mock/data';
import type { Pasajero } from '@/infrastructure/domain/types';
import { pasajerosColumns } from './pasajeros-columns';
import { DataTableEmpty } from '@/components/ui/data-table/data-table-empty';

class PasajeroRepository extends MockRepository<Pasajero> {
  constructor() {
    super(MOCK_PASAJEROS);
  }
}

const pasajeroRepository = new PasajeroRepository();

export function PasajerosTable() {
  const { data, isLoading, error } = useRepository(pasajeroRepository);
  const [s, setS] = useState('');

  const f = useMemo(() => {
    if (!s) return data;
    const l = s.toLowerCase();
    return data.filter(
      (p) =>
        p.nombres.toLowerCase().includes(l) ||
        p.apellidoPaterno.toLowerCase().includes(l) ||
        p.numeroDocumento.toLowerCase().includes(l)
    );
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
        <Input placeholder="Buscar pasajero..." className="pl-9" value={s} onChange={(e) => setS(e.target.value)} />
      </div>
      <DataTable
        columns={pasajerosColumns}
        data={f}
        emptyElement={
          <DataTableEmpty
            icon={<User className="size-8 text-muted-foreground" />}
            title="Sin pasajeros"
            description={s ? 'No se encontraron pasajeros con ese criterio de búsqueda.' : 'Aún no hay pasajeros registrados.'}
          />
        }
      />
    </div>
  );
}
