import { Subject } from '../..';
import { Pulse } from '../model';

export class SubjectPulse extends Pulse<Subject> {
  protected constructor(props: SubjectPulse.NewProps) {
    const { landmark, origin = landmark.getPosition(), ...pulseProps } = props;

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
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Omit<Pulse.CreateProps<Subject>, 'origin'>;

  export type RecreateProps = Pulse.RecreateProps<Subject> &
    Required<CreateProps> & {
      origin: SubjectPulse['origin'];
    };
}
