import { Player } from '@domain/models';

import { Game } from '..';

type ConstructorProps = {
  game: Game;
  rotation: 'clockwise' | 'counter-clockwise';
};

type CreateSubjectProps = {
  description: string;
};

export abstract class GameState {
  protected game: Game;

  private rotation: 1 | -1 = 1;
  private currentPlayerIndex: number;

  protected constructor(props: ConstructorProps) {
    const { game, rotation } = props;

    this.game = game;

    if (rotation === 'clockwise') {
      this.rotation = 1;
      this.currentPlayerIndex = 0;
    } else {
      this.rotation = -1;
      this.currentPlayerIndex = game.players.length - 1;
    }
  }

  protected nextPlayer(): Player {
    const nextPlayer =
      this.game.players[this.currentPlayerIndex + this.rotation];

    if (!nextPlayer) throw 'There is no next player';

    this.currentPlayerIndex++;

    return this.game.setCurrentPlayer(nextPlayer);
  }

  public abstract start(): void;
  public abstract createSubject(props: CreateSubjectProps): void;
  public abstract updateCentralFactDescription(description: string): void;
}
