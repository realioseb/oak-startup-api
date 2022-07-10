import { Entity } from '../interface/repository';
import { Phase } from '../phase/phase.entity';

export class Task {
  name: string;

  isComplete: boolean;

  phase: Entity<Phase>;
}
