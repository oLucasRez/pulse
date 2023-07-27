import { Vector } from '@utils';

import { CentralFact } from '../..';
import { Pulse } from '../model';

export class CentralPulse extends Pulse<CentralFact> {
  public constructor(props: CentralPulse.NewProps) {
    const { amount = 0, ...pulseProps } = props;

    const origin = Vector(0, 0);
    const landmark = new CentralFact({ description: '', position: origin });

    super({ ...pulseProps, origin, gap: 1, amount, landmark });
  }

  public toDTO(): CentralPulse.DTO {
    const pulseDTO = super.toDTO();

    return Object.freeze({
      ...pulseDTO,
      centralFactID: this.getCentralFact().id,
    });
  }

  public getCentralFact(): CentralFact {
    const centralFact = this.landmark;

    return centralFact;
  }

  public updateAmount(value: number): CentralPulse {
    super.updateAmount(value);

    return this;
  }

  public toString(): string {
    return `\x1b[37m[CentralPulse(${super.getAmount()})]\x1b[0m`;
  }
}

export namespace CentralPulse {
  export type DTO = Pulse.DTO & {
    centralFactID: string;
  };

  export type NewProps = Omit<
    Pulse.NewProps<CentralFact>,
    'origin' | 'gap' | 'amount' | 'landmark'
  > & {
    amount?: number;
  };
}
