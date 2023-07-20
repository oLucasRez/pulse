import { Game } from '..';
import { GameState } from './game-state';

type ConstructorProps = {
  game: Game;
};

export class CentralFactCreationState extends GameState {
  public constructor(props: ConstructorProps) {
    const { game } = props;

    super({ game, rotation: 'counter-clockwise' });
  }

  public start(): void {
    throw 'start not allowed';
  }

  public createSubject(): void {
    throw 'createSubject not allowed';
  }

  public updateCentralFactDescription(description: string): void {
    this.game.centralPulse.centralFact.updateDescription(description);

    try {
      this.nextPlayer();
    } catch (e) {
      this.game.transitionTo(new CentralFactCreationState({ game: this.game }));
    }
  }
}
