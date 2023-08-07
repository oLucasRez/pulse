import { Player } from '@domain/models';

export class Round {
  private players: Player[];

  public constructor() {
    this.players = [];
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public *start(rotation: Round.StartProps): Round.StartReturn {
    const maxI = this.players.length - 1;

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

      const currentPlayer = this.players[j];

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
