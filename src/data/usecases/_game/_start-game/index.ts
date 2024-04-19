import { NotFoundError } from '@domain/errors';
import { DiceModel, GameModel } from '@domain/models';
import {
  ICreateCentralPulseUsecase,
  ICreateDiceUsecase,
  ICreateRoundUsecase,
  IGetCurrentGameUsecase,
  IGetPlayersUsecase,
  INextGameStateUsecase,
  ISetPlayerDiceUsecase,
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
  private readonly setPlayerDice: ISetPlayerDiceUsecase;
  private readonly gameDAO: IGameDAO;
  public constructor({
    createCentralPulse,
    createDice,
    createRound,
    getCurrentGame,
    getPlayers,
    nextGameState,
    setPlayerDice,
    gameDAO,
  }: Deps) {
    this.createCentralPulse = createCentralPulse;
    this.createDice = createDice;
    this.createRound = createRound;
    this.getCurrentGame = getCurrentGame;
    this.getPlayers = getPlayers;
    this.nextGameState = nextGameState;
    this.setPlayerDice = setPlayerDice;
    this.gameDAO = gameDAO;
  }

  public async execute(): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    const centralPulse = await this.createCentralPulse.execute();

    const playerIDs = (await this.getPlayers.execute())
      .sort((a, b) => a.order - b.order)
      .map((player) => player.id);

    const diceCreators = [
      (ownerID: string): Promise<DiceModel> =>
        this.createDice.execute({ sides: 4, ownerID }),
      (ownerID: string): Promise<DiceModel> =>
        this.createDice.execute({ sides: 6, ownerID }),
      (ownerID: string): Promise<DiceModel> =>
        this.createDice.execute({ sides: 8, ownerID }),
      (ownerID: string): Promise<DiceModel> =>
        this.createDice.execute({ sides: 10, ownerID }),
      (ownerID: string): Promise<DiceModel> =>
        this.createDice.execute({ sides: 12, ownerID }),
    ];

    const dices = await Promise.all(
      playerIDs.map((playerID, i) => diceCreators[i](playerID)),
    );

    await Promise.all(
      playerIDs.map((playerID, i) =>
        this.setPlayerDice.execute(playerID, dices[i].id),
      ),
    );

    const [round, lightSpotRound] = await Promise.all([
      this.createRound.execute({ playerIDs }),
      this.createRound.execute({ playerIDs }),
    ]);

    await this.gameDAO.update(currentGame.id, {
      centralPulseID: centralPulse.id,
      roundID: round.id,
      lightSpotRoundID: lightSpotRound.id,
    });

    const game = await this.nextGameState.execute();

    return game;
  }
}

type Deps = {
  createCentralPulse: ICreateCentralPulseUsecase;
  createDice: ICreateDiceUsecase;
  createRound: ICreateRoundUsecase;
  getCurrentGame: IGetCurrentGameUsecase;
  getPlayers: IGetPlayersUsecase;
  nextGameState: INextGameStateUsecase;
  setPlayerDice: ISetPlayerDiceUsecase;
  gameDAO: IGameDAO;
};
