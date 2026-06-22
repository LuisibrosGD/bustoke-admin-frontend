import type { Asiento } from '@/infrastructure/domain/types';

const API = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export class AsientoRepository {
  async listByBus(busId: string): Promise<Asiento[]> {
    return request<Asiento[]>(`/admin/flota/buses/${busId}/asientos`);
  }

  async update(id: string, data: { bloqueadoManual?: boolean }): Promise<Asiento> {
    return request<Asiento>(`/admin/flota/asientos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const asientoRepository = new AsientoRepository();
