import { random } from '@utils';

import { vector } from '@types';

import { Player } from '..';
import { Model } from '../model';

export class Dice extends Model {
  private sides: number;
  private value: number | null;
  private position: vector | null;
  private owner: Player | null;

  protected constructor(props: Dice.NewProps) {
    const {
      sides,
      value = null,
      position = null,
      owner = null,
      ...modelProps
    } = props;

    super(modelProps);

    this.sides = sides;
    this.value = value;
    this.position = position;
    this.owner = owner;
  }
  public static create(props: Dice.CreateProps): Dice {
    return new Dice(props);
  }
  public static recreate(props: Dice.RecreateProps): Dice {
    return new Dice(props);
  }

  public getSides(): Dice['sides'] {
    return this.sides;
  }

  public getValue(): Dice['value'] {
    return this.value;
  }

  public getPosition(): Dice['position'] {
    return this.position;
  }

  public getOwner(): Dice['owner'] {
    return this.owner;
  }

  public setOwner(value: Dice['owner']): void {
    this.owner = value;
  }

  public roll(): number {
    const value = random({ max: this.sides, type: 'int' }) + 1;

    this.value = value;

    return value;
  }

  public updatePosition(value: vector): void {
    this.position = value;
  }

  // // @todo: criar bounds pro dado conseguir ricochetear
  // // @obs: talvez eu tenha acoplado o domínio com apresentação (animação)
  // *roll(
  //   initialPosition: vector,
  //   initialVelocity: vector,
  // ): Generator<Dice, number, number | undefined> {
  //   this.position = initialPosition;
  //   this.velocity = initialVelocity;

  //   while (round(this.velocity.mag(), 2) > 0) {
  //     const acceleration = this.velocity['*'](-Dice.friction);

  //     const timeToStop = this.velocity['-'](initialVelocity)
  //       ['/'](acceleration.mag())
  //       .mag();

  //     const timeStep = (yield this) || timeToStop;

  //     if (timeToStop <= 0) break;

  //     this.velocity = this.velocity['+'](acceleration['*'](timeStep));
  //     this.position = this.position['+'](this.velocity['*'](timeStep));
  //   }

  //   this.position = initialPosition['+'](
  //     initialVelocity['/'](Dice.friction)['*'](
  //       1 - Math.exp(-Dice.friction * Number.MAX_SAFE_INTEGER),
  //     ),
  //   );
  //   this.velocity = Vector(0, 0);

  //   return random({ min: 1, max: this.sides, type: 'int' });
  // }
}
// ============================================================================
export namespace Dice {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    sides: Dice['sides'];
  };

  export type RecreateProps = Model.RecreateProps &
    Required<CreateProps> & {
      value: Dice['value'];
      position: Dice['position'];
      owner: Dice['owner'];
    };
}
