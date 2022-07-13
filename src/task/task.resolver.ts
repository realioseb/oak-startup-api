import { UserInputError, ForbiddenError } from 'apollo-server';
import { Resolver } from '../core/core.resolver';

export class TaskResolver extends Resolver {
  find() {
    return this.taskRepo.find();
  }

  insert(name: string, phaseId: number) {
    if (!name) {
      throw new UserInputError('name required');
    }

    const phase = this.phaseRepo.findOne(phaseId);

    if (!phase) {
      throw new UserInputError('phase-not-exists');
    }

    return this.taskRepo.insert({
      name,
      phase,
      isComplete: false,
    });
  }

  update(id: number, name: string) {
    if (!name) {
      throw new UserInputError('name required');
    }

    return this.taskRepo.update(id, { name });
  }

  markCompleted(id: number) {
    const task = this.taskRepo.findOne(id);

    if (!task) {
      throw new UserInputError('task-not-exists');
    }

    const allowed = this.phaseRepo.allowTaskCompletion(task.phase.id);

    if (!allowed) {
      throw new ForbiddenError('prev-phase-incomplete');
    }

    return this.taskRepo.update(id, { isComplete: true });
  }

  markIncomplete(id: number) {
    const task = this.taskRepo.findOne(id);

    if (!task) {
      throw new UserInputError('task-not-exists');
    }

    return this.taskRepo.update(id, { isComplete: false });
  }

  remove(id: number) {
    return this.taskRepo.remove(id);
  }
}
