import { Resolver } from '../interface/resolver';
import { Phase } from './phase.entity';

export class PhaseResolver extends Resolver {
  find() {
    return this.phaseRepo.find();
  }

  insert(name: string) {
    const phase = new Phase();
    phase.name = name;

    return this.phaseRepo.insert(phase);
  }

  update(id: number, name: string) {
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
