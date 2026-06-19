import { SoporteTable } from '@/features/soporte/components';
import { MOCK_TICKETS_SOPORTE } from '@/infrastructure/mock/data';

export default function SoportePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Soporte</h1>
        <p className="mt-2 text-muted-foreground">
          Tickets de soporte técnico.
        </p>
      </div>
      <SoporteTable data={MOCK_TICKETS_SOPORTE} />
    </div>
  );
}
