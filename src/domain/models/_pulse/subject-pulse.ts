import { Color } from '@domain/enums';

import { Landmark, Subject } from '..';
import { Pulse } from './pulse';

type ConstructorProps = {
  id?: string;
  gap: number;
  amount: number;
  landmark: Landmark;
  subject: Subject;
};

export class SubjectPulse extends Pulse {
  private _subject: Subject;
  public get subject(): Subject {
    return this._subject;
  }

  public constructor(props: ConstructorProps) {
    const { id, gap, amount, landmark, subject } = props;

    const origin = landmark.position;

    super({ id, origin, gap, amount, landmark });
    this._subject = subject;
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

    return `${colorMap[this._subject.color]}[SubjectPulse(${this.origin},${
      this.amount
    })]\x1b[0m`;
  }
}
