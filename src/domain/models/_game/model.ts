import { circle, crossing, vector } from '@types';

import {
  CentralFact,
  CentralPulse,
  Dice,
  Player,
  Pulse,
  Question,
  Subject,
  SubjectPulse,
  User,
} from '..';
import { Model } from '../model';
import { Round } from './_round';
import { GameState, InitialGameState } from './states';

export class Game extends Model {
  private host: User;
  private round: Round;
  private state: GameState;
  private centralPulse: CentralPulse;
  private subjectPulses: SubjectPulse[];
  private questions: Question[];
  private availableDices: Dice[];

  public constructor(props: Game.NewProps) {
    const { host, ...modelProps } = props;

    super({ ...modelProps });

    this.host = host;
    this.round = new Round();
    this.state = new InitialGameState(this);
    this.subjectPulses = [];
    this.questions = [];

    this.centralPulse = new CentralPulse({});

    const d4 = new Dice({ sides: 4 });
    const d6 = new Dice({ sides: 6 });
    const d8 = new Dice({ sides: 8 });
    const d10 = new Dice({ sides: 10 });
    const d12 = new Dice({ sides: 12 });

    this.availableDices = [d4, d6, d8, d10, d12];
  }

  public toDTO(): Game.DTO {
    const modelDTO = super.toDTO();

    return Object.freeze({
      ...modelDTO,
      subjects: this.subjectPulses.map((subjectPulse) =>
        subjectPulse.getSubject().toDTO(),
      ),
      pulses: this.getPulses().map((pulse) => pulse.toDTO()),
      dices: this.round.getPlayers().map((player) => player.getDice().toDTO()),
      players: this.round.getPlayers().map((player) => player.toDTO()),
      hostID: this.host.id,
    });
  }

  public getRound(): Round {
    return this.round;
  }

  public getCentralPulse(): CentralPulse {
    return this.centralPulse;
  }

  public getPulses(): Pulse[] {
    return [...this.subjectPulses, this.centralPulse];
  }

  public getCircles(): circle[] {
    const pulses = this.getPulses();

    return pulses.reduce<circle[]>(
      (array, pulse) => [...array, ...pulse.getCircles()],
      [],
    );
  }

  public setState(state: GameState): void {
    this.state = state;
  }

  public start(): void {
    this.state.start();
  }

  public getCurrentPlayer(): Player | null {
    return this.state.getCurrentPlayer();
  }

  public finishTurn(): void {
    this.state.finishTurn();
  }

  public createSubject(props: Game.CreateSubjectProps): Subject {
    const subject = this.state.createSubject(props);

    return subject;
  }

  public getCentralFact(): CentralFact {
    return this.centralPulse.getCentralFact();
  }

  public updateCentralFactDescription(description: string): CentralFact {
    const centralFact = this.state.updateCentralFactDescription(description);

    return centralFact;
  }

  public rollCurrentDice(): Dice {
    return this.state.rollCurrentDice();
  }

  public updateCentralPulseAmount(): CentralPulse {
    return this.state.updateCentralPulseAmount();
  }

  public updateCurrentDicePosition(position: vector): Dice {
    return this.state.updateCurrentDicePosition(position);
  }

  public updateCurrentSubjectPosition(): Subject {
    return this.state.updateCurrentSubjectPosition();
  }

  public createSubjectPulse(gap: number): SubjectPulse {
    const subjectPulse = this.state.createSubjectPulse(gap);

    this.subjectPulses.push(subjectPulse);

    return subjectPulse;
  }

  public createPlayer(props: Game.CreatePlayerProps): Player {
    const { ...playerProps } = props;

    const dice = this.availableDices.shift();

    if (!dice) throw 'Limit of players achieved';

    const player = new Player({ ...playerProps, dice, game: this });

    this.round.addPlayer(player);

    return player;
  }

  public getCrossings(tolerance: number = 0): crossing[] {
    return this.state.getCrossings(tolerance);
  }

  public createQuestion(props: Game.CreateQuestionProps): Question {
    return this.state.createQuestion(props);
  }
}

export namespace Game {
  export type DTO = Model.DTO & {
    pulses: Pulse.DTO[];
    subjects: Subject.DTO[];
    dices: Dice.DTO[];
    players: Player.DTO[];
    hostID: string;
  };

  export type NewProps = Model.NewProps & {
    host: User;
  };

  export type CreateSubjectProps = GameState.CreateSubjectProps;

  export type CreatePlayerProps = Omit<Player.NewProps, 'dice' | 'game'>;

  export type CreateQuestionProps = Player.CreateQuestionProps;
}
