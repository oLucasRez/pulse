import { Vector } from '@utils';

import { CentralFact } from '..';
import { Pulse } from './pulse';

type ConstructorProps = {
  id?: string;
  amount?: number;
};

export class CentralPulse extends Pulse<CentralFact> {
  public get centralFact(): CentralFact {
    return this.landmark;
  }

  public constructor(props: ConstructorProps) {
    const { id, amount = 0 } = props;

    const origin = Vector(0, 0);
    const landmark = new CentralFact({ description: '', position: origin });

    super({ id, gap: 1, amount, landmark, origin });
  }

  public updateAmount(value: number): void {
    super.updateAmount(value);
  }
}
