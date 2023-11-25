import { Game, Model, Player } from '@domain/models';

export class Round extends Model {
  private game: Game;
  private rotation: Round.Rotation | null;
  private i: number | null;

  private turnFinishObservers: Round.TurnFinishObserver[];
  private roundFinishObservers: Round.RoundFinishObserver[];

  protected constructor(props: Round.NewProps) {
    const {
      game,
      rotation = null,
      i = null,
      turnFinishObservers = [],
      roundFinishObservers = [],
      ...modelProps
    } = props;

    super(modelProps);

    this.game = game;
    this.rotation = rotation;
    this.i = i;

    this.turnFinishObservers = turnFinishObservers;
    this.roundFinishObservers = roundFinishObservers;
  }
  public static create(props: Round.CreateProps): Round {
    return new Round(props);
  }
  public static recreate(props: Round.RecreateProps): Round {
    return new Round(props);
  }

  public getGame(): Round['game'] {
    return this.game;
  }

  public getRotation(): Round['rotation'] {
    return this.rotation;
  }

  public getI(): Round['i'] {
    return this.i;
  }

  public getTurnFinishObservers(): Round['turnFinishObservers'] {
    return this.turnFinishObservers;
  }

  public getRoundFinishObservers(): Round['roundFinishObservers'] {
    return this.roundFinishObservers;
  }

  public getCurrentPlayer(): Player | null {
    if (!this.i) return null;

    const players = this.game.getPlayers();

    return players[this.i] ?? null;
  }

  public subscribeTurnFinishObserver(observer: Round.TurnFinishObserver): void {
    const alreadySubscribed = this.turnFinishObservers.includes(observer);
    if (alreadySubscribed) return;

    this.turnFinishObservers.push(observer);
  }

  private notifyTurnFinish(): void {
    this.turnFinishObservers.map((observer) => observer.onTurnFinish(this));
  }

  public subscribeRoundFinishObserver(
    observer: Round.RoundFinishObserver,
  ): void {
    const alreadySubscribed = this.roundFinishObservers.includes(observer);
    if (alreadySubscribed) return;

    this.roundFinishObservers.push(observer);
  }

  private notifyRoundFinish(): void {
    this.roundFinishObservers.map((observer) => observer.onRoundFinish(this));
  }

  public startRound(rotation: Round.Rotation): void {
    const players = this.game.getPlayers();
    const hasPlayers = !!players.length;
    if (!hasPlayers) throw 'No players to start a round';

    const maxI = players.length - 1;

    this.rotation = rotation;

    if (rotation === Round.Rotation.CLOCKWISE) this.i = 0;
    if (rotation === Round.Rotation.ANTICLOCKWISE) this.i = maxI;
  }

  public nextTurn(): void {
    if (this.rotation === null || this.i === null)
      throw 'Round must start first';

    this.notifyTurnFinish();

    this.i += this.rotation;

    const hasPlayer = !!this.getCurrentPlayer();

    if (!hasPlayer) {
      this.rotation === null;
      this.i === null;

      this.notifyRoundFinish();
    }
  }
}
// ============================================================================
export namespace Round {
  export type NewProps = CreateProps & Partial<RecreateProps>;

  export type CreateProps = Model.CreateProps & {
    game: Round['game'];
  };

  export type RecreateProps = Model.RecreateProps &
    Required<CreateProps> & {
      rotation: Round['rotation'];
      i: Round['i'];

      turnFinishObservers: Round['turnFinishObservers'];
      roundFinishObservers: Round['roundFinishObservers'];
    };

  export enum Rotation {
    CLOCKWISE = 1,
    ANTICLOCKWISE = -1,
  }

  export interface TurnFinishObserver {
    onTurnFinish(context: Round): void;
  }

  export interface RoundFinishObserver {
    onRoundFinish(context: Round): void;
  }
}
