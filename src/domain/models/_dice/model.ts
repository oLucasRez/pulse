import { random } from '@utils';

import { vector } from '@types';

import { Player } from '..';
import { Model } from '../model';

export class Dice extends Model {
  private sides: number;
  private value: number | null;
  private position: vector | null;
  private owner: Player | null;

  public constructor(props: Dice.NewProps) {
    const { sides, value = null, position = null, ...modelProps } = props;

    super({ ...modelProps });

    this.sides = sides;
    this.value = value;
    this.position = position;
    this.owner = null;
  }

  public toDTO(): Dice.DTO {
    const modelDTO = super.toDTO();

    return Object.freeze({
      ...modelDTO,
      sides: this.sides,
      value: this.value,
      position: this.position,
      ownerID: this.owner?.id || null,
    });
  }

  public getValue(): number | null {
    return this.value;
  }

  public getPosition(): vector | null {
    return this.position;
  }

  public setOwner(owner: Player): void {
    this.owner = owner;
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

export namespace Dice {
  export type DTO = Model.DTO & {
    sides: number;
    value: number | null;
    position: vector.DTO | null;
    ownerID: string | null;
  };

  export type NewProps = Model.NewProps & {
    sides: number;
    value?: number;
    position?: vector;
  };
}
