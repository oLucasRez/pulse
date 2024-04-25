import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  ICreateCentralPulseUsecase,
  ICreateDiceUsecase,
  ICreateRoundUsecase,
  IGetCurrentGameUsecase,
  IGetPlayersUsecase,
  INextGameStateUsecase,
  IStartGameUsecase,
} from '@domain/usecases';

import { IGameDAO } from '@data/dao';

export class StartGameUsecase implements IStartGameUsecase {
  private readonly createCentralPulse: ICreateCentralPulseUsecase;
  private readonly createDice: ICreateDiceUsecase;
  private readonly createRound: ICreateRoundUsecase;
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly getPlayers: IGetPlayersUsecase;
  private readonly nextGameState: INextGameStateUsecase;
  private readonly gameDAO: IGameDAO;
  public constructor({
    createCentralPulse,
    createDice,
    createRound,
    getCurrentGame,
    getPlayers,
    nextGameState,
    gameDAO,
  }: Deps) {
    this.createCentralPulse = createCentralPulse;
    this.createDice = createDice;
    this.createRound = createRound;
    this.getCurrentGame = getCurrentGame;
    this.getPlayers = getPlayers;
    this.nextGameState = nextGameState;
    this.gameDAO = gameDAO;
  }

  public async execute(): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const [centralPulse, round, lightSpotRound] = await Promise.all([
      this.createCentralPulse.execute(),
      this.createRound.execute(),
      this.createRound.execute(),
      this.getPlayers.execute(),
      this.createDice.execute({ sides: 4, order: 0 }),
      this.createDice.execute({ sides: 6, order: 1 }),
      this.createDice.execute({ sides: 8, order: 2 }),
      this.createDice.execute({ sides: 10, order: 3 }),
      this.createDice.execute({ sides: 12, order: 4 }),
    ]);

    await this.gameDAO.update(currentGame.id, {
      centralPulseID: centralPulse.id,
      roundID: round.id,
      lightSpotRoundID: lightSpotRound.id,
    });

    return this.nextGameState.execute();
  }
}

type Deps = {
  createCentralPulse: ICreateCentralPulseUsecase;
  createDice: ICreateDiceUsecase;
  createRound: ICreateRoundUsecase;
  getCurrentGame: IGetCurrentGameUsecase;
  getPlayers: IGetPlayersUsecase;
  nextGameState: INextGameStateUsecase;
  gameDAO: IGameDAO;
};
