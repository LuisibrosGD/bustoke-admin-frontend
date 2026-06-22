'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SoporteTable } from '@/features/soporte/components';
import { soporteRepository } from '@/infrastructure/repositories';
import type { TicketSoporte } from '@/infrastructure/domain/types';

export default function SoportePage() {
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

  const [data, setData] = useState<TicketSoporte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setIsLoading(true);
    const params = role === 'admin_agencia' && idAgencia ? { id_agencia: idAgencia } : undefined;
    soporteRepository.list(params)
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { load(); }, [role, idAgencia]);

  if (isLoading) return <div className="p-6 text-muted-foreground">Cargando tickets...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Soporte</h1>
        <p className="mt-2 text-muted-foreground">
          Tickets de soporte técnico.
        </p>
      </div>
      <SoporteTable data={data} onRefresh={load} />
    </div>
  );
}
