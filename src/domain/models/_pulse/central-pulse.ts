import { Vector } from '@utils';

import { Landmark } from '..';
import { Pulse } from './pulse';

type ConstructorProps = {
  id?: string;
  amount?: number;
};

export class CentralPulse extends Pulse {
  private _centralFact: string;
  public get centralFact(): string {
    return this._centralFact;
  }

  public constructor(props: ConstructorProps) {
    const { id, amount = 0 } = props;

    const origin = Vector(0, 0);
    const landmark = new Landmark({ position: origin });

    super({ id, gap: 1, amount, landmark, origin });

    this._centralFact = '';
  }

  public updateCentralFact(description: string): void {
    this._centralFact += `${description}\n`;
  }

  public updateAmount(value: number): void {
    super.updateAmount(value);
  }
}
