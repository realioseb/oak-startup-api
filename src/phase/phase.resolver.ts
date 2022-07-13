import { UserInputError } from 'apollo-server';
import { Resolver } from '../core/core.resolver';
import { Phase } from './phase.entity';

export class PhaseResolver extends Resolver {
  find() {
    return this.phaseRepo.find();
  }

  insert(name: string) {
    if (!name) {
      throw new UserInputError('name-required');
    }

    const phase = new Phase();
    phase.name = name;

    return this.phaseRepo.insert(phase);
  }

  update(id: number, name: string) {
    if (!name) {
      throw new UserInputError('name-required');
    }

    return this.phaseRepo.update(id, { name });
  }

  remove(id: number) {
    const removedPhase = this.phaseRepo.remove(id);

    for (let task of removedPhase.tasks) {
      this.taskRepo.remove(task.id);
    }

    return removedPhase;
  }
}
