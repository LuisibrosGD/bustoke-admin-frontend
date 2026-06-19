import { MockRepository } from './mock-repository';
import { MOCK_AGENCIA_TERMINALES } from '@/infrastructure/mock/data';
import type { AgenciaTerminal } from '@/infrastructure/domain/types';

export class AgenciaTerminalRepository extends MockRepository<AgenciaTerminal> {
  constructor() {
    super(MOCK_AGENCIA_TERMINALES);
  }

  async findByAgencia(agenciaId: string): Promise<AgenciaTerminal[]> {
    await new Promise(r => setTimeout(r, 200));
    return this.items.filter(item => item.idAgencia === agenciaId);
  }
}

export const agenciaTerminalRepository = new AgenciaTerminalRepository();
