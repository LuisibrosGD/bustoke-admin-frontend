'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ReclamosTable } from '@/features/reclamos/components';
import { reclamoRepository } from '@/infrastructure/repositories';
import type { Reclamo } from '@/infrastructure/domain/types';

export default function ReclamosPage() {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  let role: string | undefined;
  let idAgencia: string | undefined;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      role = payload.rol;
      idAgencia = String(payload.id_agencia);
    } catch {}
  }

  const [data, setData] = useState<Reclamo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const params = role === 'admin_agencia' && idAgencia ? { id_agencia: idAgencia } : undefined;
    reclamoRepository.list(params)
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'))
      .finally(() => setIsLoading(false));
  }, [role, idAgencia]);

  if (isLoading) return <div className="p-6 text-muted-foreground">Cargando reclamos...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Reclamos y Quejas</h1>
        <p className="mt-2 text-muted-foreground">
          Libro de reclamaciones digital.
        </p>
      </div>
      <ReclamosTable data={data} />
    </div>
  );
}
