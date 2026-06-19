import { ReclamosTable } from '@/features/reclamos/components';
import { MOCK_RECLAMOS } from '@/infrastructure/mock/data';

export default function ReclamosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Reclamos y Quejas</h1>
        <p className="mt-2 text-muted-foreground">
          Libro de reclamaciones digital.
        </p>
      </div>
      <ReclamosTable data={MOCK_RECLAMOS} />
    </div>
  );
}
