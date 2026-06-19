import { SuscripcionesTable } from '@/features/suscripciones/components';
import { MOCK_SUSCRIPCIONES } from '@/infrastructure/mock/data';

export default function SuscripcionesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Suscripciones</h1>
        <p className="mt-2 text-muted-foreground">
          Planes SaaS contratados por las agencias.
        </p>
      </div>
      <SuscripcionesTable data={MOCK_SUSCRIPCIONES} />
    </div>
  );
}
