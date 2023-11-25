import { Vector } from '@utils';

import { CentralFact } from '../..';
import { Pulse } from '../model';

export class CentralPulse extends Pulse<CentralFact> {
  protected constructor(props: CentralPulse.NewProps) {
    const {
      amount = 0,
      landmark = CentralFact.create({ description: '' }),
      ...pulseProps
    } = props;

    const origin = Vector(0, 0);
    const gap = 1;

    super({ ...pulseProps, origin, gap, amount, landmark });
  }
  public static create(props: CentralPulse.CreateProps): CentralPulse {
    return new CentralPulse(props);
  }
  public static recreate(props: CentralPulse.RecreateProps): CentralPulse {
    return new CentralPulse(props);
  }

  public updateAmount(amount: CentralPulse['amount']): void {
    this.amount = amount;
  }
}
// ============================================================================
export namespace CentralPulse {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Omit<
    Pulse.CreateProps<CentralFact>,
    'origin' | 'gap' | 'amount' | 'landmark'
  >;

  export type RecreateProps = Pulse.RecreateProps<CentralFact> &
    Required<CreateProps> & {
      amount: CentralPulse['amount'];
      landmark: CentralPulse['landmark'];
    };
}
