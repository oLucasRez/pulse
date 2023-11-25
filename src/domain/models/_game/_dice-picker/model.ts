import { Dice } from '@domain/models';

import { Model } from '../../model';

export class DicePicker extends Model {
  private remainingDices: Dice[];

  protected constructor(props: DicePicker.NewProps) {
    const { remainingDices, ...modelProps } = props;

    super(modelProps);

    if (remainingDices) this.remainingDices = remainingDices;
    else
      this.remainingDices = [
        Dice.create({ sides: 4 }),
        Dice.create({ sides: 6 }),
        Dice.create({ sides: 8 }),
        Dice.create({ sides: 10 }),
        Dice.create({ sides: 12 }),
      ];
  }
  public static create(props: DicePicker.CreateProps): DicePicker {
    return new DicePicker(props);
  }
  public static recreate(props: DicePicker.RecreateProps): DicePicker {
    return new DicePicker(props);
  }

  public getRemainingDice(): DicePicker['remainingDices'] {
    return this.remainingDices;
  }

  public pickDice(): Dice | undefined {
    return this.remainingDices.shift();
  }
}

export namespace DicePicker {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps;

  export type RecreateProps = Model.RecreateProps &
    Required<CreateProps> & {
      remainingDices: DicePicker['remainingDices'];
    };
}
