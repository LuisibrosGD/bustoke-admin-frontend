import { FlotaTable } from '@/features/flota/components';

export default function FlotaPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Flota de Buses</h1>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          Unidades de transporte registradas por cada agencia.
        </p>
      </div>
      <FlotaTable />
    </div>
  );
}
