import { ViajesTable } from '@/features/viajes/components';

export default function ViajesPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Viajes</h1>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          Programación de viajes interprovinciales.
        </p>
      </div>
      <ViajesTable />
    </div>
  );
}
