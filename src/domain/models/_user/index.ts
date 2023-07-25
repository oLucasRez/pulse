import { Game } from '../_game';
import { Model } from '../this';

export class User extends Model {
  private _name: string;
  public get name(): string {
    return this._name;
  }

  public constructor(props: User.NewProps) {
    const { name, ...modelProps } = props;

    super({ ...modelProps });

    this._name = name;
  }

  public createGame(props: User.CreateGame.Props): User.CreateGame.Return {
    const { ...gameProps } = props;

    const game = new Game({ ...gameProps, host: this });

    return game;
  }
}

export namespace User {
  export type NewProps = Model.NewProps & {
    name: string;
  };

  export namespace CreateGame {
    export type Props = Omit<Game.NewProps, 'host'>;
    export type Return = Game;
  }
}
