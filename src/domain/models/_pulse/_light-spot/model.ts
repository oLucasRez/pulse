import { Vector } from '@utils';

import { SubjectPulse } from '../_subject-pulse';

export class LightSpot extends SubjectPulse {
  public constructor(props: LightSpot.NewProps) {
    const { ...subjectPulseProps } = props;

    const origin = Vector(0, 0);
    const amount = 1;

    const subjectPosition = props.landmark.getPosition();
    if (!subjectPosition) throw 'Subject must have a position';

    const gap = subjectPosition.sub(origin).mag();

    super({ ...subjectPulseProps, origin, gap, amount });
  }
}

export namespace LightSpot {
  export type NewProps = Omit<
    SubjectPulse.NewProps,
    'origin' | 'amount' | 'gap'
  >;
}
