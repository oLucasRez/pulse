import { Color } from '@domain/enums';

import { Vector } from '@utils';

import { Subject } from '..';
import { SubjectPulse } from './subject-pulse';

export class LightSpot extends SubjectPulse {
  public constructor(props: LightSpot.ConstructorProps) {
    const { subject, ...subjectPulseProps } = props;

    const origin = Vector(0, 0);

    if (!subject.position) throw 'Subject must have a position';

    const gap = subject.position.sub(origin).mag();

    super({ ...subjectPulseProps, origin, gap, amount: 1, subject });
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

    return `${color}[LightSpot(${this.subject.position},${this.subject})]\x1b[0m`;
  }
}

export namespace LightSpot {
  export type ConstructorProps = Omit<
    SubjectPulse.ConstructorProps,
    'origin' | 'amount' | 'gap'
  > & {
    subject: Subject;
  };
}
