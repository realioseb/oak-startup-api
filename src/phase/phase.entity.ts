import { taskRepository } from '../task/task.repository';
import { Task } from '../task/task.entity';
import { Entity } from '../core/core.repository';

export class Phase {
  id?: number;

  name: string;

  get tasks(): Entity<Task>[] {
    return taskRepository.find().filter((task) => task.phase.id === this.id);
  }

  get isComplete(): boolean {
    return (
      this.tasks.length > 0 &&
      this.tasks.find((task) => task.isComplete === false) === undefined
    );
  }
}
