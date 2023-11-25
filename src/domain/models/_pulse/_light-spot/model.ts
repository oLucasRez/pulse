import { Subject } from '@domain/models';

import { Vector } from '@utils';

import { Pulse } from '../model';

export class LightSpot extends Pulse<Subject> {
  public constructor(props: LightSpot.NewProps) {
    const pulseProps = props;

    const origin = Vector(0, 0);
    const amount = 1;

    const landmarkPosition = props.landmark.getPosition();
    if (!landmarkPosition) throw 'Landmark must have a position';

    const gap = landmarkPosition.sub(origin).mag();

    super({ ...pulseProps, origin, gap, amount });
  }
}
// ============================================================================
export namespace LightSpot {
  export type NewProps = Omit<
    Pulse.NewProps<Subject>,
    'origin' | 'amount' | 'gap'
  >;
}
