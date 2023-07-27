import { Color } from '@domain/enums';

import { Subject } from '../..';
import { Pulse } from '../model';

export class SubjectPulse extends Pulse<Subject> {
  public constructor(props: SubjectPulse.NewProps) {
    const { subject, ...pulseProps } = props;

    super({ ...pulseProps, landmark: subject });
  }

  public toDTO(): SubjectPulse.DTO {
    const pulseDTO = super.toDTO();

    return Object.freeze({
      ...pulseDTO,
      subject: this.getSubject().toDTO(),
    });
  }

  public getSubject(): Subject {
    const subject = this.landmark;

    return subject;
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

    return `${color}[SubjectPulse(${this.origin},${this.getAmount()})]\x1b[0m`;
  }
}

export namespace SubjectPulse {
  export type DTO = Pulse.DTO & {
    subject: Subject.DTO;
  };

  export type NewProps = Omit<Pulse.NewProps<Subject>, 'landmark'> & {
    subject: Subject;
  };
}
