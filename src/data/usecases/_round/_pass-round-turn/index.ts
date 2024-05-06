import { NotFoundError } from '@domain/errors';
import { PlayerModel, RoundModel } from '@domain/models';
import {
  IGetCurrentGameUsecase,
  IGetPlayersUsecase,
  IGetRoundUsecase,
  IPassRoundTurnUsecase,
  IResetDiceOverloadUsecase,
} from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class PassRoundTurnUsecase implements IPassRoundTurnUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getPlayers: IGetPlayersUsecase;
  private readonly getRound: IGetRoundUsecase;
  private readonly resetDiceOverload: IResetDiceOverloadUsecase;
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({
    getCurrentGame,
    getPlayers,
    getRound,
    resetDiceOverload,
    roundDAO,
    roundHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.getPlayers = getPlayers;
    this.getRound = getRound;
    this.resetDiceOverload = resetDiceOverload;
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(clockwise?: RoundModel.Clockwise): Promise<RoundModel> {
    const round = await this.getRound.execute();
    if (!round) throw new NotFoundError({ metadata: { entity: 'Round' } });

    const players = await this.getPlayers.execute();

    let nextPlayer: PlayerModel | undefined = undefined;
    const skippedPlayers: PlayerModel[] = [];

    const _clockwise = clockwise ?? round.clockwise;

    const i = round.i ?? (_clockwise === 'clockwise' ? -1 : Infinity);

    if (_clockwise === 'clockwise') {
      players.sort((player1, player2) => player1.order - player2.order);

      nextPlayer = players.find((player) => {
        const isNext = player.order > i;

        if (isNext && player.overloaded) skippedPlayers.push(player);

        return isNext && !player.overloaded;
      });
    } else if (_clockwise === 'counterclockwise') {
      players.sort((player1, player2) => player2.order - player1.order);

      nextPlayer = players.find((player) => {
        const isNext = player.order < i;

        if (isNext && player.overloaded) skippedPlayers.push(player);

        return isNext && !player.overloaded;
      });
    }

    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    await Promise.all(
      skippedPlayers.map(
        ({ diceID }) => diceID && this.resetDiceOverload.execute(diceID),
      ),
    );

    // const finished = nextPlayer === undefined;

    // const dto = await this.roundDAO.update(round.id, {
    //   i: !finished ? nextPlayer?.order : undefined,
    //   clockwise,
    //   finished,
    // });
    const dto = await this.roundDAO.update(round.id, {
      i: nextPlayer?.order ?? null,
      clockwise,
      finished: nextPlayer === undefined,
    });

    return this.roundHydrator.hydrate(dto);
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  getPlayers: IGetPlayersUsecase;
  getRound: IGetRoundUsecase;
  resetDiceOverload: IResetDiceOverloadUsecase;
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};
