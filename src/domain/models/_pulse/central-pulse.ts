import { Vector } from '@utils';

import { Landmark } from '..';
import { Pulse } from './pulse';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CentralPulse extends Pulse {}

type ConstructorProps = {
  id?: string;
  amount: number;
};

export class CentralPulse extends Pulse {
  constructor(props: ConstructorProps) {
    const { id, amount } = props;

    const origin = Vector(0, 0);
    const landmark = new Landmark({ position: origin });

    super({ id, gap: 1, amount, landmark, origin });
  }
}
