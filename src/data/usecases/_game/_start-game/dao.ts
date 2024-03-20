import { NotFoundError } from '@domain/errors';
import { DiceModel, GameModel } from '@domain/models';
import {
  CreateCentralPulseUsecase,
  CreateDiceUsecase,
  CreateRoundUsecase,
  GetCurrentGameUsecase,
  GetPlayersUsecase,
  NextGameStateUsecase,
  SetPlayerDiceUsecase,
  StartGameUsecase,
} from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { StartGameObserver } from '@data/observers';

export class DAOStartGameUsecase implements StartGameUsecase {
  private readonly createCentralPulse: CreateCentralPulseUsecase;
  private readonly createDice: CreateDiceUsecase;
  private readonly createRound: CreateRoundUsecase;
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly nextGameState: NextGameStateUsecase;
  private readonly setPlayerDice: SetPlayerDiceUsecase;
  private readonly startGamePublisher: StartGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAOStartGameUsecase.Deps) {
    this.createCentralPulse = deps.createCentralPulse;
    this.createDice = deps.createDice;
    this.createRound = deps.createRound;
    this.getCurrentGame = deps.getCurrentGame;
    this.getPlayers = deps.getPlayers;
    this.nextGameState = deps.nextGameState;
    this.setPlayerDice = deps.setPlayerDice;
    this.startGamePublisher = deps.startGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    await this.createCentralPulse.execute();

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
      roundID: round.id,
      lightSpotRoundID: lightSpotRound.id,
    });

    const game = await this.nextGameState.execute();

    this.startGamePublisher.notifyStartGame(game);

    return game;
  }
}

export namespace DAOStartGameUsecase {
  export type Deps = {
    createCentralPulse: CreateCentralPulseUsecase;
    createDice: CreateDiceUsecase;
    createRound: CreateRoundUsecase;
    getCurrentGame: GetCurrentGameUsecase;
    getPlayers: GetPlayersUsecase;
    nextGameState: NextGameStateUsecase;
    setPlayerDice: SetPlayerDiceUsecase;
    startGamePublisher: StartGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}
