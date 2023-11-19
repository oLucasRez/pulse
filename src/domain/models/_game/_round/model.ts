import { Model, Player } from '@domain/models';

export class Round extends Model {
  private players: Player[];
  private rotation: Round.Rotation | null;
  private i: number | null;

  private roundFinishObservers: Round.RoundFinishObserver[] = [];

  public constructor(props: Round.NewProps) {
    const { players = [], rotation = null, i = null, ...modelProps } = props;

    super({ ...modelProps });

    this.players = players;
    this.rotation = rotation;
    this.i = i;
  }

  public getPlayers(): Round['players'] {
    return this.players;
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public getCurrentPlayer(): Player | null {
    if (!this.i) return null;

    return this.players[this.i] ?? null;
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
    const hasPlayers = !!this.players.length;
    if (!hasPlayers) throw 'No players to start a round';

    const maxI = this.players.length - 1;

    this.rotation = rotation;

    if (rotation === Round.Rotation.CLOCKWISE) this.i = 0;
    if (rotation === Round.Rotation.ANTICLOCKWISE) this.i = maxI;
  }

  public nextTurn(): void {
    if (this.rotation === null || this.i === null)
      throw 'Round must start first';

    this.i += this.rotation;

    const hasPlayer = !!this.getCurrentPlayer();

    if (!hasPlayer) {
      this.rotation === null;
      this.i === null;

      this.notifyRoundFinish();
    }
  }
}

export namespace Round {
  export type NewProps = Model.NewProps & {
    players?: Round['players'];
    rotation?: Round['rotation'];
    i?: Round['i'];
  };

  export enum Rotation {
    CLOCKWISE = 1,
    ANTICLOCKWISE = -1,
  }

  export interface RoundFinishObserver {
    onRoundFinish(context: Round): void;
  }
}
