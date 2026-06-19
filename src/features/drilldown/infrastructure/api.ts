import type { Agencia, Bus, Ruta, Viaje } from '@/infrastructure/domain/types';

const API_PREFIX = '/api';

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  const res = await fetch(`${API_PREFIX}${path}${query}`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export const api = {
  agencias: {
    list: (params?: Record<string, string>) => get<Agencia[]>('/admin/agencias', params),
    byId: (id: string) => get<Agencia>(`/admin/agencias/${id}`),
  },
  flota: {
    list: (params?: Record<string, string>) => get<Bus[]>('/admin/flota', params),
  },
  rutas: {
    list: (params?: Record<string, string>) => get<Ruta[]>('/admin/rutas', params),
  },
  viajes: {
    list: (params?: Record<string, string>) => get<Viaje[]>('/admin/viajes', params),
  },
};
