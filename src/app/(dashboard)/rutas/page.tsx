import { RutasTable } from '@/features/rutas/components';

export default function RutasPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Rutas</h1>
        <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
          Conexiones interprovinciales configuradas en el sistema.
        </p>
      </div>
      <RutasTable />
    </div>
  );
}
