import { Color } from '@domain/enums';

import { Vector } from '@utils';

import { Subject } from '../..';
import { SubjectPulse } from '../_subject-pulse';

export class LightSpot extends SubjectPulse {
  public constructor(props: LightSpot.NewProps) {
    const { subject, ...subjectPulseProps } = props;

    const origin = Vector(0, 0);

    const subjectPosition = subject.getPosition();

    if (!subjectPosition) throw 'Subject must have a position';

    const gap = subjectPosition.sub(origin).mag();

    super({ ...subjectPulseProps, origin, gap, amount: 1, subject });
  }

  public toDTO(): LightSpot.DTO {
    const subjectPulseDTO = super.toDTO();

    return Object.freeze({
      ...subjectPulseDTO,
    });
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
    }[this.getSubject().getColor()];

    return `${color}[LightSpot(${this.getSubject().getPosition()},${this.getSubject()})]\x1b[0m`;
  }
}

export namespace LightSpot {
  export type DTO = SubjectPulse.DTO;

  export type NewProps = Omit<
    SubjectPulse.NewProps,
    'origin' | 'amount' | 'gap'
  > & {
    subject: Subject;
  };
}
