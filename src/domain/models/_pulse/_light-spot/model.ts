import { Subject } from '@domain/models';

import { Vector } from '@utils';

import { Pulse } from '../model';

export class LightSpot extends Pulse<Subject> {
  protected constructor(props: LightSpot.NewProps) {
    const origin = Vector(0, 0);
    const amount = 1;

    const landmarkPosition = props.landmark.getPosition();
    if (!landmarkPosition) throw 'Landmark must have a position';

    const gap = landmarkPosition.sub(origin).mag();

    super({ ...props, origin, gap, amount });
  }
  public static create(props: LightSpot.CreateProps): LightSpot {
    return new LightSpot(props);
  }
  public static recreate(props: LightSpot.RecreateProps): LightSpot {
    return new LightSpot(props);
  }
}
// ============================================================================
export namespace LightSpot {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Omit<
    Pulse.CreateProps<Subject>,
    'origin' | 'amount' | 'gap'
  >;

  export type RecreateProps = Pulse.RecreateProps<Subject> &
    Required<CreateProps>;
}
