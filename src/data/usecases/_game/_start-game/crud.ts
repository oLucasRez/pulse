import { NotFoundError } from '@domain/errors';
import { GameModel } from '@domain/models';
import {
  CreateCentralPulseUsecase,
  CreateDiceUsecase,
  CreateRoundUsecase,
  GetCurrentGameUsecase,
  GetPlayersUsecase,
  PassTurnUsecase,
  SetPlayerDiceUsecase,
  StartGameUsecase,
} from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { StartGameObserver } from '@data/observers';

export class DAOStartGameUsecase implements StartGameUsecase {
  private readonly createCentralPulse: CreateCentralPulseUsecase;
  private readonly createDice: CreateDiceUsecase;
  private readonly createRound: CreateRoundUsecase;
  private readonly getCurrentGame: GetCurrentGameUsecase;
  private readonly getPlayers: GetPlayersUsecase;
  private readonly passTurn: PassTurnUsecase;
  private readonly setPlayerDice: SetPlayerDiceUsecase;
  private readonly startGamePublisher: StartGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAOStartGameUsecase.Deps) {
    this.createCentralPulse = deps.createCentralPulse;
    this.createDice = deps.createDice;
    this.createRound = deps.createRound;
    this.getCurrentGame = deps.getCurrentGame;
    this.getPlayers = deps.getPlayers;
    this.passTurn = deps.passTurn;
    this.setPlayerDice = deps.setPlayerDice;
    this.startGamePublisher = deps.startGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(): Promise<GameModel> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    await this.createCentralPulse.execute();

    const dices = await Promise.all([
      this.createDice.execute({ sides: 4 }),
      this.createDice.execute({ sides: 6 }),
      this.createDice.execute({ sides: 8 }),
      this.createDice.execute({ sides: 10 }),
      this.createDice.execute({ sides: 12 }),
    ]);

    const playerIDs = (await this.getPlayers.execute()).map(
      (player) => player.id,
    );

    await Promise.all(
      playerIDs.map((playerID, i) =>
        this.setPlayerDice.execute(playerID, dices[i].id),
      ),
    );

    const [round, lightspotRound] = await Promise.all([
      this.createRound.execute({ playerIDs }),
      this.createRound.execute({ playerIDs }),
    ]);

    const dto = await this.gameDAO.update(currentGame.id, {
      started: true,
      state: 'creating:subjects',
      roundID: round.id,
      lightspotRoundID: lightspotRound.id,
    });

    await Promise.all([
      this.passTurn.execute(round.id),
      this.passTurn.execute(lightspotRound.id),
    ]);

    const game = GameHydrator.hydrate(dto);

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
    passTurn: PassTurnUsecase;
    setPlayerDice: SetPlayerDiceUsecase;
    startGamePublisher: StartGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}
