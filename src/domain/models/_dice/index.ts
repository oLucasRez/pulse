import { Color } from '@domain/enums';

import { random, uuid } from '@utils';

import { vector } from '@types';

import { Player } from '..';

type ConstructorProps = {
  id?: string;
  sides: number;
  value?: number;
  position?: vector;
};

export class Dice {
  public readonly id: string;

  private _sides: number;
  public get sides(): number {
    return this._sides;
  }

  private _value: number | null;
  public get value(): number | null {
    return this._value;
  }

  private _position: vector | null;
  public get position(): vector | null {
    return this._position;
  }

  private _owner: Player | null;
  public get owner(): Player | null {
    return this._owner;
  }

  public constructor(props: ConstructorProps) {
    const { id = uuid(), sides, value = null, position = null } = props;

    this.id = id;
    this._sides = sides;
    this._value = value;
    this._position = position;
    this._owner = null;
  }

  public setOwner(owner: Player): void {
    this._owner = owner;
  }

  public roll(newPosition?: vector): number {
    const value = random({ max: this.sides, type: 'int' }) + 1;

    if (newPosition) this._position = newPosition;
    this._value = value;

    return value;
  }

  public updatePosition(value: vector): void {
    this._position = value;
  }

  public toString(): string {
    const colorMap: Record<Color, string> = {
      [Color.RED]: '\x1b[31m',
      [Color.GREEN]: '\x1b[32m',
      [Color.BLUE]: '\x1b[34m',
      [Color.CYAN]: '\x1b[36m',
      [Color.PURPLE]: '\x1b[35m',
      [Color.YELLOW]: '\x1b[33m',
      [Color.ORANGE]: '\x1b[33m',
      [Color.PINK]: '\x1b[35m',
      [Color.BROWN]: '\x1b[31m',
      [Color.CRIMSON]: '\x1b[31m',
      [Color.TURQUOISE]: '\x1b[36m',
      [Color.BEIGE]: '\x1b[37m',
      [Color.GREY]: '\x1b[37m',
    };

    return `${this.owner?.color && colorMap[this.owner.color]}[Dice(D${
      this.sides
    })]\x1b[0m`;
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
