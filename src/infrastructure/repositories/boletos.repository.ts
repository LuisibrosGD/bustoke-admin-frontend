import { MockRepository } from './mock-repository';
import { MOCK_BOLETOS } from '@/infrastructure/mock/data';
import type { Boleto } from '@/infrastructure/domain/types';

export class BoletoRepository extends MockRepository<Boleto> {
  constructor() {
    super(MOCK_BOLETOS);
  }
}

export const boletoRepository = new BoletoRepository();
