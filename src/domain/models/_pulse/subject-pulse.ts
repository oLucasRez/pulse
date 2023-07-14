import { Landmark, Subject } from '..';
import { Pulse } from './pulse';

export interface SubjectPulse extends Pulse {
  subject: Subject;
}

type ConstructorProps = {
  id?: string;
  gap: number;
  amount: number;
  landmark: Landmark;
  subject: Subject;
};

export class SubjectPulse extends Pulse {
  constructor(props: ConstructorProps) {
    const { id, gap, amount, landmark, subject } = props;

    const origin = landmark.position;

    super({ id, origin, gap, amount, landmark });
    this.subject = subject;
  }
}
