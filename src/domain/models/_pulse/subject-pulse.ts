import { Color } from '@domain/enums';

import { Subject } from '..';
import { Pulse } from './pulse';

export class SubjectPulse extends Pulse<Subject> {
  public get subject(): Subject {
    return this.landmark;
  }

  public constructor(props: SubjectPulse.ConstructorProps) {
    const { subject, ...pulseProps } = props;

    super({ ...pulseProps, landmark: subject });
  }

  public toString(): string {
    const color = {
      [Color.RED]: '\x1b[31m',
      [Color.GREEN]: '\x1b[32m',
      [Color.BLUE]: '\x1b[34m',
      [Color.CYAN]: '\x1b[36m',
      [Color.PURPLE]: '\x1b[35m',
      [Color.YELLOW]: '\x1b[33m',
      [Color.ORANGE]: '\x1b[33m',
      [Color.PINK]: '\x1b[35m',
      [Color.BROWN]: '\x1b[31m',
      [Color.CRIMSON]: '\x1b[31m',
      [Color.TURQUOISE]: '\x1b[36m',
      [Color.BEIGE]: '\x1b[37m',
      [Color.GREY]: '\x1b[37m',
    }[this.subject.color];

    return `${color}[SubjectPulse(${this.origin},${this.amount})]\x1b[0m`;
  }
}

export namespace SubjectPulse {
  export type ConstructorProps = Omit<
    Pulse.ConstructorProps<Subject>,
    'landmark'
  > & {
    subject: Subject;
  };
}
