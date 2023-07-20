import { Game } from '..';
import { GameState } from './game-state';
import { SubjectsCreationState } from './subjects-creation-state';

type ConstructorProps = {
  game: Game;
};

export class InitialState extends GameState {
  public constructor(props: ConstructorProps) {
    const { game } = props;

    super({ game, rotation: 'clockwise' });
  }

  public start(): void {
    const playersAmount = this.game.players.length;

    if (playersAmount < 3) throw 'Game must have at least 3 players to start';
    if (playersAmount > 5)
      throw 'Game must not have more than 5 players to start';

    this.game.transitionTo(new SubjectsCreationState({ game: this.game }));
  }

  public createSubject(): void {
    throw 'createSubject not allowed';
  }

  public updateCentralFactDescription(): void {
    throw 'updateCentralFactDescription not allowed';
  }
}
