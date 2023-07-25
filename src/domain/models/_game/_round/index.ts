import { Player } from '@domain/models';

export class Round {
  private _players: Player[];
  public get players(): Player[] {
    return this._players;
  }

  public constructor() {
    this._players = [];
  }

  public addPlayer(player: Player): void {
    this._players.push(player);
  }

  public *start(rotation: Round.StartProps): Round.StartReturn {
    const maxI = this._players.length - 1;

    for (let i = 0; i <= maxI; i++) {
      let j: number;
      switch (rotation) {
        case Round.Rotation.CLOCKWISE:
          j = i;
          break;
        case Round.Rotation.ANTICLOCKWISE:
          j = maxI - i;
          break;
        default:
          throw 'Unknown rotation';
      }

      const currentPlayer = this._players[j];

      yield currentPlayer;
    }

    return null;
  }
}

export namespace Round {
  export enum Rotation {
    CLOCKWISE = 1,
    ANTICLOCKWISE = -1,
  }

  export type StartProps = Rotation;

  export type StartReturn = Generator<Player, null, void>;
}
