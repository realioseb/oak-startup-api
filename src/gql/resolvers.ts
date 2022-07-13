import { TaskResolver } from '../task/task.resolver';
import { PhaseResolver } from '../phase/phase.resolver';

const phaseResolver = new PhaseResolver();
const taskResolver = new TaskResolver();

const handler = <ARG = any, TYPE = any>(callback: (args: ARG) => TYPE) => {
  return (_: any, args: ARG) => {
    return callback(args);
  };
};

export const resolvers = {
  Query: {
    findPhases: () => phaseResolver.find(),
    findTasks: () => taskResolver.find(),
  },
  Mutation: {
    insertPhase: handler(({ name }) => phaseResolver.insert(name)),
    updatePhase: handler(({ id, name }) => phaseResolver.update(id, name)),
    removePhase: handler(({ id }) => phaseResolver.remove(id)),
    insertTask: handler(({ name, phaseId }) =>
      taskResolver.insert(name, phaseId),
    ),
    updateTask: handler(({ id, name }) => taskResolver.update(id, name)),
    removeTask: handler(({ id }) => taskResolver.remove(id)),
    completeTask: handler(({ id }) => taskResolver.markCompleted(id)),
    incompleteTask: handler(({ id }) => taskResolver.markIncomplete(id)),
  },
};
