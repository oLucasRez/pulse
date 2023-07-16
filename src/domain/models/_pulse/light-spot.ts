import { Color } from '@domain/enums';

import { Vector } from '@utils';

import { Subject } from '..';
import { SubjectPulse } from './subject-pulse';

type ConstructorProps = {
  id?: string;
  subject: Subject;
};

export class LightSpot extends SubjectPulse {
  public constructor(props: ConstructorProps) {
    const { id, subject } = props;

    const origin = Vector(0, 0);

    if (!subject.position) throw 'Subject must have a position';

    const gap = subject.position.sub(origin).mag();

    super({ id, origin, gap, amount: 1, subject });
  }

  public toString(): string {
    const colorMap: Record<Color, string> = {
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
    };

    return `${colorMap[this.subject.color]}[LightSpot(${
      this.subject.position
    },${this.amount})]\x1b[0m`;
  }
}