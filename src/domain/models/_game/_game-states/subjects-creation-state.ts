import { Game } from '..';
import { CentralFactCreationState } from './central-fact-creation-state';
import { GameState } from './game-state';

type ConstructorProps = {
  game: Game;
};

type CreateSubjectProps = {
  description: string;
};

export class SubjectsCreationState extends GameState {
  public constructor(props: ConstructorProps) {
    const { game } = props;

    super({ game, rotation: 'clockwise' });
  }

  public start(): void {
    throw 'Start not allowed';
  }

  public createSubject(props: CreateSubjectProps): void {
    const { description } = props;

    if (!this.game.currentPlayer) throw 'Current Player not found';

    this.game.currentPlayer.createSubject({ description });

    try {
      this.nextPlayer();
    } catch (e) {
      this.game.transitionTo(new CentralFactCreationState({ game: this.game }));
    }
  }

  public updateCentralFactDescription(): void {
    throw 'updateCentralFactDescription not allowed';
  }
}
