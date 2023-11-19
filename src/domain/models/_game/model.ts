import { circle, crossing } from '@types';

import {
  Answer,
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
import { DicePicker } from './_dice-picker';
import { Round } from './_round';
import { GameState, InitialGameState } from './states';

export class Game extends Model {
  private host: User;
  private round: Round;
  private dicePicker: DicePicker;
  private state: GameState;
  private centralPulse: CentralPulse;
  private subjectPulses: SubjectPulse[];
  private questions: Question[];

  public constructor(props: Game.NewProps) {
    const {
      host,
      round = new Round({}),
      dicePicker = new DicePicker({}),
      state,
      centralPulse = new CentralPulse({}),
      subjectPulses = [],
      questions = [],
      ...modelProps
    } = props;

    super(modelProps);

    this.host = host;
    this.round = round;
    this.dicePicker = dicePicker;
    this.state = state ?? new InitialGameState({ ctx: this });
    this.centralPulse = centralPulse;
    this.subjectPulses = subjectPulses;
    this.questions = questions;
  }

  public getHost(): Game['host'] {
    return this.host;
  }

  public getRound(): Game['round'] {
    return this.round;
  }

  public getDicePicker(): Game['dicePicker'] {
    return this.dicePicker;
  }

  public getState(): Game['state'] {
    return this.state;
  }

  public getCentralPulse(): Game['centralPulse'] {
    return this.centralPulse;
  }

  public getSubjectPulses(): Game['subjectPulses'] {
    return this.subjectPulses;
  }

  public getQuestions(): Game['questions'] {
    return this.questions;
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

  public getCentralFact(): CentralFact {
    return this.centralPulse.getLandmark();
  }

  public getCurrentPlayer(): Player | null {
    return this.round.getCurrentPlayer();
  }

  public setState(state: GameState): void {
    this.state = state;
  }

  public createPlayer(props: Game.CreatePlayerProps): Player {
    const dice = this.dicePicker.pickDice();
    if (!dice) throw 'Limit of players achieved';

    const player = new Player({ ...props, dice, game: this });

    this.round.addPlayer(player);

    return player;
  }

  public start(): void {
    return this.state.start();
  }

  public createSubject(props: Game.CreateSubjectProps): Subject {
    return this.state.createSubject(props);
  }

  public passTurn(): void {
    return this.state.passTurn();
  }

  public updateCentralFactDescription(
    description: CentralFact['description'],
  ): CentralFact {
    return this.state.updateCentralFactDescription(description);
  }

  public rollDice(): Dice {
    return this.state.rollDice();
  }

  public updateCentralPulseAmount(): CentralPulse {
    return this.state.updateCentralPulseAmount();
  }

  public updateDicePosition(position: NonNullable<Dice['position']>): Dice {
    return this.state.updateDicePosition(position);
  }

  public createSubjectPulse(gap: SubjectPulse['gap']): SubjectPulse {
    const subjectPulse = this.state.createSubjectPulse(gap);

    this.subjectPulses.push(subjectPulse);

    return subjectPulse;
  }

  public getCrossings(tolerance: number = 0): crossing[] {
    return this.state.getCrossings(tolerance);
  }

  public createQuestion(props: Game.CreateQuestionProps): Question {
    return this.state.createQuestion(props);
  }

  public answerQuestion(
    question: Question,
    props: Game.AnswerQuestionProps,
  ): Answer {
    return this.state.answerQuestion(question, props);
  }

  public playerVote(player: Player, vote: boolean): void {
    return this.state.playerVote(player, vote);
  }

  public finishVoting(): boolean {
    return this.state.finishVoting();
  }
}
// ============================================================================
export namespace Game {
  export type NewProps = Model.NewProps & {
    host: Game['host'];
    round?: Game['round'];
    dicePicker?: Game['dicePicker'];
    state?: Game['state'];
    centralPulse?: Game['centralPulse'];
    subjectPulses?: Game['subjectPulses'];
    questions?: Game['questions'];
  };

  export type CreateSubjectProps = Player.CreateSubjectProps;

  export type CreatePlayerProps = Omit<Player.NewProps, 'dice' | 'game'>;

  export type CreateQuestionProps = Player.CreateQuestionProps;

  export type AnswerQuestionProps = Question.CreateAnswerProps;
}
