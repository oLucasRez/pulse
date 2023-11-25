import { Subject } from '../..';
import { Pulse } from '../model';

export class SubjectPulse extends Pulse<Subject> {
  public constructor(props: SubjectPulse.NewProps) {
    const { landmark, ...pulseProps } = props;

    const origin = landmark.getPosition();

    if (!origin) throw 'Landmark must have a position';

    super({
      ...pulseProps,
      origin,
      landmark,
    });
  }
}
// ============================================================================
export namespace SubjectPulse {
  export type NewProps = Omit<Pulse.NewProps<Subject>, 'origin'>;
}
