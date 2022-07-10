import { phaseRepository, PhaseRepository } from '../phase/phase.repository';
import { TaskRepository, taskRepository } from '../task/task.repository';

export class Resolver {
  protected taskRepo: TaskRepository;
  protected phaseRepo: PhaseRepository;

  constructor() {
    // NOTE: Dependency injection would look better, but I chose not to install an extra package
    this.taskRepo = taskRepository;
    this.phaseRepo = phaseRepository;
  }
}
