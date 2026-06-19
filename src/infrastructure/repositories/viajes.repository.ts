import { MockRepository } from './mock-repository';
import { MOCK_VIAJES, MOCK_RUTAS } from '@/infrastructure/mock/data';
import type { Viaje } from '@/infrastructure/domain/types';

export class ViajeRepository extends MockRepository<Viaje> {
  constructor() {
    super(MOCK_VIAJES);
  }

  async findByRuta(rutaId: string): Promise<Viaje[]> {
    await new Promise(r => setTimeout(r, 200));
    return this.items.filter(item => item.idRuta === rutaId);
  }

  async findByAgencia(agenciaId: string): Promise<Viaje[]> {
    await new Promise(r => setTimeout(r, 200));
    const rutaIds = MOCK_RUTAS.filter(r => r.idAgencia === agenciaId).map(r => r.id);
    return this.items.filter(item => rutaIds.includes(item.idRuta));
  }
}

export const viajeRepository = new ViajeRepository();
