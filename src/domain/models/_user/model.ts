import { Game } from '../_game';
import { Model } from '../model';

export class User extends Model {
  private name: string;

  public constructor(props: User.NewProps) {
    const { name, ...modelProps } = props;

    super({ ...modelProps });

    this.name = name;
  }

  public toDTO(): User.DTO {
    const modelDTO = super.toDTO();

    return Object.freeze({
      ...modelDTO,
      name: this.name,
    });
  }

  public getName(): string {
    return this.name;
  }

  public createGame(props: User.CreateGame.Props): User.CreateGame.Return {
    const game = new Game({ ...props, host: this });

    return game;
  }
}

export namespace User {
  export type DTO = Model.DTO & {
    name: string;
  };

  export type NewProps = Model.NewProps & {
    name: string;
  };

  export namespace CreateGame {
    export type Props = Omit<Game.NewProps, 'host'>;
    export type Return = Game;
  }
}
