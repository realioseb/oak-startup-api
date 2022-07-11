import { TaskResolver } from '../task/task.resolver';
import { PhaseResolver } from '../phase/phase.resolver';

const phaseResolver = new PhaseResolver();
const taskResolver = new TaskResolver();

export const resolvers = {
  Query: {
    findPhases: () => phaseResolver.find(),
    findTasks: () => taskResolver.find(),
  },
  // TODO: (maybe) refactor it to be more readable
  Mutation: {
    insertPhase: (_: any, args: { name: string }) =>
      phaseResolver.insert(args.name),
    updatePhase: (_: any, args: { id: number; name: string }) =>
      phaseResolver.update(args.id, args.name),
    removePhase: (_: any, args: { id: number }) =>
      phaseResolver.remove(args.id),
    insertTask: (_: any, args: { name: string; phaseId: number }) =>
      taskResolver.insert(args.name, args.phaseId),
    updateTask: (_: any, args: { id: number; name: string }) =>
      taskResolver.update(args.id, args.name),
    removeTask: (_: any, args: { id: number }) => taskResolver.remove(args.id),
    completeTask: (_: any, args: { id: number }) =>
      taskResolver.markCompleted(args.id),
    incompleteTask: (_: any, args: { id: number }) =>
      taskResolver.markIncomplete(args.id),
  },
};
