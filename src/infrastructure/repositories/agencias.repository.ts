import { MockRepository } from './mock-repository';
import { MOCK_AGENCIAS } from '@/infrastructure/mock/data';
import type { Agencia } from '@/infrastructure/domain/types';

export class AgenciaRepository extends MockRepository<Agencia> {
  constructor() {
    super(MOCK_AGENCIAS);
  }
}

export const agenciaRepository = new AgenciaRepository();
