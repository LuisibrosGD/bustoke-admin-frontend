'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '../infrastructure/api';
import type { Agencia, Bus, Ruta, Viaje } from '@/infrastructure/domain/types';

interface UseEntityResult<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

function useEntity<T>(
  fetcher: (params?: Record<string, string>) => Promise<T[]>,
  params?: Record<string, string>,
  extraDeps: unknown[] = []
): UseEntityResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const paramsRef = useRef(params);
  paramsRef.current = params;

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher(paramsRef.current);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, extraDeps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, isLoading, error, refetch: fetch };
}

export function useAgencias(params?: Record<string, string>) {
  return useEntity<Agencia>(api.agencias.list, params, []);
}

export function useFlota(params?: Record<string, string>) {
  return useEntity<Bus>(api.flota.list, params, []);
}

export function useRutas(params?: Record<string, string>) {
  return useEntity<Ruta>(api.rutas.list, params, []);
}

export function useViajes(params?: Record<string, string>) {
  return useEntity<Viaje>(api.viajes.list, params, []);
}
