import { UserInputError } from 'apollo-server';
import { Entity, Repository } from '../core/core.repository';
import { Task } from './task.entity';

export class TaskRepository extends Repository<Task> {
  markComplete(id: number): Entity<Task> {
    const item = this.findOne(id);

    if (!item) {
      throw new UserInputError('task-not-found');
    }

    item.isComplete = true;
    return item;
  }

  markIncomplete() {}
}

export const taskRepository = new TaskRepository();
