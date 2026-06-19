import { MockRepository } from './mock-repository';
import { MOCK_BUSES } from '@/infrastructure/mock/data';
import type { Bus } from '@/infrastructure/domain/types';

export class BusRepository extends MockRepository<Bus> {
  constructor() {
    super(MOCK_BUSES);
  }

  async findByAgencia(agenciaId: string): Promise<Bus[]> {
    await new Promise(r => setTimeout(r, 200));
    return this.items.filter(item => item.idAgencia === agenciaId);
  }
}

export const busRepository = new BusRepository();
