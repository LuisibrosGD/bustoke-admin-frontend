import { TerminalesTable } from '@/features/terminales/components';
import { MOCK_TERMINALES } from '@/infrastructure/mock/data';

export default function TerminalesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Terminales</h1>
        <p className="mt-2 text-muted-foreground">
          Terminales terrestres registrados.
        </p>
      </div>
      <TerminalesTable data={MOCK_TERMINALES} />
    </div>
  );
}
