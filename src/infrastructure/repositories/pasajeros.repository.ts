import { MockRepository } from './mock-repository';
import { MOCK_PASAJEROS } from '@/infrastructure/mock/data';
import type { Pasajero } from '@/infrastructure/domain/types';

export class PasajeroRepository extends MockRepository<Pasajero> {
  constructor() {
    super(MOCK_PASAJEROS);
  }
}

export const pasajeroRepository = new PasajeroRepository();
