import { MockRepository } from './mock-repository';
import {
  MOCK_TERMINALES,
  MOCK_AGENCIA_TERMINALES,
} from '@/infrastructure/mock/data';
import type { Terminal } from '@/infrastructure/domain/types';

export class TerminalRepository extends MockRepository<Terminal> {
  constructor() {
    super(MOCK_TERMINALES);
  }

  async findByAgencia(agenciaId: string): Promise<Terminal[]> {
    await new Promise((r) => setTimeout(r, 200));

    const terminalIds = MOCK_AGENCIA_TERMINALES
      .filter((at) => at.idAgencia === agenciaId)
      .map((at) => at.idTerminal);

    return this.items.filter((item) => terminalIds.includes(item.id));
  }
}

export const terminalRepository = new TerminalRepository();