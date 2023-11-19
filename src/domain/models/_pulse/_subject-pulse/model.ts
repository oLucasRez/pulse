import { Subject } from '../..';
import { Pulse } from '../model';

export class SubjectPulse extends Pulse<Subject> {
  public constructor(props: SubjectPulse.NewProps) {
    const { ...pulseProps } = props;

    super({ ...pulseProps });
  }
}

export namespace SubjectPulse {
  export type NewProps = Pulse.NewProps<Subject>;
}
