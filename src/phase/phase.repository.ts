import { UserInputError } from 'apollo-server';
import { Repository } from '../core/core.repository';
import { Phase } from './phase.entity';

export class PhaseRepository extends Repository<Phase> {
  allowTaskCompletion(phaseId: number): boolean {
    const index = this.data.findIndex((phase) => phase.id === phaseId);

    if (index === -1) {
      throw new UserInputError('invalid-phase-id');
    }

    if (index === 0) {
      return true;
    }

    const prevPhase = this.data[index - 1];

    return prevPhase.isComplete;
  }
}

export const phaseRepository = new PhaseRepository();
