import { circle, crossing } from '@types';

import {
  Answer,
  CentralFact,
  CentralPulse,
  Dice,
  LightSpot,
  Map,
  Player,
  Question,
  Subject,
  User,
} from '..';
import { Model } from '../model';
import { DicePicker } from './_dice-picker';
import { Round } from './_round';
import { GameState, InitialGameState } from './states';

export class Game extends Model {
  private host: User;
  private players: Player[];
  private round: Round;
  private lightSpotRound: Round;
  private dicePicker: DicePicker;
  private state: GameState;
  private map: Map;
  private questions: Question[];

  protected constructor(props: Game.NewProps) {
    const {
      host,
      players = [],
      round,
      lightSpotRound,
      dicePicker = DicePicker.create({}),
      state,
      map = Map.create({}),
      questions = [],
      ...modelProps
    } = props;

    super(modelProps);

    this.host = host;
    this.players = players;
    this.round = round ?? Round.create({ game: this });
    this.lightSpotRound = lightSpotRound ?? Round.create({ game: this });
    this.dicePicker = dicePicker;
    this.state = state ?? InitialGameState.create({ ctx: this });
    this.map = map;
    this.questions = questions;
  }
  public static create(props: Game.CreateProps): Game {
    return new Game(props);
  }
  public static recreate(props: Game.RecreateProps): Game {
    return new Game(props);
  }

  public getHost(): Game['host'] {
    return this.host;
  }

  public getPlayers(): Game['players'] {
    return this.players;
  }

  public getRound(): Game['round'] {
    return this.round;
  }

  public getLightSpotRound(): Game['lightSpotRound'] {
    return this.lightSpotRound;
  }

  public getDicePicker(): Game['dicePicker'] {
    return this.dicePicker;
  }

  public getState(): Game['state'] {
    return this.state;
  }

  public getMap(): Game['map'] {
    return this.map;
  }

  public getQuestions(): Game['questions'] {
    return this.questions;
  }

  public getCircles(): circle[] {
    const pulses = this.map.getPulses();

    return pulses.reduce<circle[]>(
      (array, pulse) => [...array, ...pulse.getCircles()],
      [],
    );
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

    const player = Player.create({ ...props, dice, game: this });

    this.players.push(player);

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

  public createLightSpot(props: Game.CreateLightSpotProps): LightSpot {
    return this.state.createLightSpot(props);
  }
}
// ============================================================================
export namespace Game {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    host: Game['host'];
  };

  export type RecreateProps = Model.RecreateProps &
    Required<CreateProps> & {
      players: Game['players'];
      round: Game['round'];
      lightSpotRound: Game['lightSpotRound'];
      dicePicker: Game['dicePicker'];
      state: Game['state'];
      map: Game['map'];
      questions: Game['questions'];
    };

  export type CreateSubjectProps = Player.CreateMySubjectProps;

  export type CreatePlayerProps = Omit<Player.CreateProps, 'dice' | 'game'>;

  export type CreateQuestionProps = Player.CreateQuestionProps;

  export type AnswerQuestionProps = Question.CreateAnswerProps;

  export type CreateLightSpotProps = Player.CreateSubjectProps;
}
