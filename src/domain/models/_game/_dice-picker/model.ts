import { Dice } from '@domain/models';

import { Model } from '../../model';

export class DicePicker extends Model {
  private remainingDices: Dice[];

  public constructor(props: DicePicker.NewProps) {
    const { remainingDices, ...modelProps } = props;

    super({ ...modelProps });

    if (remainingDices) this.remainingDices = remainingDices;
    else
      this.remainingDices = [
        new Dice({ sides: 4 }),
        new Dice({ sides: 6 }),
        new Dice({ sides: 8 }),
        new Dice({ sides: 10 }),
        new Dice({ sides: 12 }),
      ];
  }

  public getRemainingDice(): DicePicker['remainingDices'] {
    return this.remainingDices;
  }

  public pickDice(): Dice | undefined {
    return this.remainingDices.shift();
  }
}

export namespace DicePicker {
  export type NewProps = Model.NewProps & {
    remainingDices?: DicePicker['remainingDices'];
  };
}
