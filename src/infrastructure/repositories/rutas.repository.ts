import { MockRepository } from './mock-repository';
import { MOCK_RUTAS } from '@/infrastructure/mock/data';
import type { Ruta } from '@/infrastructure/domain/types';

export class RutaRepository extends MockRepository<Ruta> {
  constructor() {
    super(MOCK_RUTAS);
  }

  async findByAgencia(agenciaId: string): Promise<Ruta[]> {
    await new Promise(r => setTimeout(r, 200));
    return this.items.filter(item => item.idAgencia === agenciaId);
  }
}

export const rutaRepository = new RutaRepository();
